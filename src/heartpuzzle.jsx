import { useState, useEffect, useRef } from "react";

const imageSrc = "/puzzle.png";

export default function HeartPuzzle({ onComplete }) {
  const pieceSizeDesktop = 120;
  const containerSizeDesktop = 420;

  const [placed, setPlaced] = useState({});
  const [pieceSize, setPieceSize] = useState(pieceSizeDesktop);
  const [containerSize, setContainerSize] = useState(containerSizeDesktop);
  const [draggingPiece, setDraggingPiece] = useState(null);

  const dropRefs = useRef([]);

  // 📱 Responsive sizing
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

  // 📱 Touch end
  const handleTouchEnd = (e) => {
    if (draggingPiece === null) return;

    const touch = e.changedTouches[0];
    const { clientX, clientY } = touch;

    dropRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();

      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (inside && draggingPiece === pieces[index].id) {
        setPlaced((prev) => ({ ...prev, [index]: draggingPiece }));
      }
    });

    setDraggingPiece(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Fix the Heart ❤️</h2>

      <div style={{ ...styles.mainRow, gap: pieceSize / 3 }}>
        {/* ❤️ Heart board */}
        <div
          style={{
            ...styles.heartWrapper,
            width: containerSize,
            height: containerSize,
          }}
        >
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
                ref={(el) => (dropRefs.current[index] = el)}
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
                  <div
                    style={{
                      width: pieceSize,
                      height: pieceSize,
                      backgroundImage: `url(${imageSrc})`,
                      backgroundSize: `${pieceSize * 3}px ${pieceSize * 3}px`,
                      backgroundPosition: `-${piece.x}px -${piece.y}px`,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
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
                  onTouchEnd={handleTouchEnd}
                  style={{
                    ...styles.pieceBox,
                    width: pieceSize,
                    height: pieceSize,
                  }}
                >
                  <div
                    style={{
                      width: pieceSize,
                      height: pieceSize,
                      backgroundImage: `url(${imageSrc})`,
                      backgroundSize: `${pieceSize * 3}px ${pieceSize * 3}px`,
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
  title: { color: "white", marginBottom: 20, fontSize: 24 },
  mainRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  heartWrapper: { position: "relative" },
  imageArea: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  loveBox: {
    color: "white",
    maxWidth: 320,
    textAlign: "center",
    marginTop: 20,
  },
  loveText: { fontSize: 22, marginBottom: 20 },
  nextBtn: {
    padding: "10px 20px",
    borderRadius: 30,
    border: "none",
    background: "linear-gradient(45deg,#ff4d88,#ff99bb)",
    cursor: "pointer",
  },
  piecesRow: {
    marginTop: 30,
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
  },
  pieceBox: {
    borderRadius: 12,
    overflow: "hidden",
    background: "#000",
    cursor: "grab",
  },
};
