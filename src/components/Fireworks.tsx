import React, { useEffect, useRef, useState } from "react";

interface Shell {
  x: number;
  y: number;
  xoff: number;
  yoff: number;
  size: number;
  color: string;
}

interface Pass {
  x: number;
  y: number;
  xoff: number;
  yoff: number;
  size: number;
  color: string;
}

const colors: string[] = [
  "#FF5252",
  "#FF4081",
  "#E040FB",
  "#7C4DFF",
  "#536DFE",
  "#448AFF",
  "#40C4FF",
  "#18FFFF",
  "#64FFDA",
  "#69F0AE",
  "#B2FF59",
  "#EEFF41",
  "#FFFF00",
  "#FFD740",
  "#FFAB40",
  "#FF6E40",
];

interface FireworksCanvasProps {
  className?: string;
  trigger?: boolean;
  onComplete?: () => void;
}

const Fireworks: React.FC<FireworksCanvasProps> = ({
  className,
  trigger,
  onComplete,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number>(0);
  const shells = useRef<Shell[]>([]);
  const pass = useRef<Pass[]>([]);
  const cwidth = useRef<number>(window.innerWidth);
  const cheight = useRef<number>(window.innerHeight);
  const lastRun = useRef<number>(0);
  const [birthdayMessage, setBirthdayMessage] = useState("");
  const explosionSounds = useRef<HTMLAudioElement[]>([]);
  const [imageDropped, setImageDropped] = useState(false);

  // Load sounds once
  useEffect(() => {
    explosionSounds.current = [
      new Audio("/mixkit-bomb-drop-impact-2804.wav"),
      new Audio("/mixkit-multiple-fireworks-explosions-1689.wav"),
    ];
    explosionSounds.current.forEach((sound) => {
      sound.volume = 0.5;
    });
  }, []);

  const playRandomExplosion = () => {
    const index = Math.floor(Math.random() * explosionSounds.current.length);
    const clone = explosionSounds.current[
      index
    ].cloneNode() as HTMLAudioElement;
    clone.volume = 0.5;
    clone.play().catch(() => {});
  };

  const newPass = (shell: Shell) => {
    const pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);
    for (let i = 0; i < pasCount; i++) {
      const a = Math.random() * 4;
      const s = Math.random() * 10;
      const pas: Pass = {
        x: shell.x * cwidth.current,
        y: shell.y * cheight.current,
        xoff: s * Math.sin((5 - a) * (Math.PI / 2)),
        yoff: s * Math.sin(a * (Math.PI / 2)),
        color: shell.color,
        size: Math.sqrt(shell.size),
      };
      if (pass.current.length < 1000) pass.current.push(pas);
    }

    playRandomExplosion();

    if (shell.size > 8) {
      setBirthdayMessage("Happy Birthday Beautiful Girl \n😸");
    }
  };

  useEffect(() => {
    if (!trigger) return; // Don't run fireworks if not triggered

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reset = () => {
      cwidth.current = window.innerWidth;
      cheight.current = window.innerHeight;
      canvas.width = cwidth.current;
      canvas.height = cheight.current;
    };

    const newShell = () => {
      const left = Math.random() > 0.5;
      const shell: Shell = {
        x: left ? 1 : 0,
        y: 1,
        xoff: (0.01 + Math.random() * 0.007) * (left ? 1 : -1),
        yoff: 0.01 + Math.random() * 0.007,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      shells.current.push(shell);
    };

    const run = () => {
      const now = performance.now();
      const dt = lastRun.current ? Math.min(50, now - lastRun.current) : 1;
      lastRun.current = now;

      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, cwidth.current, cheight.current);

      if (shells.current.length < 10 && Math.random() > 0.96) newShell();

      for (let i = shells.current.length - 1; i >= 0; i--) {
        const shell = shells.current[i];

        ctx.beginPath();
        ctx.arc(
          shell.x * cwidth.current,
          shell.y * cheight.current,
          shell.size,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = shell.color;
        ctx.fill();

        shell.x -= shell.xoff;
        shell.y -= shell.yoff;
        shell.xoff -= shell.xoff * dt * 0.001;
        shell.yoff -= (shell.yoff + 0.2) * dt * 0.00005;

        if (shell.yoff < -0.005) {
          newPass(shell);
          shells.current.splice(i, 1);
        }
      }

      for (let i = pass.current.length - 1; i >= 0; i--) {
        const pas = pass.current[i];

        ctx.beginPath();
        ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
        ctx.fillStyle = pas.color;
        ctx.fill();

        pas.x -= pas.xoff;
        pas.y -= pas.yoff;
        pas.xoff -= pas.xoff * dt * 0.001;
        pas.yoff -= (pas.yoff + 5) * dt * 0.0005;
        pas.size -= dt * 0.002 * Math.random();

        if (pas.y > cheight.current || pas.y < -50 || pas.size <= 0) {
          pass.current.splice(i, 1);
        }
      }

      requestRef.current = requestAnimationFrame(run);
    };

    const handleResize = () => reset();

    const handleClick = (e: MouseEvent) => {
      const x = e.clientX / cwidth.current;
      const y = e.clientY / cheight.current;

      const shell: Shell = {
        x,
        y,
        xoff: 0,
        yoff: 0,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      newPass(shell);
      playRandomExplosion();
    };

    // Reset canvas & clear old shells/passes in case
    reset();
    shells.current = [];
    pass.current = [];
    lastRun.current = 0;

    // Add the big firework shell to start the show
    const bigShell: Shell = {
      x: 0.5,
      y: 0.5,
      xoff: 0,
      yoff: 0,
      size: 10,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    newPass(bigShell);
    playRandomExplosion();

    requestRef.current = requestAnimationFrame(run);
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleClick);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
      setBirthdayMessage(""); // clear message when effect ends
      shells.current = [];
      pass.current = [];
    };
  }, [trigger]);

  // Hide message after 4 seconds every time it's shown
  useEffect(() => {
    if (!birthdayMessage) return;
    const timeout = setTimeout(() => setBirthdayMessage(""), 4000);
    return () => clearTimeout(timeout);
  }, [birthdayMessage]);

  useEffect(() => {
    if (birthdayMessage && !imageDropped) {
      setImageDropped(true);
    }
  }, [birthdayMessage]);

  // Render canvas + message (only when triggered and message set)
  return (
    <>

      <canvas
        ref={canvasRef}
        className={`fixed top-0 left-0 w-full h-full   z-[-1] ${
          className || ""
        }`}
        {...props}
        style={{ display: trigger ? "block" : "none" }}
      />

      {birthdayMessage && (
        <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="flex flex-col items-center justify-center mx-auto">
            {/* {imageDropped && <BirthdayImage />} */}
            <h1
              className="font-extrabold bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 bg-clip-text text-transparent drop-shadow-xl flex justify-center select-none"
              style={{ lineHeight: 1.1 }}
            >
              {birthdayMessage.split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-flex text-white animate-drop-in py-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
            <p className="mt-2 text-white font-semibold text-base sm:text-lg md:text-xl animate-fade-in">
              🎂 July-17🎈🎁
            </p>
          </div>

          {/* Responsive font size via style tag */}
          <style>{`
                h1 {
                    font-size: 1.3rem;
                }
                @media (min-width: 640px) { h1 { font-size: 2.5rem; } }
                @media (min-width: 768px) { h1 { font-size: 3.5rem; } }
                @media (min-width: 1024px) { h1 { font-size: 4.5rem; } }
                @media (min-width: 1280px) { h1 { font-size: 5.5rem; } }
                `}</style>
        </div>
      )}
    </>
  );
};

export default Fireworks;
