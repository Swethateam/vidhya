import { useState, useEffect } from "react";

const imageSrc = "/puzzle.png";

export default function HeartPuzzle({ onComplete }) {
  const pieceSizeDesktop = 120;
  const containerSizeDesktop = 420;

  const [placed, setPlaced] = useState({});
  const [pieceSize, setPieceSize] = useState(pieceSizeDesktop);
  const [containerSize, setContainerSize] = useState(containerSizeDesktop);

  const [draggingPiece, setDraggingPiece] = useState(null);

  // 📱 Responsive sizes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setPieceSize(70);
        setContainerSize(250);
      } else if (width <= 768) {
        setPieceSize(90);
        setContainerSize(320);
      } else {
        setPieceSize(pieceSizeDesktop);
        setContainerSize(containerSizeDesktop);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pieces = [
    { id: 0, x: 0, y: 0 },
    { id: 1, x: pieceSize, y: 0 },
    { id: 2, x: 2 * pieceSize, y: 0 },
    { id: 3, x: 0, y: pieceSize },
    { id: 4, x: pieceSize, y: pieceSize },
    { id: 5, x: 2 * pieceSize, y: pieceSize },
    { id: 6, x: 0, y: 2 * pieceSize },
    { id: 7, x: pieceSize, y: 2 * pieceSize },
    { id: 8, x: 2 * pieceSize, y: 2 * pieceSize },
  ];

  const isComplete = Object.keys(placed).length === pieces.length;

  // 🖱 Desktop drop
  const handleDrop = (e, index) => {
    e.preventDefault();
    const pieceId = Number(e.dataTransfer.getData("pieceId"));
    if (pieceId !== pieces[index].id) return;
    setPlaced((prev) => ({ ...prev, [index]: pieceId }));
  };

  // 📱 Touch start
  const handleTouchStart = (pieceId) => {
    setDraggingPiece(pieceId);
  };

  // 📱 Touch move → detect drop zone
  const handleTouchMove = (e) => {
    if (draggingPiece === null) return;

    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (!element) return;

    const dropIndex = element.getAttribute("data-index");
    if (dropIndex !== null) {
      const index = Number(dropIndex);
      if (draggingPiece === pieces[index].id) {
        setPlaced((prev) => ({ ...prev, [index]: draggingPiece }));
        setDraggingPiece(null);
      }
    }
  };

  return (
    <div style={styles.container} onTouchMove={handleTouchMove}>
      <style>{glowAnimation}</style>

      <h2 style={styles.title}>Fix the Heart ❤️</h2>

      <div style={{ ...styles.mainRow, gap: pieceSize / 3 }}>
        {/* ❤️ Heart */}
        <div
          style={{
            ...styles.heartWrapper,
            width: containerSize,
            height: containerSize,
          }}
        >
          <svg width="0" height="0">
            <defs>
              <clipPath id="heartClip" clipPathUnits="objectBoundingBox">
                <path d="M0.5 0.91 C0.5 0.91 0.06 0.63 0.06 0.38 C0.06 0.22 0.19 0.09 0.34 0.09 C0.44 0.09 0.5 0.16 0.5 0.16 C0.5 0.16 0.56 0.09 0.66 0.09 C0.81 0.09 0.94 0.22 0.94 0.38 C0.94 0.63 0.5 0.91 0.5 0.91 Z"/>
              </clipPath>
            </defs>
          </svg>

          <div
            style={{
              ...styles.imageArea,
              width: pieceSize * 3,
              height: pieceSize * 3,
            }}
          >
            {pieces.map((piece, index) => (
              <div
                key={index}
                data-index={index}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, index)}
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
                  <img
                    src={imageSrc}
                    alt=""
                    draggable={false}
                    style={{
                      width: pieceSize * 3,
                      height: pieceSize * 3,
                      transform: `translate(-${piece.x}px, -${piece.y}px)`,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <svg
            viewBox="0 0 512 512"
            style={{ ...styles.outline, width: containerSize, height: containerSize }}
          >
            <path
              d="M256 464 C256 464 32 320 32 192 C32 112 96 48 176 48 C224 48 256 80 256 80 C256 80 288 48 336 48 C416 48 480 112 480 192 C480 320 256 464 256 464 Z"
              fill="none"
              stroke="#ff4d88"
              strokeWidth="18"
            />
          </svg>
        </div>

        {/* 💌 Completion */}
        {isComplete && (
          <div style={styles.loveBox}>
            <h1 style={styles.loveText}>
              You completed my heart 💖
              <br />
              Just like you complete me.
            </h1>
            <button style={styles.nextBtn} onClick={onComplete}>
              Next →
            </button>
          </div>
        )}
      </div>

      {/* 🧩 Pieces */}
      {!isComplete && (
        <div style={{ ...styles.piecesRow, maxWidth: pieceSize * 3 }}>
          {pieces.map(
            (piece) =>
              !Object.values(placed).includes(piece.id) && (
                <div
                  key={piece.id}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("pieceId", piece.id)
                  }
                  onTouchStart={() => handleTouchStart(piece.id)}
                  style={{ ...styles.pieceBox, width: pieceSize, height: pieceSize }}
                >
                  <img
                    src={imageSrc}
                    alt=""
                    style={{
                      width: pieceSize * 3,
                      height: pieceSize * 3,
                      transform: `translate(-${piece.x}px, -${piece.y}px)`,
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
  title: { color: "white", marginBottom: 20, fontSize: 24 },
  mainRow: { display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center" },
  heartWrapper: { position: "relative" },
  imageArea: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", clipPath: "url(#heartClip)" },
  outline: { position: "absolute", inset: 0, pointerEvents: "none", filter: "drop-shadow(0 0 14px #ff4d88)" },
  loveBox: { color: "white", maxWidth: 320, textAlign: "center", marginTop: 20 },
  loveText: { fontSize: 22, marginBottom: 20 },
  nextBtn: { padding: "10px 20px", borderRadius: 30, border: "none", background: "linear-gradient(45deg,#ff4d88,#ff99bb)" },
  piecesRow: { marginTop: 30, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" },
  pieceBox: { borderRadius: 12, overflow: "hidden", background: "#000", cursor: "grab" },
};

const glowAnimation = `
@keyframes glow {
  0% { filter: drop-shadow(0 0 6px #ff4d88); }
  50% { filter: drop-shadow(0 0 22px #ff99bb); }
  100% { filter: drop-shadow(0 0 6px #ff4d88); }
}
`;
