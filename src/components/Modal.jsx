import React from "react";

const Modal = ({
  isVisible,
  content,
  onClose,
  onMouseEnter,
  onMouseLeave,
  position,
}) => {
  if (!isVisible) return null;

  const modalStyles = {
    position: "absolute",
    top: position.top,
    left: position.left,
    right: position.right,
    transform: "translate(-50%, -50%)",
    background: "white",
    borderRadius: "50%",
    width: "150px",
    height: "150px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    zIndex: 50,
  };

  const arrowStyles = {
    position: "absolute",
    width: "0",
    height: "0",
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
  };

  if (position.left) {
    arrowStyles.right = "-10px";
    arrowStyles.borderTop = "10px solid white";
  } else if (position.right) {
    arrowStyles.left = "-10px";
    arrowStyles.borderTop = "10px solid white";
  }

  return (
    <div
      style={{ ...modalStyles, ...position }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div style={arrowStyles}></div>
      {content}
      <button onClick={onClose} className="absolute top-2 right-2 text-red-500">
        Close
      </button>
    </div>
  );
};

export default Modal;
