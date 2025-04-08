"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-black via-purple-900 to-indigo-900 relative overflow-hidden">
      <ConfettiBackground />
      <Fireworks />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
      >
        <CelebrationSVG />
      </motion.div>
      <motion.h1
        className="text-6xl font-extrabold mt-8 text-pink-400 drop-shadow-glow z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
      >
        Aeeee!!!
      </motion.h1>

      <style jsx global>{`
        .drop-shadow-glow {
          text-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 30px #f472b6;
        }
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes explode {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}

function CelebrationSVG() {
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="z-10"
    >
      <path
        d="M32 2C33.1046 2 34 2.89543 34 4V8C34 9.10457 33.1046 10 32 10C30.8954 10 30 9.10457 30 8V4C30 2.89543 30.8954 2 32 2Z"
        fill="#A78BFA"
      />
      <circle cx="32" cy="32" r="28" stroke="#C084FC" strokeWidth="4" />
      <path
        d="M14 50C18 40 46 24 50 14"
        stroke="#7C3AED"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="3" fill="#34D399" />
      <circle cx="44" cy="18" r="3" fill="#60A5FA" />
      <circle cx="38" cy="44" r="3" fill="#F472B6" />
    </svg>
  );
}

function ConfettiBackground() {
  const confettiCount = 40;
  const confettis = Array.from({ length: confettiCount });

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {confettis.map((_, i) => (
        <span
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            backgroundColor: randomNeonColor(),
            animation: `fall ${4 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: `0 0 8px ${randomNeonColor()}`,
          }}
        />
      ))}
    </div>
  );
}

function randomNeonColor() {
  const neonColors = [
    "#f472b6",
    "#a78bfa",
    "#34d399",
    "#60a5fa",
    "#facc15",
    "#22d3ee",
  ];
  return neonColors[Math.floor(Math.random() * neonColors.length)];
}

function Fireworks() {
  const [bursts, setBursts] = useState<
    { id: number; top: number; left: number; color: string }[]
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setBursts((prev) => [
        ...prev,
        {
          id,
          top: Math.random() * 80,
          left: Math.random() * 80,
          color: randomNeonColor(),
        },
      ]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, 1000);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {bursts.map((burst) => (
        <span
          key={burst.id}
          className="absolute w-4 h-4 rounded-full"
          style={{
            top: `${burst.top}%`,
            left: `${burst.left}%`,
            backgroundColor: burst.color,
            animation: "explode 1s ease-out forwards",
            boxShadow: `0 0 12px ${burst.color}, 0 0 30px ${burst.color}`,
          }}
        />
      ))}
    </div>
  );
}
