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
const handleGiftClick = () => {
  setAnimateGift(true);

  setTimeout(() => {
    setOpenGift(true);
  }, 1500);

  setTimeout(() => {
    setStep(2);
  }, 3000);



};


  // ✅ Updated password
  const correctPassword = "vidhya";

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
        onKeyDown={(e) => {
          if (e.key === "Enter") handleLogin();
        }}
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

{step === 2 && (
  <div style={styles.fullscreenVideo}>
    <video
      ref={videoRef}
      src="/video/vidhya.mp4"
      autoPlay
      controls
      style={styles.video}

      // 🔴 STOP BACKGROUND MUSIC WHEN VIDEO PLAYS
      onPlay={() => bgAudioRef.current?.pause()}

      // 🟢 RESUME AFTER VIDEO ENDS
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
        body { margin: 0; }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .bounce {
          animation: bounce 1s infinite;
        }

        @keyframes glow {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
          /* Fade Animations */
.fadeLeft {
  animation: fadeLeft 1.2s ease forwards;
}

.fadeRight {
  animation: fadeRight 1.2s ease forwards;
}

.fadeUp {
  opacity: 0;
  animation: fadeUp 1s ease forwards;
}

.delay1 {
  animation-delay: 0.4s;
}

@keyframes fadeLeft {
  from { opacity: 0; transform: translateX(-60px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeRight {
  from { opacity: 0; transform: translateX(60px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Floating Image */
.floatImage {
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

/* Typewriter Quote */
.typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid white;
  width: 0;
  animation: typing 3s steps(40,end) forwards, blink 0.8s infinite;
}

@keyframes typing {
  to { width: 100%; }
}

@keyframes blink {
  50% { border-color: transparent; }
}

/* Input Focus */
.inputFocus:focus {
  border-bottom: 2px solid #ff4f81 !important;
  box-shadow: 0 10px 20px rgba(255, 79, 129, 0.4);
}

/* Button Hover */
.buttonHover:hover {
  transform: scale(1.05);
  transition: 0.3s;
}
  /* Big Gift Bounce */
.bigGiftBounce {
  animation: giftJump 1.5s infinite;
}

@keyframes giftJump {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-25px); }
}

/* Spider Swing */
.spiderSwing {
  transform-origin: top;
  animation: swing 3s ease-in-out infinite;
}

@keyframes swing {
  0% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
  100% { transform: rotate(-10deg); }
}

/* Fade In Stickers */
.fadeIn {
  animation: fadeIn 2s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
  .textExit {
  animation: slideOutRight 1.5s forwards;
}

/* Move gift to center */
.giftCenter {
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}

/* Text slide out */
.textExit {
  animation: slideOutRight 1.5s forwards;
}

@keyframes slideOutRight {
  from {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
  to {
    opacity: 0;
    transform: translateY(-50%) translateX(400px);
  }
}

/* Gift open animation */
.giftOpen {
  animation: openBox 1s forwards;
}

@keyframes openBox {
  0% { transform: scale(1); }
  50% { transform: scale(1.3) rotate(15deg); }
  100% { transform: scale(0); opacity: 0; }
}




      `}</style>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    fontFamily: "sans-serif",
  },

  heroSection: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    background: "linear-gradient(135deg, #2b0a3d, #9c2f6f)",
    color: "white",
    position: "relative",
    overflow: "hidden",
  },

  leftSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
  },

  imageWrapper: {
    padding: "10px",
    borderRadius: "25px",
    boxShadow: "0 0 40px rgba(255, 120, 180, 0.6)",
  },

  heroImage: {
    width: "320px",
    height: "420px",
    objectFit: "cover",
    borderRadius: "20px",
  },

  rightSection: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    maxWidth: "500px",
  },

  welcome: {
    fontSize: "22px",
    fontWeight: "400",
    opacity: 0.9,
  },

  mainTitle: {
    fontSize: "48px",
    fontWeight: "700",
  },

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
    boxShadow: "0 10px 25px rgba(255, 79, 129, 0.5)",
  },

  blur1: {
    position: "absolute",
    width: "200px",
    height: "200px",
    background: "rgba(255,120,180,0.4)",
    borderRadius: "50%",
    filter: "blur(100px)",
    bottom: "50px",
    left: "50px",
  },

  blur2: {
    position: "absolute",
    width: "250px",
    height: "250px",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "50%",
    filter: "blur(120px)",
    top: "50px",
    right: "80px",
  },

  centerBox: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    color: "white",
  },

  gift: {
    fontSize: "80px",
    cursor: "pointer",
  },


fullscreenVideo: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
},

video: {
  width: "100%",
  height: "100%",
  objectFit: "cover",   // makes it fill entire screen
},


  magazine: {
    height: "100%",
    background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    color: "white",
  },

  carousel: {
    height: "100%",
    background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    color: "white",
  },

  image: {
    width: "400px",
    borderRadius: "15px",
  },

  lock: {
    fontSize: "80px",
  },

  button: {
    padding: "10px 20px",
    borderRadius: "20px",
    border: "none",
    background: "white",
    color: "#ff4f81",
    fontWeight: "bold",
    cursor: "pointer",
  },

  letter: {
    height: "100%",
    background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    color: "#ff4f81",
  },
 spiderPage: {
  width: "100vw",
  height: "100vh",
  position: "relative",
  backgroundImage: "url('/image/Gemini_Generated_Image_9hn9g79hn9g79hn9.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  paddingLeft: "120px",
  overflow: "hidden",
},

leftSide: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
},
bigGiftWrapper: {
  position: "absolute",
  left: "150px",
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 2,
  transition: "all 1.5s ease",
},
rightText: {
  position: "absolute",
  right: "500px",
  top: "50%",
  transform: "translateY(-50%)",
  textAlign: "right",
},

valentine: {
  fontSize: "34px",
  fontWeight: "600",
  letterSpacing: "4px",
  color: "black",
  fontFamily: "'Playfair Display', serif",
  marginBottom: "20px",
},

dear: {
  fontSize: "28px",
  fontWeight: "400",
  letterSpacing: "6px",
  color: "black",
  marginBottom: "20px",
  fontStyle: "italic",
},

spiderman: {
  fontSize: "48px",
  fontWeight: "900",
  letterSpacing: "8px",
  color: "black",
  textTransform: "uppercase",
  textShadow: "2px 2px 10px rgba(255,255,255,0.5)",
},
bigGiftImage: {
  width: "450px",
  cursor: "pointer",
  transition: "all 1.5s ease",
},
clickText: {
  marginTop: "20px",
  fontSize: "20px",
  color: "white",
  textShadow: "0 0 10px black",
},

sticker: {
  position: "absolute",
  zIndex: 1,
  pointerEvents: "none",
},


rightSide: {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
},

spiderGift: {
  fontSize: "90px",
  cursor: "pointer",
},

spiderImage: {
  width: "250px",
},


};
