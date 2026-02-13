'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ValentinePage() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const moveButton = () => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    setNoButtonPosition({ x, y });
  };

  const handleAccepted = () => {
    setIsAccepted(true);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans text-pink-800">
      <Head>
        <title>Will You Be My Valentine?</title>
      </Head>

      {!isAccepted ? (
        <div className="text-center animate-fade-in">
          <div className="mb-8 text-6xl">❤️</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-12 drop-shadow-sm">
            Hello baby, will you be my valentine?
          </h1>
          
          <div className="flex gap-8 justify-center items-center">
            <button
              onClick={handleAccepted}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-10 rounded-full text-2xl transition-all transform hover:scale-110 shadow-lg active:scale-95"
            >
              Yes
            </button>

            <button
              onMouseEnter={moveButton}
              onClick={moveButton}
              style={{
                position: noButtonPosition.x === 0 ? 'relative' : 'fixed',
                left: noButtonPosition.x !== 0 ? `${noButtonPosition.x}px` : 'auto',
                top: noButtonPosition.y !== 0 ? `${noButtonPosition.y}px` : 'auto',
                transition: 'all 0.2s ease-out',
                zIndex: 50,
              }}
              className="bg-gray-400 text-white font-bold py-4 px-10 rounded-full text-2xl shadow-md cursor-default pointer-events-auto"
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center animate-bounce-in">
          <div className="mb-8 text-8xl">🥰</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-red-600">
            Yay! I love you so much! ❤️
          </h1>
          
          <div className="mt-12 flex justify-center gap-4">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="animate-float text-4xl" style={{ animationDelay: `${i * 0.2}s` }}>
                ❤️
              </span>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.36, 0, 0.66, -0.56) forwards;
        }
        .animate-float {
          position: absolute;
          bottom: -20px;
          animation: float 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
