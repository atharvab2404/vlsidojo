import { flatDigitalDesignTopics, slugify } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";

export default function Page() {
  const currentSlug = "what-is-a-digital-vs-analog-signal";

  const index = flatDigitalDesignTopics.findIndex(t => t.slug === currentSlug);
  const prev = index > 0 ? flatDigitalDesignTopics[index - 1] : null;
  const next = index < flatDigitalDesignTopics.length - 1 ? flatDigitalDesignTopics[index + 1] : null;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        What is a Digital vs. Analog Signal?
      </h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        A signal represents information. Analog signals vary continuously,
        while digital signals take discrete values—usually 0 and 1.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
        Analog Signal
      </h2>
      <p className="text-gray-700 mb-4">
        Analog signals vary smoothly and can take infinitely many values.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
        Digital Signal
      </h2>
      <p className="text-gray-700 mb-4">
        Digital signals take discrete, quantized levels, such as binary 0 and 1.
      </p>

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
