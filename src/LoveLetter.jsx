import React, { useState, useEffect } from "react";

export default function LoveLetter() {
  const [text, setText] = useState("");
  const [hearts, setHearts] = useState([]);

  const fullText =
    "From the very first moment you entered my life, everything changed in the most beautiful way. Your laughter became my favorite sound, your presence my safest place, and your love my greatest gift. With you, even the ordinary moments feel extraordinary. I promise to cherish you, to stand by you, and to love you deeper with every passing day. You are my today, my tomorrow, and every dream in between. Forever isn’t long enough when it’s with you ❤️";

  /* ✨ TYPEWRITER */
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 32);
    return () => clearInterval(interval);
  }, []);

  /* ❤️ FLOATING HEARTS */
  useEffect(() => {
    const createHeart = () => {
      const id = Date.now() + Math.random();
      setHearts((prev) => [
        ...prev,
        {
          id,
          left: Math.random() * 100,
          size: 14 + Math.random() * 20,
          duration: 6 + Math.random() * 8,
        },
      ]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 14000);
    };

    const interval = setInterval(createHeart, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="letter-page">
      {/* ❤️ Hearts */}
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

      {/* 💌 Letter */}
      <div className="letter-box">
        <h1 className="title">A Letter From My Heart 💖</h1>

        <img
          src="/image/elventh.jpeg"
          alt="Love"
          className="letter-image"
        />

        <p className="text">{text}</p>
      </div>

      <style>{`
        body { margin:0; font-family:"Segoe UI", sans-serif; }

        .letter-page{
          width:100vw;
          min-height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          padding:20px;
          box-sizing:border-box;
          background: radial-gradient(circle at top,#ff9a9e,#fad0c4,#fbc2eb,#a18cd1);
          background-size:300% 300%;
          animation:bgFlow 14s ease infinite;
          position:relative;
          overflow:hidden;
        }

        @keyframes bgFlow{
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
        }

        /* 💌 CARD */
        .letter-box{
          width:100%;
          max-width:700px;
          background:linear-gradient(180deg,#ffffff,#fff5f8);
          padding:40px;
          border-radius:28px;
          text-align:center;
          box-shadow:0 25px 60px rgba(0,0,0,.18);
          animation:fadeIn 1.2s ease, floatPaper 6s ease-in-out infinite;
          z-index:2;
        }

        @keyframes fadeIn{
          from{opacity:0; transform:translateY(30px);}
          to{opacity:1; transform:translateY(0);}
        }

        @keyframes floatPaper{
          0%,100%{transform:translateY(0);}
          50%{transform:translateY(-6px);}
        }

        .title{
          color:#c2185b;
          margin-bottom:18px;
          font-size:clamp(22px,4vw,34px);
          font-weight:700;
        }

        .text{
          font-size:clamp(14px,2.6vw,18px);
          line-height:1.8;
          color:#6a1b3d;
        }

        .letter-image{
          width:100%;
          max-width:380px;
          margin:18px auto;
          border-radius:18px;
          box-shadow:0 12px 28px rgba(0,0,0,.2);
          animation:floatImage 6s ease-in-out infinite;
        }

        @keyframes floatImage{
          0%,100%{transform:translateY(0);}
          50%{transform:translateY(-6px);}
        }

        /* ❤️ HEARTS */
        .hearts span{
          position:absolute;
          bottom:-40px;
          opacity:.75;
          animation:floatUp linear forwards;
          pointer-events:none;
        }

        @keyframes floatUp{
          from{transform:translateY(0) scale(1);}
          to{transform:translateY(-120vh) scale(1.3);}
        }

        /* 📱 MOBILE */
        @media (max-width:600px){
          .letter-box{
            padding:24px;
            border-radius:22px;
          }
        }
      `}</style>
    </div>
  );
}
