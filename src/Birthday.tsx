import { useState, useEffect, useRef } from "react";
import Fireworks from "./components/Fireworks";
import Balloons from "./components/Balloons";
import Girl2 from "./assets/images/image2.png";
import confetti from "canvas-confetti";

function Birthday() {
  const [fireworkTrigger, setFireworkTrigger] = useState(false);
  const [showBirthdayImage, setShowBirthdayImage] = useState(false);
  const [showWishModal, setShowWishModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [wishType, setWishType] = useState<"normal" | "special" | null>(null);
  const [showIntroModal, setShowIntroModal] = useState(true);

  const handleClick = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio
        .play()
        .then(() => console.log("Birthday song is playing..."))
        .catch((err) => {
          console.error("Audio play failed:", err);
          triggerAfterSong();
        });
      audio.onended = triggerAfterSong;
    } else {
      triggerAfterSong();
    }
  };

  const triggerAfterSong = () => {
    setFireworkTrigger(true);
    setShowBirthdayImage(true);
  };

  useEffect(() => {
    if (!showBirthdayImage) return;
    const timeout = setTimeout(() => setShowBirthdayImage(false), 4000);
    return () => clearTimeout(timeout);
  }, [showBirthdayImage]);

  useEffect(() => {
    const colors = ["#ff69b4", "#ffd700", "#00bfff", "#ffffff"];

    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });
    }, 250); // Adjust timing as needed

    return () => clearInterval(confettiInterval); // Stop confetti on unmount
  }, []);

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <audio ref={audioRef} src="/happysong.mp3" preload="auto" />
        {showIntroModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm mx-auto text-center animate-bounce">
              <p className="mb-4 text-lg font-medium">
                You must listen to the Birthday song to the end.
              </p>
              <button
                onClick={() => setShowIntroModal(false)}
                className="px-6 py-2 w-full bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none">
                OK
              </button>
            </div>
          </div>
        )}

        {!fireworkTrigger && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 space-y-4">
            <div className="flex flex-col gap-6">
              <h1 className="text-center">ស្តាប់តាមលំដាប់លំដោយ</h1>
              <button
                onClick={() => {
                  setWishType("normal");
                  setShowWishModal(true);
                }}
                className="px-6 py-3 bg-blue-500 focus:outline-none text-white rounded shadow-lg"
              >
                Message 🐯
              </button>

              <button
                onClick={() => {
                  setWishType("special");
                  setShowWishModal(true);
                }}
                className="px-6 py-3 bg-yellow-500 focus:outline-none text-white rounded shadow-lg"
              >
                Watch Video 🎁
              </button>
              <button
                onClick={handleClick}
                className="px-8 py-3 focus:outline-none bg-pink-500 text-white rounded shadow-lg"
              >
                HBD Song 🎵
              </button>
            </div>
          </div>
        )}

        {fireworkTrigger && (
          <>
            {showBirthdayImage && (
              <img
                src={Girl2}
                alt="Happy Birthday"
                className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50 w-1/2 md:w-1/3 h-auto animate-bounce-in"
              />
            )}
            <Balloons />
          </>
        )}

        <Fireworks trigger={fireworkTrigger} />

        {/* 🎬 Special Wish Modal */}
        {showWishModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl w-[90%] md:w-[600px] p-4 animate-drop-in relative">
              {/* Close Button */}
              <button
                onClick={() => setShowWishModal(false)}
                className="absolute top-2 right-4 text-gray-500 focus:outline-none hover:text-black text-xl"
              >
                ×
              </button>

              {/* Normal Wish Image (Only show if wishType is "normal") */}
              {wishType === "normal" && (
                <div className="flex justify-center mb-4">
                  <img
                    src={Girl2} // 👈 update this path to your actual image
                    alt="Birthday Cake"
                    className="w-24 h-24 object-contain rounded-full shadow-md"
                  />
                </div>
              )}

              {/* Special Wish Video (Only show if wishType is "special") */}
              {wishType === "special" ? (
                <>
                  <video
                    src="/videos/okBfAeNSQ8UIIEzAgkDnTkbAR0L4QvWYBJsIPR.mp4"
                    controls
                    autoPlay
                    onEnded={() => setShowWishModal(false)}
                    className="rounded-xl w-full h-auto mb-4"
                  />
                  <p className="text-center text-pink-600 font-bold text-lg mt-2">
                    🎉 HBD 🎂
                  </p>
                </>
              ) : (
                <div className="text-center text-lg text-gray-800 mb-4">
                  <p className="text-base text-pink-500 animate-fade-in-up delay-600">
                    – Happy Birthday! 🎉
                    <br /> 17-July 🎂
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed animate-fade-in-up delay-200">
                    - 🎉Wishing you a day filled with love, laughter, and
                    endless.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed animate-fade-in-up delay-300">
                    - You have a great smile and a kind heart. You make people
                    around you feel good.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed animate-fade-in-up delay-500">
                    - I wish you many happy days ahead and hope all your dreams
                    come true!
                  </p>
                </div>
              )}

              {/* Caption (Same for both) */}
            </div>
          </div>
        )}
      </div>

      {/* Optional Tailwind Animation */}
      <style></style>
    </>
  );
}

export default Birthday;
