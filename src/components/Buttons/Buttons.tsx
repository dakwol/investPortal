import React from "react";
import "./styles.scss";

type ButtonsProps = {
  text: string;
  onClick: () => void;
  ico?: string;
  rightIco?: string;
  className?: string;
  circle?: number;
  image?: string;
  stileImage?: string;
  stileRightIco?: string;
  disabled?: boolean;
};

const Buttons: React.FC<ButtonsProps> = ({
  text,
  onClick,
  ico,
  rightIco,
  className,
  circle,
  image,
  stileImage,
  stileRightIco,
  disabled,
}) => {
  return (
    <button
      className={`button__container ${ico ? "iconContainer" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {typeof circle === "number" && (
        <div className="circleNumber">{circle}</div>
      )}

      {ico && <object type="image/svg+xml" data={ico}></object>}
      {image && <img src={image} className={stileImage}></img>}
      {text}
      {rightIco && (
        <div className={stileRightIco}>
          <object type="image/svg+xml" data={rightIco}></object>
        </div>
      )}
    </button>
  );
};

export default Buttons;
