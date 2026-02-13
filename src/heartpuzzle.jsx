import { useState } from "react";

const imageSrc = "/puzzle.png";

export default function HeartPuzzle({ onComplete }) {
  const pieceSize = 120;

  // slots (correct order) — UNCHANGED
  const pieces = [
    { id: 0, x: 0, y: 0 },
    { id: 1, x: 120, y: 0 },
    { id: 2, x: 240, y: 0 },
    { id: 3, x: 0, y: 120 },
    { id: 4, x: 120, y: 120 },
    { id: 5, x: 240, y: 120 },
    { id: 6, x: 0, y: 240 },
    { id: 7, x: 120, y: 240 },
    { id: 8, x: 240, y: 240 },
  ];

  const [placed, setPlaced] = useState({});

  // ✅ check completion — UNCHANGED
  const isComplete = Object.keys(placed).length === pieces.length;

  // drop logic — UNCHANGED
  const handleDrop = (e, index) => {
    e.preventDefault();
    const pieceId = Number(e.dataTransfer.getData("pieceId"));
    if (pieceId !== pieces[index].id) return;
    setPlaced(prev => ({ ...prev, [index]: pieceId }));
  };

  return (
    <div style={styles.container}>
      <style>{glowAnimation}</style>

      <h2 style={styles.title}>Fix the Heart ❤️</h2>

      {/* ✅ MAIN LAYOUT */}
      <div style={styles.mainRow}>

        {/* ❤️ HEART SIDE */}
        <div
          style={{
            ...styles.heartWrapper,
            transform: isComplete ? "translateX(-160px)" : "translateX(0)",
            transition: "transform 1s ease"
          }}
        >

          {/* HEART CLIP */}
          <svg width="0" height="0">
            <defs>
              <clipPath id="heartClip" clipPathUnits="objectBoundingBox">
                <path
                  d="M0.5 0.91
                     C0.5 0.91 0.06 0.63 0.06 0.38
                     C0.06 0.22 0.19 0.09 0.34 0.09
                     C0.44 0.09 0.5 0.16 0.5 0.16
                     C0.5 0.16 0.56 0.09 0.66 0.09
                     C0.81 0.09 0.94 0.22 0.94 0.38
                     C0.94 0.63 0.5 0.91 0.5 0.91 Z"
                />
              </clipPath>
            </defs>
          </svg>

          {/* IMAGE AREA */}
          <div style={styles.imageArea}>
            {pieces.map((piece, index) => (
              <div
                key={index}
                onDragOver={e => e.preventDefault()}
                onDrop={e => handleDrop(e, index)}
                style={{
                  position: "absolute",
                  left: piece.x,
                  top: piece.y,
                  width: pieceSize,
                  height: pieceSize,
                  overflow: "hidden",
                  border: placed[index] === undefined
                    ? "2px dashed rgba(255,255,255,0.4)"
                    : "none",
                  background:
                    placed[index] === undefined
                      ? "rgba(255,255,255,0.06)"
                      : "transparent",
                  boxSizing: "border-box",
                }}
              >
                {placed[index] !== undefined && (
                  <img
                    src={imageSrc}
                    alt=""
                    draggable={false}
                    style={{
                      width: 360,
                      height: 360,
                      objectFit: "cover",
                      transform: `translate(-${piece.x}px, -${piece.y}px)`
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* SHINY OUTLINE */}
          <svg viewBox="0 0 512 512" style={styles.outline}>
            <path
              d="M256 464 
                 C256 464 32 320 32 192 
                 C32 112 96 48 176 48 
                 C224 48 256 80 256 80 
                 C256 80 288 48 336 48 
                 C416 48 480 112 480 192 
                 C480 320 256 464 256 464 Z"
              fill="none"
              stroke="#ff4d88"
              strokeWidth="18"
            />
          </svg>
        </div>

        {/* ❤️ LOVE MESSAGE SIDE */}
        {isComplete && (
          <div style={styles.loveBox}>
            <h1 style={styles.loveText}>
              You completed my heart 💖  
              <br />  
              Just like you complete me.
            </h1>

            {/* ✅ ONLY FIX: move to Magazine.jsx */}
            <button
              style={styles.nextBtn}
              onClick={onComplete}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* PUZZLE PIECES */}
      {!isComplete && (
        <div style={styles.piecesRow}>
          {pieces.map(piece =>
            Object.values(placed).includes(piece.id) ? null : (
              <div
                key={piece.id}
                draggable
                onDragStart={e =>
                  e.dataTransfer.setData("pieceId", piece.id)
                }
                style={styles.pieceBox}
              >
                <img
                  src={imageSrc}
                  alt=""
                  style={{
                    width: 360,
                    height: 360,
                    objectFit: "cover",
                    transform: `translate(-${piece.x}px, -${piece.y}px)`
                  }}
                />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #2a0033, #14001a)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  title: {
    color: "white",
    marginBottom: 30,
    fontSize: 28
  },

  mainRow: {
    display: "flex",
    alignItems: "center",
    gap: 60
  },

  heartWrapper: {
    position: "relative",
    width: 420,
    height: 420,
  },

  imageArea: {
    position: "absolute",
    width: 360,
    height: 360,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    clipPath: "url(#heartClip)",
  },

  outline: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    filter: "drop-shadow(0 0 14px #ff4d88)",
    animation: "glow 2s infinite ease-in-out"
  },

  loveBox: {
    color: "white",
    maxWidth: 320,
    animation: "fadeIn 1.2s ease"
  },

  loveText: {
    fontSize: 26,
    lineHeight: 1.4,
    marginBottom: 20
  },

  nextBtn: {
    padding: "12px 26px",
    fontSize: 18,
    borderRadius: 30,
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(45deg,#ff4d88,#ff99bb)",
    color: "#300015",
    boxShadow: "0 10px 30px rgba(255,77,136,0.5)"
  },

  piecesRow: {
    marginTop: 40,
    display: "flex",
    flexWrap: "wrap",
    gap: 15,
    maxWidth: 340,
    justifyContent: "center"
  },

  pieceBox: {
    width: 90,
    height: 90,
    borderRadius: 12,
    overflow: "hidden",
    cursor: "grab",
    background: "#000",
    boxShadow: "0 6px 18px rgba(255,77,136,0.4)"
  }
};

const glowAnimation = `
@keyframes glow {
  0% { filter: drop-shadow(0 0 6px #ff4d88); }
  50% { filter: drop-shadow(0 0 22px #ff99bb); }
  100% { filter: drop-shadow(0 0 6px #ff4d88); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
`;
