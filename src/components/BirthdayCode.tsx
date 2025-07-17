import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const PickupLine: React.FC = () => {
  const [show, setShow] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [modalStep, setModalStep] = useState<
    "main" | "follow1" | "follow2" | "video" | "final" | null
  >("main");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (text: string, callback?: () => void) => {
    setToastText(text);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
      if (callback) callback();
    }, 2500);
  };

  const handleMainAnswer = (answer: string) => {
    if (answer === "yes") {
      setModalStep("video");
    } else {
      setModalStep("follow1");
    }
  };

  const handleFollow1 = (answer: string) => {
    if (answer === "yes") {
      setModalStep("follow2");
    } else {
      setModalStep("video"); // Show video again
    }
  };

  const handleFollow2 = (answer: string) => {
    if (answer === "yes") {
      setModalStep("video"); // Show video again
    } else {
      showToast("Hmm... I still don’t believe you 😆");
    }
  };

  const ModalWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="animate-bounce-in bg-white rounded-3xl shadow-2xl p-6 max-w-md w-[90%] text-center border border-pink-200 relative">
        {children}
      </div>
    </div>
  );

  const handleVideoEnd = () => {
    setModalStep("final");
  };

  return (
    <>
      {show && modalStep === "main" && (
        <ModalWrapper>
          <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-3xl">
           🎈🎀
          </div>
          <h2 className="text-pink-600 text-2xl font-bold mb-4">
            Hey, quick question...
          </h2>
          <p className="text-gray-800 text-lg sm:text-xl leading-relaxed mb-6">
            Did it hurt? <br className="hidden sm:block" />
            When you fell from heaven? 😇
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleMainAnswer("yes")}
              className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full transition duration-300 shadow"
            >
              Yes, a lot 😅
            </button>
            <button
              onClick={() => handleMainAnswer("no")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-full transition duration-300 shadow"
            >
              Nope 😎
            </button>
          </div>
        </ModalWrapper>
      )}

      {modalStep === "follow1" && (
        <ModalWrapper>
          <p className="text-gray-800 text-lg sm:text-xl leading-relaxed mb-6">
            You mean you're just a normal person? 🥹
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleFollow1("yes")}
              className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full transition duration-300 shadow"
            >
              Yes 😇
            </button>
            <button
              onClick={() => handleFollow1("no")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-full transition duration-300 shadow"
            >
              No 🤔
            </button>
          </div>
        </ModalWrapper>
      )}

      {modalStep === "follow2" && (
        <ModalWrapper>
          <p className="text-gray-800 text-lg sm:text-xl leading-relaxed mb-6">
            Really? Are you lying? I don’t believe you 😏
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleFollow2("yes")}
              className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full transition duration-300 shadow"
            >
              Yes 😇
            </button>
            <button
              onClick={() => handleFollow2("no")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-full transition duration-300 shadow"
            >
              No 🙈
            </button>
          </div>
        </ModalWrapper>
      )}

      {modalStep === "video" && (
        <ModalWrapper>
          <video
            ref={videoRef}
            src="/videos/video_2025-07-16_08-58-09.mp4"
            controls
            autoPlay
            onEnded={handleVideoEnd}
            className="rounded-xl w-full h-auto"
          />
        </ModalWrapper>
      )}

      {modalStep === "final" && (
        <ModalWrapper>
          <p className="text-gray-800 text-lg sm:text-xl leading-relaxed mb-6">
            That was just for you 💖 Hope it made you smile 😊
          </p>
          <button
            onClick={() => {
              setModalStep(null);
              showToast("Happy Birthday! 🐯", () => navigate("/birthday"));
            }}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full transition duration-300 shadow"
          >
            Awww 🥺
          </button>
        </ModalWrapper>
      )}

      {toastVisible && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-pink-600 font-medium px-6 py-3 rounded-xl shadow-lg z-50 animate-drop-in border border-pink-300">
          {toastText}
        </div>
      )}
    </>
  );
};

export default PickupLine;
