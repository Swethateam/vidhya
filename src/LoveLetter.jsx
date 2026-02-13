import React, { useState, useEffect } from "react";

export default function LoveLetter() {
  const [text, setText] = useState("");
  const [hearts, setHearts] = useState([]);

  const fullText =
    "From the very first moment you entered my life, everything changed in the most beautiful way. Your laughter became my favorite sound, your presence my safest place, and your love my greatest gift. With you, even the ordinary moments feel extraordinary. I promise to cherish you, to stand by you, and to love you deeper with every passing day. You are my today, my tomorrow, and every dream in between. Forever isn’t long enough when it’s with you ❤️";

  /* ✨ TYPEWRITER EFFECT */
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 32);
    return () => clearInterval(interval);
  }, []);

  /* ❤️ CONTINUOUS FLOATING HEARTS */
  useEffect(() => {
    const createHeart = () => {
      const id = Date.now() + Math.random();
      setHearts((prev) => [
        ...prev,
        {
          id,
          left: Math.random() * 100,
          size: 18 + Math.random() * 22,
          duration: 8 + Math.random() * 10,
        },
      ]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 18000);
    };

    const interval = setInterval(createHeart, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="letter-page">
      {/* ❤️ FLOATING HEARTS */}
      <div className="hearts">
        {hearts.map((h) => (
          <span
            key={h.id}
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationDuration: `${h.duration}s`,
            }}
          >
            ❤
          </span>
        ))}
      </div>

      {/* 💌 LETTER */}
      <div className="letter-box">
  <h1 className="title">A Letter From My Heart 💖</h1>

  {/* ❤️ IMAGE */}
  <img 
    src="/image/elventh.jpeg" 
    alt="Love" 
    className="letter-image" 
  />

  <p className="text">{text}</p>
</div>


      <style>{`
        body {
          margin: 0;
          font-family: "Segoe UI", sans-serif;
        }
          .letter-image {
  width: 80%;          /* fits nicely inside letter */
  max-width: 400px;    /* optional max size */
  margin: 20px auto;   /* spacing above and below */
  border-radius: 20px; /* soft rounded corners */
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
  animation: floatImage 6s ease-in-out infinite;
}

/* subtle floating animation like paper */
@keyframes floatImage {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}


        /* 🌷 ROMANTIC BACKGROUND */
        .letter-page {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(
            circle at top,
            #ff9a9e,
            #fad0c4,
            #fbc2eb,
            #a18cd1
          );
          background-size: 300% 300%;
          animation: bgFlow 14s ease infinite;
          position: relative;
          overflow: hidden;
        }

        @keyframes bgFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* 💌 LETTER CARD */
        .letter-box {
          width: 65%;
          max-width: 750px;
          background: linear-gradient(180deg, #ffffff, #fff5f8);
          padding: 50px;
          border-radius: 35px;
          text-align: center;
          box-shadow:
            0 30px 70px rgba(0, 0, 0, 0.2),
            0 0 50px rgba(255, 105, 180, 0.35);
          position: relative;
          z-index: 2;
          animation: fadeIn 1.4s ease, floatPaper 7s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatPaper {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .title {
          color: #c2185b;
          margin-bottom: 26px;
          font-size: 36px;
          font-weight: 700;
        }

        .text {
          font-size: 19px;
          line-height: 1.9;
          color: #6a1b3d;
          min-height: 160px;
        }

        /* ❤️ HEARTS */
        .hearts span {
          position: absolute;
          bottom: -40px;
          opacity: 0.75;
          animation: floatUp linear forwards;
          pointer-events: none;
          text-shadow: 0 0 12px rgba(255, 20, 80, 0.7);
        }

        @keyframes floatUp {
          from { transform: translateY(0) scale(1); }
          to { transform: translateY(-130vh) scale(1.4); }
        }
      `}</style>
    </div>
  );
}
