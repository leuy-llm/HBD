import { useEffect, useRef } from 'react';

const FireworksAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gravity = -0.1;
  const fireworksRef: any = useRef([]);
  const subFireworksRef: any = useRef([]);
  
  const colors = ["Blue", "Orange", "Red", "Purple", "Green"];
  const initializeCountRef = useRef(0);
  const maximumInitialize = 1;
  const initDelay = 500; // ms
  const fireworkRadius = 5;
  const particleCount = 120;
  const speedMultiplier = 5;

  class Firework {
    x: number;
    y: number;
    radius: number;
    velocityX: number;
    velocityY: number;
    color: string;
    opacity: number;
    constructor(x: number, y: number, radius: number, velocityX: number, velocityY: number, color: string) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.velocityX = velocityX;
      this.velocityY = velocityY;
      this.color = color;
      this.opacity = 1;
    }

    update() {
      this.velocityY -= gravity;
      this.x += this.velocityX;
      this.y += this.velocityY;
      this.opacity -= 0.006;
      if (this.opacity < 0) this.opacity = 0;
    }

    draw(ctx: any) {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  }

  // const createSubFireworks = (x: number, y: number, count: number, color: string, speedMultiplier: number) => {
  //   let created = 0;
  //   let radians = (Math.PI * 2) / count;

  //   while (created < count) {
  //     let firework = new Firework(
  //       x, y, fireworkRadius,
  //       Math.cos(radians * created) * Math.random() * speedMultiplier,
  //       Math.sin(radians * created) * Math.random() * speedMultiplier,
  //       colors[Math.floor(Math.random() * colors.length)]
  //     );
  //     subFireworksRef.current.push(firework);
  //     created++;
  //   }
  // };
  const createSubFireworks = (x: number, y: number, count: number, color: string, speedMultiplier: number) => {
  let created = 0;
  let radians = (Math.PI * 2) / count;

  while (created < count) {
    let firework = new Firework(
      x, y, fireworkRadius,
      Math.cos(radians * created) * Math.random() * speedMultiplier,
      Math.sin(radians * created) * Math.random() * speedMultiplier,
      color // Use the color parameter here
    );
    subFireworksRef.current.push(firework);
    created++;
  }
};

  const update = () => {
    const canvas = canvasRef.current; 
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;
    
    ctx.fillStyle = "rgba(10,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (initializeCountRef.current < maximumInitialize) {
      let firework = new Firework(
        Math.random() * canvas.width,
        canvas.height + Math.random() * 70,
        fireworkRadius,
        3 * (Math.random() - 0.5),
        -12,
        colors[Math.floor(Math.random() * colors.length)]
      );
      fireworksRef.current.push(firework);
      
      setTimeout(() => {
        initializeCountRef.current--;
      }, initDelay);
      initializeCountRef.current++;
    }

    fireworksRef.current.forEach((firework: any, i: number) => {
      if (firework.opacity <= 0.1) {
        fireworksRef.current.splice(i, 1);
        createSubFireworks(
          firework.x, firework.y, particleCount,
          firework.color, speedMultiplier
        );
      } else {
        firework.update();
      }
    });

    subFireworksRef.current.forEach((firework: any, i: number) => {
      if (firework.opacity <= 0) {
        subFireworksRef.current.splice(i, 1);
      } else {
        firework.update();
      }
    });
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    
    fireworksRef.current.forEach((firework: any) => {
      firework.draw(ctx);
    });
    
    subFireworksRef.current.forEach((firework: any) => {
      firework.draw(ctx);
    });
  };

  const animate = () => {
    requestAnimationFrame(animate);
    update();
    draw();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    // Set canvas dimensions to match its display size
    if(!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    animate();

    return () => {
     
    };
  }, []);

  return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-yellow-100 text-blue-900 p-6">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

      <div className="z-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 animate-bounce">Happy Birthday, Sarah! 🎉</h1>
        <p className="text-lg mb-6 text-center max-w-xl">
          Wishing you all the happiness in the world. May your day be filled with smiles,
          laughter, and endless joy! 💖
        </p>

        <div className="swiper-container w-full max-w-md rounded-lg overflow-hidden">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <img src="/images/photo1.jpg" alt="memory 1" className="w-full" />
            </div>
            <div className="swiper-slide">
              <img src="/images/photo2.jpg" alt="memory 2" className="w-full" />
            </div>
            <div className="swiper-slide">
              <img src="/images/photo3.jpg" alt="memory 3" className="w-full" />
            </div>
          </div>
        </div>

        {/* <button
          onClick={playMusic}
          className="mt-8 bg-yellow-400 text-blue-900 font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition transform duration-300"
        >
          Play Song 🎶
        </button> */}

        <audio id="birthdaySong" src="/music/happy.mp3" />
      </div>
    </div>
  );
};

export default FireworksAnimation;