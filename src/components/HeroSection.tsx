import { Cake, Gift, Star } from "lucide-react";
import { useRef } from "react";
import confetti from "canvas-confetti";

function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const triggerConfetti = () => {
    if (canvasRef.current) {
      const myConfetti = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      });

      myConfetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center overflow-hidden">
      {/* 🎆 Canvas for confetti */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none w-full h-full"
      />

      {/* 🌟 Animated background stars */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <Star className="text-white/30 h-4 w-4" />
          </div>
        ))}
      </div>

      {/* 🎉 Main content */}
      <div className="relative z-10 text-center text-white px-4">
        <div className="mb-8">
          <Cake className="h-20 w-20 mx-auto mb-4 text-yellow-300 animate-bounce" />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-pulse">
          Happy Birthday!
        </h1>

        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          🎉 Celebrating another amazing year of life, love, and laughter! 🎉
        </p>

        <button
          onClick={triggerConfetti}
          className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          <Gift className="inline mr-2 h-6 w-6" />
          Celebrate! 🎊
        </button>
       
      </div>
      
    </section>
  );
}

export default Hero;
