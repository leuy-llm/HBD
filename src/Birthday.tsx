import { useState, useEffect, useRef } from "react";
import Fireworks from "./components/Fireworks";
import Balloons from "./components/Balloons";
import Girl2 from "./assets/images/image2.png";

function Birthday() {
  const [fireworkTrigger, setFireworkTrigger] = useState(false);
  const [showBirthdayImage, setShowBirthdayImage] = useState(false);
  const [showWishModal, setShowWishModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <audio ref={audioRef} src="/happysong.mp3" preload="auto" />

        {!fireworkTrigger && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 space-y-4">
            <div className="flex flex-col gap-6">
              <button
                onClick={handleClick}
                className="px-8 py-3 focus:outline-none bg-pink-500 text-white rounded shadow-lg"
              >
                Play Song 🎵
              </button>
              <button
                onClick={() => setShowWishModal(true)}
                className="px-6 py-3 bg-yellow-500 focus:outline-none text-white rounded shadow-lg"
              >
                Special Wish 🎁
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

              {/* Video */}
              <video
                src="/videos/okBfAeNSQ8UIIEzAgkDnTkbAR0L4QvWYBJsIPR.mp4"
                controls
                autoPlay
                onEnded={() => setShowWishModal(false)} // 👈 Auto close when video ends
                className="rounded-xl w-full h-auto mb-4"
              />

              {/* Caption */}
              <p className="text-center text-pink-600 font-bold text-lg">
                🎉 Happy Birthday — July 17 🎂
              </p>
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
