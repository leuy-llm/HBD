import img1 from "../assets/images/image1.png";
import img2 from "../assets/images/image2.png";
import img4 from "../assets/images/image4.png";

const images = [img1, img2, img4];

const Gallery = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b  from-white to-pink-50 py-32 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-pink-500 mb-4 animate-fade-in">
          📸 Our Memories
        </h2>
        <p className="text-lg text-gray-600 mb-12 animate-fade-in delay-100">
          A small glimpse into the beautiful moments we’ve shared
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 animate-fade-in delay-200">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={src}
                alt={`Memory ${index + 1}`}
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <p className="text-sm text-gray-600 italic px-2 py-2">
                {`Memory ${index + 1}`}
              </p>
              <div className="absolute inset-0 bg-opacity-10 group-hover:bg-opacity-30 transition duration-300" />
            </div>
          ))}
           <p className="text-base font-bt text-gray-600 italic px-2 py-2">
                អត់ហ៊ានដាក់រូបភាពច្រើនទេ ខ្លាចក្រែងគេថារោគចិត្ត
              </p>
        </div>
      </div>

      {/* Animation Styles */}
    </section>
  );
};

export default Gallery;
