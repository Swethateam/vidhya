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
        audio.play();
        bgAudioRef.current = audio;
      }
      setStep(1);
    } else {
      alert("Wrong Password 💔");
    }
  };

  return (
    <div style={styles.container}>
      {/* ================= HERO LOGIN ================= */}
      {step === 0 && (
        <div style={styles.heroSection}>
          <div style={styles.leftSection} className="fadeLeft">
            <div style={styles.imageWrapper} className="floatImage">
              <img
                src="/image/first image.jpeg"
                alt="couple"
                style={styles.heroImage}
              />
            </div>
          </div>

          <div style={styles.rightSection} className="fadeRight">
            <h1 style={styles.mainTitle} className="fadeUp delay1">
              A Journey Written in Love
            </h1>

            <p style={styles.quote} className="typewriter">
              “Every love story is beautiful, but ours is my favorite.”
            </p>

            <input
              type="password"
              placeholder="Enter the secret"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={styles.underlineInput}
              className="inputFocus"
            />

            <button
              style={styles.heroButton}
              onClick={handleLogin}
              className="buttonHover"
            >
              See Our Journey 💗
            </button>
          </div>

          <div style={styles.blur1}></div>
          <div style={styles.blur2}></div>
        </div>
      )}

      {/* ================= GIFT PAGE ================= */}
      {step === 1 && (
        <div style={styles.spiderPage}>
          <img
            src="/image/2nd.png"
            alt=""
            style={{ ...styles.sticker, top: "90px", left: "9px", width: "180px" }}
            className="fadeIn"
          />

          <img
            src="/image/1st-removebg-preview.png"
            alt=""
            style={{ ...styles.sticker, bottom: "300px", right: "120px", width: "360px" }}
            className="spiderSwing"
          />

          <div style={styles.rightText} className={animateGift ? "textExit" : ""}>
            <div style={styles.valentine}>HAPPY VALENTINE'S DAY</div>
            <div style={styles.dear}>MY DEAR</div>
            <div style={styles.spiderman}>SPIDER MAN</div>
          </div>

          <div style={styles.bigGiftWrapper} className={animateGift ? "giftCenter" : ""}>
            <img
              src="/image/unnamed-removebg-preview.png"
              alt="Gift"
              style={styles.bigGiftImage}
              onClick={handleGiftClick}
              className={`${!animateGift ? "bigGiftBounce" : ""} ${openGift ? "giftOpen" : ""}`}
            />
            <p style={styles.clickText}>Click the Gift</p>
          </div>
        </div>
      )}

      {/* ================= VIDEO ================= */}
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

      {/* ================= RESPONSIVE CSS ================= */}
      <style>{`
        body { margin:0; }

        @media (max-width: 768px) {
          .fadeLeft, .fadeRight {
            width:100%;
            text-align:center;
            align-items:center;
          }

          .bigGiftWrapper {
            left:50% !important;
            top:65% !important;
            transform:translate(-50%, -50%) !important;
          }

          .rightText {
            top:20% !important;
            left:50% !important;
            right:auto !important;
            transform:translateX(-50%) !important;
            text-align:center !important;
          }

          .bigGiftImage { width:60vw !important; max-width:260px !important; }

          .valentine { font-size:22px !important; }
          .dear { font-size:18px !important; }
          .spiderman { font-size:28px !important; }

          .sticker { width:40% !important; }
        }

        /* animations kept same */
        .bigGiftBounce { animation: giftJump 1.5s infinite; }
        @keyframes giftJump { 0%,100%{transform:translateY(0)}50%{transform:translateY(-25px)} }

        .giftOpen { animation: openBox 1s forwards; }
        @keyframes openBox {0%{transform:scale(1)}50%{transform:scale(1.3) rotate(15deg)}100%{transform:scale(0);opacity:0}}

        .spiderSwing { transform-origin:top; animation:swing 3s infinite; }
        @keyframes swing {0%{transform:rotate(-10deg)}50%{transform:rotate(10deg)}100%{transform:rotate(-10deg)}}

        .fadeIn { animation:fadeIn 2s forwards; }
        @keyframes fadeIn {from{opacity:0}to{opacity:1}}

        .textExit { animation:slideOutRight 1.5s forwards; }
        @keyframes slideOutRight {from{opacity:1;transform:translateY(-50%) translateX(0)}to{opacity:0;transform:translateY(-50%) translateX(400px)}}

        .giftCenter { left:50% !important; transform:translate(-50%,-50%) !important; }
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
    gap: "40px",
    padding: "40px 20px",
    background: "linear-gradient(135deg,#2b0a3d,#9c2f6f)",
    color: "white",
    position: "relative",
  },

  leftSection: { display: "flex", justifyContent: "center" },

  heroImage: { width: "100%", maxWidth: "320px", borderRadius: "20px" },

  rightSection: { maxWidth: "500px", display: "flex", flexDirection: "column", gap: "25px" },

  mainTitle: { fontSize: "48px", fontWeight: 700 },

  underlineInput: {
    background: "transparent",
    border: "none",
    borderBottom: "2px solid rgba(255,255,255,0.6)",
    padding: "12px 5px",
    color: "white",
    fontSize: "18px",
    outline: "none",
  },

  heroButton: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "30px",
    border: "none",
    background: "#ff4f81",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  blur1: { position: "absolute", width: "200px", height: "200px", background: "rgba(255,120,180,0.4)", borderRadius: "50%", filter: "blur(100px)", bottom: "50px", left: "50px" },
  blur2: { position: "absolute", width: "250px", height: "250px", background: "rgba(255,255,255,0.2)", borderRadius: "50%", filter: "blur(120px)", top: "50px", right: "80px" },

  spiderPage: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    backgroundImage: "url('/image/Gemini_Generated_Image_9hn9g79hn9g79hn9.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
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

  bigGiftImage: { width: "35vw", maxWidth: "450px", minWidth: "200px", cursor: "pointer" },

  clickText: { marginTop: "20px", fontSize: "20px", color: "white", textShadow: "0 0 10px black" },

  rightText: { position: "absolute", right: "10%", top: "50%", transform: "translateY(-50%)", textAlign: "right" },

  valentine: { fontSize: "34px", fontWeight: 600 },
  dear: { fontSize: "28px", fontStyle: "italic" },
  spiderman: { fontSize: "48px", fontWeight: 900 },

  sticker: { position: "absolute", zIndex: 1, pointerEvents: "none" },

  videoWrapper: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "black" },
  video: { width: "100%", maxWidth: "700px" },
};
