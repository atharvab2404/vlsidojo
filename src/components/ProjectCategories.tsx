export default function ProjectCategories() {
  const categories = [
    { title: "Basic", examples: ["4-bit Adder Design", "Simple FSM", "ALU Design"] },
    { title: "Intermediary", examples: ["Cache Controller", "UART Design", "DSP Filter"] },
    { title: "Advanced", examples: ["RISC-V Core", "Floating Point Unit", "Encryption Unit"] },
  ];

  return (
    <section id="projects" className="h-screen bg-gray-100 py-16 px-8">
      <h2 className="text-3xl font-bold text-center mb-12">Project Categories</h2>
      <div className="flex justify-center gap-8">
        {categories.map((cat) => (
          <div key={cat.title} className="bg-white shadow-lg p-6 rounded-xl w-72">
            <h3 className="text-xl font-semibold mb-4">{cat.title}</h3>
            <ul className="list-disc pl-5">
              {cat.examples.map((ex) => (
                <li key={ex}>{ex}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
