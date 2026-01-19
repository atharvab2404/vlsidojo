export function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/'/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export const computerArchitectureCurriculum = [
    {
        hub: "Foundations of Computer Architecture",
        subtopics: [
            "Computer architecture vs organization vs implementation",
            "Performance metrics: latency and throughput",
            "CPI and execution time equation",
            "Amdahl’s Law",
            "Iron Law of performance",
            "Performance vs power trade-offs",
        ],
    },
    {
        hub: "Instruction Set Architecture (ISA)",
        subtopics: [
            "Role of ISA",
            "Instruction formats",
            "Instruction types",
            "Addressing modes",
            "Register file organization",
            "Instruction encoding",
            "RISC principles",
            "MIPS / RISC-V case study",
        ],
    },
    {
        hub: "Processor Datapath and Control",
        subtopics: [
            "Datapath components",
            "Single-cycle datapath",
            "Multi-cycle datapath",
            "Control unit design",
            "Hardwired control",
            "Instruction execution flow",
            "Critical path analysis",
        ],
    },
    {
        hub: "Pipelining",
        subtopics: [
            "Pipeline stages",
            "Pipeline performance",
            "Speedup and efficiency",
            "Structural hazards",
            "Data hazards",
            "Control hazards",
            "Forwarding",
            "Stalling",
            "Pipeline depth trade-offs",
        ],
    },
    {
        hub: "Memory Hierarchy",
        subtopics: [
            "Memory hierarchy principles",
            "Cache organization",
            "Cache mapping techniques",
            "Cache associativity",
            "Cache replacement policies",
            "Cache write policies",
            "Cache performance (AMAT)",
            "Cache miss types",
        ],
    },
    {
        hub: "Virtual Memory",
        subtopics: [
            "Virtual vs physical memory",
            "Address translation",
            "Page tables",
            "Multilevel page tables",
            "TLB organization",
            "TLB misses",
        ],
    },
    {
        hub: "Instruction-Level Parallelism (ILP)",
        subtopics: [
            "Limits of ILP",
            "Dynamic scheduling",
            "Scoreboarding",
            "Tomasulo’s algorithm",
            "Register renaming",
            "Out-of-order execution",
            "Precise exceptions",
        ],
    },
    {
        hub: "Branch Prediction and Speculation",
        subtopics: [
            "Branch behavior",
            "Static branch prediction",
            "Dynamic branch prediction",
            "Branch history tables",
            "Local and global predictors",
            "Branch target buffer (BTB)",
            "Speculative execution",
        ],
    },
    {
        hub: "Multicore and Multiprocessor Systems",
        subtopics: [
            "Shared-memory multiprocessors",
            "Cache coherence fundamentals",
            "MSI and MESI protocols",
            "Memory consistency (basic concepts)",
            "Synchronization primitives",
            "False sharing",
        ],
    },
    {
        hub: "GPUs and Accelerator Architectures",
        subtopics: [
            "Throughput vs latency architectures",
            "SIMD vs SIMT",
            "GPU execution model",
            "GPU memory hierarchy",
            "CPU vs GPU architectural comparison",
            "Domain-specific accelerators (AI/ML)",
        ],
    },
    {
        hub: "Power and Performance",
        subtopics: [
            "Dynamic vs static power",
            "Voltage and frequency scaling",
            "Clock gating",
            "Performance–power trade-off",
        ],
    },
];

// ✅ flatten structure for automatic prev/next navigation
export const flatComputerArchitectureTopics = computerArchitectureCurriculum.flatMap(
    (hub) =>
        hub.subtopics.map((sub) => ({
            title: sub,
            slug: slugify(sub),
        }))
);
