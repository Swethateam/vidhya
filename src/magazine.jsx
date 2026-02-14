import React, { useRef, useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";

export default function Magazine({ onComplete }) {
  const book = useRef();

  // 📱 dynamic size
  const [bookSize, setBookSize] = useState({ width: 420, height: 595 });

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;

      if (w < 480) {
        setBookSize({ width: 280, height: 400 });
      } else if (w < 768) {
        setBookSize({ width: 340, height: 480 });
      } else {
        setBookSize({ width: 420, height: 595 });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const pages = [
    { title: "LOVE MAGAZINE", img: "/image/mag1.png", quote: "Every love story is beautiful, but ours is my favorite." },
    { img: "/image/sixth image.jpeg", quote: "In your smile, I see something more beautiful than the stars." },
    { img: "/image/second image.jpeg", quote: "You are my today and all of my tomorrows." },
    { img: "/image/fourth image.jpeg", quote: "With you, every moment feels like home." },
    { img: "/image/third image.jpeg", quote: "I didn’t choose you. My heart did." },
    { img: "/image/fifth image.jpeg", quote: "Love grows stronger with every shared memory." },
    { img: "/image/first image.jpeg", quote: "You are the reason my heart smiles." },
    { img: "/image/seventh image.jpeg", quote: "Forever doesn’t feel long enough with you." },
    { img: "/image/nineth image.jpeg", quote: "You and I — a perfect story written by fate." },
    { img: "/image/tenth.jpeg", quote: "Every page of my life is better with you in it." },
    { img: "/image/elventh.jpeg", quote: "Loving you is the most beautiful thing I’ve ever done." },
    { final: true },
    { blank: true }
  ];

  return (
    <div className="container">
      <HTMLFlipBook
        width={bookSize.width}
        height={bookSize.height}
        size="fixed"
        minWidth={250}
        maxWidth={600}
        showCover
        mobileScrollSupport={true}
        ref={book}
        className="flipbook"
      >
        {pages.map((p, i) =>
          p.blank ? (
            <div key={i} className="page blank" />
          ) : p.final ? (
            <div key={i} className="page love final-page">
              <div className="final-content">
                <img src="/image/gift.png" alt="" className="gift" />
                <h2 className="final-text">Final Gift of 2026 Valentine’s Day 💖</h2>
                <button className="next-btn bounce" onClick={onComplete}>
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div key={i} className="page love">
              <div className="page-header">
                <span className="tag">LOVE</span>
              </div>

              {p.title && <h2 className="title">{p.title}</h2>}

              <div className="img-frame">
                <img src={p.img} alt="" />
              </div>

              <img src="/image/heart.png" alt="" className="heart-img" />
              <p className="quote">{p.quote}</p>
            </div>
          )
        )}
      </HTMLFlipBook>

      <style>{`
        body { margin:0; font-family:"Segoe UI", sans-serif; }

        .container{
          width:100vw;
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background:linear-gradient(270deg,#ff9a9e,#fad0c4,#fbc2eb,#a18cd1);
          background-size:800% 800%;
          animation:bgMove 15s ease infinite;
          overflow:hidden;
        }

        @keyframes bgMove{
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
        }

        .flipbook{ filter: drop-shadow(0 20px 40px rgba(0,0,0,.35)); }

        .page{
          width:100%;
          height:100%;
          padding:14px;
          box-sizing:border-box;
          display:flex;
          flex-direction:column;
          align-items:center;
          text-align:center;
        }

        .love{ background:linear-gradient(160deg,#fff0f5,#ffe4ec,#ffd1dc); }
        .blank{ background:#fff; }

        .page-header{ width:100%; display:flex; justify-content:flex-start; }
        .tag{ background:#ffe1ea; padding:3px 10px; border-radius:20px; font-weight:600; font-size:12px; }

        .title{ margin:6px 0; font-size:clamp(18px,3vw,26px); color:#7a1f3d; }

        .img-frame{
          width:90%;
          border-radius:18px;
          padding:6px;
          background:linear-gradient(135deg,#ff9a9e,#fad0c4,#fbc2eb);
          margin:6px 0;
        }

        .img-frame img{ width:100%; border-radius:14px; }

        .heart-img{ width:clamp(35px,6vw,55px); margin-top:6px; }

        .quote{
          font-style:italic;
          color:#8a2c52;
          font-size:clamp(13px,2.5vw,15px);
          padding:0 6px;
        }

        .final-page{ display:flex; justify-content:center; align-items:center; }

        .gift{
          width:clamp(80px,18vw,120px);
          margin-bottom:14px;
          animation: float 3s ease-in-out infinite;
        }

        .final-text{
          font-size:clamp(16px,4vw,22px);
          color:#c2185b;
          margin-bottom:14px;
          font-weight:600;
          text-align:center;
        }

        @keyframes float{
          0%,100%{ transform:translateY(0); }
          50%{ transform:translateY(-10px); }
        }

        .next-btn{
          padding:10px 24px;
          border:none;
          border-radius:30px;
          background:linear-gradient(135deg,#ff5c8a,#ff2f68);
          color:white;
          font-size:14px;
          cursor:pointer;
          box-shadow:0 8px 18px rgba(255,92,138,.4);
        }

        .bounce{ animation:bounce 1.5s infinite; }

        @keyframes bounce{
          0%,100%{ transform:translateY(0); }
          50%{ transform:translateY(-6px); }
        }

        .stf__block,.stf__item{
          overflow:hidden !important;
          background:transparent !important;
        }
      `}</style>
    </div>
  );
}
