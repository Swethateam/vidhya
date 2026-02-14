import { useState, useRef } from "react";
import HeartPuzzle from "./heartpuzzle";
import Magazine from "./magazine";
import LoveLetter from "./LoveLetter";

export default function App() {
  const [step, setStep] = useState(0);
  const [password, setPassword] = useState("");
  const videoRef = useRef(null);
  const [animateGift, setAnimateGift] = useState(false);
  const [openGift, setOpenGift] = useState(false);
  const bgAudioRef = useRef(null);

  const correctPassword = "vidhya";

  const handleGiftClick = () => {
    setAnimateGift(true);
    setTimeout(() => setOpenGift(true), 1500);
    setTimeout(() => setStep(2), 3000);
  };

  const handleLogin = () => {
    if (password === correctPassword) {
      if (!bgAudioRef.current) {
        const audio = new Audio("/AUDIO/BG.mp3");
        audio.loop = true;
        audio.volume = 0.5;
        audio.play().catch(() => {});
        bgAudioRef.current = audio;
      }
      setStep(1);
    } else {
      alert("Wrong Password 💔");
    }
  };

  return (
    <div style={styles.container}>
      {/* LOGIN */}
      {step === 0 && (
        <div style={styles.heroSection}>
          <div style={styles.leftSection}>
            <img src="/image/first image.jpeg" alt="" style={styles.heroImage} />
          </div>

          <div style={styles.rightSection}>
            <h1 style={styles.mainTitle}>A Journey Written in Love</h1>
            <p style={styles.quote}>
              “Every love story is beautiful, but ours is my favorite.”
            </p>

            <input
              type="password"
              placeholder="Enter the secret"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={styles.underlineInput}
            />

            <button style={styles.heroButton} onClick={handleLogin}>
              See Our Journey 💗
            </button>
          </div>

          <div style={styles.blur1}></div>
          <div style={styles.blur2}></div>
        </div>
      )}

      {step === 1 && (
  <div style={styles.spiderPage}>

    {/* Stickers */}
    <img
      src="/image/2nd.png"
      alt="web"
      style={{ ...styles.sticker, top: "90px", left: "9px", width: "180px" }}
      className="fadeIn"
    />

    <img
      src="/image/sticker.png"
      alt="web"
      style={{ ...styles.sticker, bottom: "30px", right: "200px", width: "400px" }}
      className="fadeIn"
    />

    <img
      src="/image/1st-removebg-preview.png"
      alt="spider"
      style={{ ...styles.sticker, bottom: "300px", right: "120px", width: "360px" }}
      className="spiderSwing"
    />

    {/* Right Text */}
    <div
      style={styles.rightText}
      className={animateGift ? "textExit" : ""}
    >
      <div style={styles.valentine}>HAPPY VALENTINE'S DAY</div>
      <div style={styles.dear}>MY DEAR</div>
      <div style={styles.spiderman}>SPIDER MAN</div>
    </div>

    {/* Gift Wrapper */}
    <div
      style={styles.bigGiftWrapper}
      className={animateGift ? "giftCenter" : ""}
    >
      <img
        src="/image/unnamed-removebg-preview.png"
        alt="Gift"
        style={styles.bigGiftImage}
        onClick={handleGiftClick}
        className={`
          ${!animateGift ? "bigGiftBounce" : ""}
          ${openGift ? "giftOpen" : ""}
        `}
      />
      <p style={styles.clickText}>Click the Gift</p>
    </div>

  </div>
)}


      {/* VIDEO */}
      {step === 2 && (
        <div style={styles.videoWrapper}>
          <video
            ref={videoRef}
            src="/video/vidhya.mp4"
            autoPlay
            controls
            style={styles.video}
            onPlay={() => bgAudioRef.current?.pause()}
            onEnded={() => {
              bgAudioRef.current?.play();
              setStep(3);
            }}
          />
        </div>
      )}

      {step === 3 && <HeartPuzzle onComplete={() => setStep(4)} />}
      {step === 4 && <Magazine onComplete={() => setStep(5)} />}
      {step === 5 && <LoveLetter />}

      <style>{`
        .giftBounce { animation: bounce 1.4s infinite; }
        @keyframes bounce {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-25px)}
        }
          /* 🎁 initial bounce */
.bigGiftBounce {
  animation: bounce 1.5s infinite;
}

/* 🎁 move gift to right after click */
.giftCenter {
  animation: moveRight 1.2s forwards ease;
}

@keyframes moveRight {
  0% { transform: translateY(-50%) translateX(0); }
  100% { transform: translateY(-50%) translateX(250px); }
}

/* 🎁 small open effect */
.giftOpen {
  animation: giftPop 0.6s ease forwards;
}

@keyframes giftPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

/* ✨ text disappear */
.textExit {
  animation: textFade 0.8s forwards ease;
}

@keyframes textFade {
  to {
    opacity: 0;
    transform: translateX(80px);
  }
}

      `}</style>
    </div>
  );
}

const styles = {
  container: { width: "100vw", minHeight: "100vh", overflow: "hidden" },

  heroSection: {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    padding: "40px 20px",
    background: "linear-gradient(135deg,#2b0a3d,#9c2f6f)",
    color: "white",
    position: "relative",
  },

  leftSection: { display: "flex", justifyContent: "center" },
  heroImage: { width: "100%", maxWidth: 320, borderRadius: 20 },

  rightSection: { maxWidth: 500, display: "flex", flexDirection: "column", gap: 25 },
  mainTitle: { fontSize: 48, fontWeight: 700 },
  quote: { opacity: 0.9 },

  underlineInput: {
    background: "transparent",
    border: "none",
    borderBottom: "2px solid rgba(255,255,255,0.6)",
    padding: "12px 5px",
    color: "white",
    fontSize: 18,
    outline: "none",
  },

  heroButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 30,
    border: "none",
    background: "#ff4f81",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },

  blur1: {
    position: "absolute",
    width: 200,
    height: 200,
    background: "rgba(255,120,180,0.4)",
    borderRadius: "50%",
    filter: "blur(100px)",
    bottom: 50,
    left: 50,
    pointerEvents: "none",
  },

  blur2: {
    position: "absolute",
    width: 250,
    height: 250,
    background: "rgba(255,255,255,0.2)",
    borderRadius: "50%",
    filter: "blur(120px)",
    top: 50,
    right: 80,
    pointerEvents: "none",
  },

  spiderPage: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    backgroundImage: "url('/image/Gemini_Generated_Image_9hn9g79hn9g79hn9.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  sticker: {
    position: "absolute",
    zIndex: 1,
    width: 180,
    pointerEvents: "none",
  },

  bigGiftWrapper: {
    position: "absolute",
    left: "10%",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  bigGiftImage: {
    width: "35vw",
    maxWidth: 450,
    minWidth: 200,
    cursor: "pointer",
  },

  clickText: { marginTop: 20, fontSize: 20, color: "white", textShadow: "0 0 10px black" },

  rightText: {
    position: "absolute",
    right: "35%",
    top: "50%",
    transform: "translateY(-50%)",
    textAlign: "right",
    zIndex: 3,
  },

  valentine: { fontSize: 34, fontWeight: 600 },
  dear: { fontSize: 28, fontStyle: "italic" },
  spiderman: { fontSize: 48, fontWeight: 900 },

  videoWrapper: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "black" },
  video: { width: "100%", maxWidth: 700 },
};
