import React, { useState } from "react";

const GenerateSong: React.FC = () => {
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerated(true);
  };

  return (
    <section id="song" className="py-20 bg-purple-50 text-center px-4">
      <h2 className="text-3xl font-bold text-purple-700 mb-4">🎵 Generate Birthday Song</h2>
      <button onClick={handleGenerate}
        className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition duration-300">
        Generate Song
      </button>
      {generated && (
        <div className="mt-6">
          <p className="text-xl text-purple-900 font-medium">Happy Birthday to You 🎶</p>
          <p className="text-lg mt-2">May all your wishes come true! 🎁</p>
        </div>
      )}
    </section>
  );
};

export default GenerateSong;
