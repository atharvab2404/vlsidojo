"use client";

import { useCartStore } from "@/store/cartStore";
import DojoModalWrapper from "./DojoModalWrapper";

interface DojoArbiterModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchased: boolean;
}

export default function DojoArbiterModal({ isOpen, onClose, purchased }: DojoArbiterModalProps) {
  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);
  const dojoId = "arbiter-dojo";
  const isAdded = items.some((i) => i.id === dojoId);

  return (
    <DojoModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Round Robin Arbiter Dojo</h2>
      <p className="mb-4 text-gray-700">
        Master arbitration logic by designing a parameterized Round Robin Arbiter with multiple modes of operation.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">Skills You’ll Gain</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>SystemVerilog coding best practices</li>
        <li>Combinational and sequential logic design</li>
        <li>Parameterization for scalable modules</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Knowledge Gain</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Round Robin arbitration algorithm</li>
        <li>Weighted arbitration techniques</li>
        <li>Design trade-offs in arbiters</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">Features</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Step-by-step design explanation</li>
        <li>Hands-on Verilog projects</li>
        <li>Real-world application insights</li>
      </ul>

      <div className="mt-6 flex flex-col gap-3">
        {!purchased ? (
          <button
            onClick={() =>
              addItem({
                id: dojoId,
                title: "Round Robin Arbiter Dojo",
                price: 499,
                thumbnail: "",
                quantity: 1,
              })
            }
            disabled={isAdded}
            className={`px-4 py-2 rounded text-sm font-semibold transition ${
              isAdded
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isAdded ? "✅ Added to Cart" : "Add to Cart – ₹499"}
          </button>
        ) : (
          <a
            href="/dojos/arbiter/page" // actual dojo page
            className="px-4 py-2 rounded text-sm font-semibold text-center bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            🚀 Start Dojo
          </a>
        )}
      </div>
    </DojoModalWrapper>
  );
}
