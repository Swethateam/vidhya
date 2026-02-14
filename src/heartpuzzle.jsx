import { useState, useEffect, useRef } from "react";

const imageSrc = "/puzzle.png";

export default function HeartPuzzle({ onComplete }) {
  const [placed, setPlaced] = useState({});
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [pieceSize, setPieceSize] = useState(110);
  const dropRefs = useRef([]);

  /* 📱 Responsive sizing */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) setPieceSize(90);
      else if (window.innerWidth <= 768) setPieceSize(100);
      else setPieceSize(120);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pieces = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    x: (i % 3) * pieceSize,
    y: Math.floor(i / 3) * pieceSize,
  }));

  const isComplete = Object.keys(placed).length === pieces.length;

  /* 🧠 Tap to select piece */
  const handlePieceTap = (id) => {
    setSelectedPiece(id);
  };

  /* 🧠 Tap slot to place */
  const handleSlotTap = (index) => {
    if (selectedPiece === null) return;
    if (selectedPiece !== pieces[index].id) return;

    setPlaced((prev) => ({ ...prev, [index]: selectedPiece }));
    setSelectedPiece(null);
  };

  const boardSize = pieceSize * 3;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Fix the Heart ❤️</h2>

      {/* ❤️ Heart wrapper */}
      <div
        style={{
          position: "relative",
          width: boardSize,
          height: boardSize,
          marginBottom: 20,
        }}
      >
        {/* 🧩 Puzzle Board */}
        <div
          style={{
            ...styles.board,
            width: boardSize,
            height: boardSize,
          }}
        >
          {pieces.map((piece, index) => (
            <div
              key={index}
              ref={(el) => (dropRefs.current[index] = el)}
              onClick={() => handleSlotTap(index)}
              style={{
                position: "absolute",
                left: piece.x,
                top: piece.y,
                width: pieceSize,
                height: pieceSize,
                border:
                  placed[index] === undefined
                    ? "2px dashed rgba(255,255,255,0.4)"
                    : "none",
              }}
            >
              {placed[index] !== undefined && (
                <div
                  style={{
                    width: pieceSize,
                    height: pieceSize,
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: `${boardSize}px ${boardSize}px`,
                    backgroundPosition: `-${piece.x}px -${piece.y}px`,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* ❤️ Heart Outline */}
        <svg
          viewBox="0 0 512 512"
          style={{
            position: "absolute",
            inset: 0,
            width: boardSize,
            height: boardSize,
            pointerEvents: "none",
            filter: "drop-shadow(0 0 12px #ff4d88)",
          }}
        >
          <path
            d="M256 464 C256 464 32 320 32 192 C32 112 96 48 176 48 C224 48 256 80 256 80 C256 80 288 48 336 48 C416 48 480 112 480 192 C480 320 256 464 256 464 Z"
            fill="none"
            stroke="#ff4d88"
            strokeWidth="16"
          />
        </svg>
      </div>

      {/* ❤️ Completed Message */}
      {isComplete && (
        <div style={styles.loveBox}>
          <h1 style={styles.loveText}>You completed my heart 💖</h1>
          <button style={styles.nextBtn} onClick={onComplete}>
            Next →
          </button>
        </div>
      )}

      {/* 🧩 Pieces */}
      {!isComplete && (
        <div style={styles.piecesRow}>
          {pieces.map(
            (piece) =>
              !Object.values(placed).includes(piece.id) && (
                <div
                  key={piece.id}
                  onClick={() => handlePieceTap(piece.id)}
                  style={{
                    ...styles.pieceBox,
                    width: pieceSize,
                    height: pieceSize,
                    outline:
                      selectedPiece === piece.id
                        ? "3px solid #ff4d88"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      width: pieceSize,
                      height: pieceSize,
                      backgroundImage: `url(${imageSrc})`,
                      backgroundSize: `${boardSize}px ${boardSize}px`,
                      backgroundPosition: `-${piece.x}px -${piece.y}px`,
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

const styles = {
  container: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #2a0033, #14001a)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { color: "white", marginBottom: 20 },
  board: {
    position: "relative",
  },
  piecesRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    maxWidth: 380,
  },
  pieceBox: {
    borderRadius: 12,
    overflow: "hidden",
    background: "#000",
    cursor: "pointer",
    transition: "0.2s",
  },
  loveBox: { textAlign: "center", color: "white", marginTop: 20 },
  loveText: { fontSize: 22, marginBottom: 15 },
  nextBtn: {
    padding: "10px 20px",
    borderRadius: 30,
    border: "none",
    background: "linear-gradient(45deg,#ff4d88,#ff99bb)",
    cursor: "pointer",
  },
};
