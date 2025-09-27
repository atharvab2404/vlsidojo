/// <reference lib="webworker" />

declare const self: DedicatedWorkerGlobalScope;

export {};

interface VerilogFile {
  path: string;
  contents: Uint8Array | string;
}

let iverilogModule: any | null = null;

async function loadIverilogWasm() {
  // Emscripten-generated JS loader — make sure you put it in `public/wasm/iverilog.js`
  // so it can be imported here.
  const moduleFactory = (await import("../../public/wasm/iverilog.js")).default;
  return moduleFactory();
}

self.onmessage = async (e: MessageEvent) => {
  const { files } = e.data as { files: VerilogFile[] };

  try {
    // lazy-load wasm
    if (!iverilogModule) {
      iverilogModule = await loadIverilogWasm();
    }
    const FS = iverilogModule.FS;

    // write files into wasm FS
    for (const f of files) {
      const data =
        typeof f.contents === "string"
          ? new TextEncoder().encode(f.contents)
          : f.contents;
      FS.writeFile(f.path, data);
    }

    // 1. compile to sim.out
    iverilogModule.callMain([
      "-g2012",
      "-o",
      "sim.out",
      ...files.map((f) => f.path),
    ]);

    // 2. run simulation
    iverilogModule.callMain(["sim.out"]);

    // 3. extract wave.vcd
    const vcd = FS.readFile("wave.vcd");
    self.postMessage({ type: "done", vcd }, [vcd.buffer]);
  } catch (err) {
    self.postMessage({ type: "error", error: String(err) });
  }
};
