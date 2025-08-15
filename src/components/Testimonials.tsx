export default function Testimonials() {
  const reviews = [
    { name: "Arjun M.", text: "Helped me land my internship with a strong resume project." },
    { name: "Sneha R.", text: "Step-by-step guide made processor design easy to understand." },
  ];

  return (
    <section className="py-16 px-8 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
      <div className="flex justify-center gap-8">
        {reviews.map((rev) => (
          <div key={rev.name} className="bg-gray-800 p-6 rounded-lg w-80">
            <p className="mb-4">"{rev.text}"</p>
            <h4 className="font-semibold">{rev.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
