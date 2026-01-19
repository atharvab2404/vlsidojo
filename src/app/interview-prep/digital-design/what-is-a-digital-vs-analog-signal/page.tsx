import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Zap, Info, Layers, History, Waves } from "lucide-react";

export default function Page() {
  const currentSlug = "what-is-a-digital-vs-analog-signal";
  const index = flatDigitalDesignTopics.findIndex((t) => t.slug === currentSlug);
  const prev = index > 0 ? flatDigitalDesignTopics[index - 1] : null;
  const next =
    index < flatDigitalDesignTopics.length - 1
      ? flatDigitalDesignTopics[index + 1]
      : null;

  return (
    <div className="max-w-5xl mx-auto text-gray-800">
      <div className="mb-8">
        <Link
          href="/interview-prep/digital-design"
          className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors mb-4 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Curriculum
        </Link>
      </div>

      <h1 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight">
        What is a Digital vs. Analog Signal?
      </h1>

      <p className="text-xl text-gray-600 leading-relaxed mb-12">
        To understand modern electronics, we must first understand the nature of the information we manipulate.
        The physical world—temperature, pressure, sound, light—is fundamentally <span className="text-blue-600 font-bold">Analog</span>.
        Yet, virtually all modern computation is <span className="text-amber-600 font-bold">Digital</span>. Why did this shift occur? The answer lies in the theory of <em>noise immunity</em> and <em>signal regeneration</em>.
      </p>

      {/* --- Section 1: The Core Definitions --- */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <Waves className="w-8 h-8 text-amber-500" />
        1. The Fundamental Difference
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Analog Card */}
        <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Waves className="w-24 h-24 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-blue-800 mb-4">The Analog World</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            An analog signal is <strong>continuous</strong> in both time and amplitude. It is a direct map of physical reality.
          </p>
          <ul className="space-y-4 text-gray-700">
            <li className="flex gap-3">
              <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
              <span>
                <strong>Infinite Precision:</strong> Between 1.0V and 1.1V, there are infinite values (1.001V, 1.0001V...).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
              <span>
                <strong>Noise Sensitive:</strong> Any noise <em>n(t)</em> added to the signal <em>x(t)</em> becomes part of the signal. You cannot separate them perfectly later.
              </span>
            </li>
          </ul>
        </div>

        {/* Digital Card */}
        <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl border border-amber-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Layers className="w-24 h-24 text-amber-600" />
          </div>
          <h3 className="text-2xl font-bold text-amber-800 mb-4">The Digital Abstraction</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Digital signals are <strong>discrete</strong> in time and amplitude. They are an <em>abstraction</em> we impose on reality.
          </p>
          <ul className="space-y-4 text-gray-700">
            <li className="flex gap-3">
              <span className="mt-1.5 w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
              <span>
                <strong>Quantized:</strong> We only care if the voltage is "High" (1) or "Low" (0). Exact values don't matter as long as they are within range.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
              <span>
                <strong>Noise Immune:</strong> Small amounts of noise are <em>rejected</em> completely. This is the key reason computers work.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* --- Section 2: The Analogy (Water Pipe) --- */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Zap className="w-8 h-8 text-amber-500" />
          2. The Intuitive Analogy: Water Taps
        </h2>
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1">
              <h4 className="text-xl font-bold text-blue-700 mb-3">Analog Tap</h4>
              <p className="text-gray-600 leading-relaxed mb-4">
                Imagine a kitchen faucet where you can control the flow to <em>any</em> level—droplets, trickle, half-stream, or full blast.
                <br /><br />
                If someone bumps your arm (noise), the flow changes slightly. If you try to communicate a specific flow rate to a friend ("turn it to 43.5%"), they will likely get it slightly wrong (44%). Errors accumulate.
              </p>
            </div>
            <div className="hidden md:block w-px bg-gray-200"></div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-amber-700 mb-3">Digital Tap</h4>
              <p className="text-gray-600 leading-relaxed mb-4">
                Imagine a bucket that can only be either <strong>Full</strong> or <strong>Empty</strong>.
                <br /><br />
                Even if your hand shakes (noise) while pouring, as long as you pour <em>most</em> of the water, the bucket becomes "Full". It resets the signal. There is no ambiguity. It's either 1 or 0.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Section 3: Signal Regeneration (Mermaid) --- */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Layers className="w-8 h-8 text-amber-500" />
          3. The Secret Sauce: Signal Regeneration
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          The reason digital won over analog is <strong>Restorative Logic</strong>. In a digital chain, every logic gate acts as a repeater. It takes a degraded input signal and generates a fresh, clean output signal.
        </p>

        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex flex-col items-center">
            {/* Diagram Placeholder - In a real MDX we would use actual Mermaid component */}
            <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <pre className="text-sm font-mono text-gray-600 overflow-x-auto whitespace-pre">
                {`
Comparison: Chain of Buffers

[Input: 5.0V] -->  (Noise -0.2V) --> [4.8V]
                                    |
            -----------------------------------------
            |                                       |
     ANALOG AMPLIFIER (Gain=1)               DIGITAL BUFFER
            |                                       |
    Output = 4.8V (Error Passed)            Input > V_IH ?? YES
            |                               Output = 5.0V (Restored!)
    (Noise -0.3V) --> [4.5V]                        |
            |                               (Noise -0.3V)
    Output = 4.5V (Error Grows)             Input = 4.7V > V_IH
            |                               Output = 5.0V (Restored!)
`}
              </pre>
            </div>
            <p className="text-center text-gray-500 mt-4 text-sm font-medium">
              Fig 1. How Digital Logic rejects noise at every stage vs Analog noise accumulation.
            </p>
          </div>
        </div>
      </div>


      {/* --- Section 4: Deep Technical Comparison (The Table) --- */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Rigorous Comparison Table</h2>
        <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-5 px-6 font-semibold text-gray-800 w-1/4">Parameter</th>
                <th className="py-5 px-6 font-semibold text-blue-700 w-1/3">Analog System</th>
                <th className="py-5 px-6 font-semibold text-amber-700 w-1/3">Digital System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="group hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">Information Type</td>
                <td className="py-4 px-6 text-gray-600">Continuous magnitude (Volts, Amps)</td>
                <td className="py-4 px-6 text-gray-600">Discrete logic levels (0 or 1)</td>
              </tr>
              <tr className="group hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">Noise Immunity</td>
                <td className="py-4 px-6 text-gray-600">Low. Noise accumulates.</td>
                <td className="py-4 px-6 text-gray-600">High. Noise is rejected by margins.</td>
              </tr>
              <tr className="group hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">Storage</td>
                <td className="py-4 px-6 text-gray-600">Difficult (Capacitors leak charge).</td>
                <td className="py-4 px-6 text-gray-600">Easy (Flip-flops, SRAM, Flash).</td>
              </tr>
              <tr className="group hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">Design Automated?</td>
                <td className="py-4 px-6 text-gray-600">Mostly Manual (Hand-crafted).</td>
                <td className="py-4 px-6 text-gray-600">Highly Automated (Verilog -&gt; Synthesis).</td>
              </tr>
              <tr className="group hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">Bandwidth</td>
                <td className="py-4 px-6 text-gray-600">Higher (No quantization overhead).</td>
                <td className="py-4 px-6 text-gray-600">Lower (Requires sampling &gt; 2x freq).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Section 5: Historical Context --- */}
      <div className="bg-amber-50/50 p-8 rounded-2xl border border-amber-200 mb-12">
        <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          <History className="w-5 h-5" />
          Why did the world go Digital?
        </h3>
        <p className="text-gray-800 leading-relaxed mb-4">
          In the 1960s, analog computers were faster than digital ones for differential equations. But they had a fatal flaw: <strong>Scalability</strong>.
          <br /><br />
          To make an analog computer 2x more accurate, you need 2x better components (0.1% resistors vs 0.2%). This gets exponentially expensive.
          <br />
          To make a digital computer 2x more accurate, you just add 1 more bit to the bus (from 8-bit to 9-bit). The cost is linear. This <strong>linear cost for exponential precision</strong> is why digital won.
        </p>
      </div>


      {/* Navigation */}
      <SubtopicNav
        prev={
          prev
            ? { title: prev.title, href: `/interview-prep/digital-design/${prev.slug}` }
            : null
        }
        next={
          next
            ? { title: next.title, href: `/interview-prep/digital-design/${next.slug}` }
            : null
        }
      />
    </div>
  );
}

