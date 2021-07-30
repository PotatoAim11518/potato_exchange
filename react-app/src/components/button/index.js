import React from "react";
import styles from "./button.module.css";

export default function Button({
  action,
  paddingY,
  paddingX,
  width,
  height,
  borderRadius,
  btnColor,
  text,
  fontColor,
  fontSize
}) {
  return (
    <div className={styles.buttonContainer}>
      <div
        className={styles.button}
        onClick={action}
        style={{
          backgroundColor: btnColor,
          "padding": paddingX + " " + paddingY,
          "width": width,
          "height": height,
          borderRadius,
        }}
        ></div>
      <div
        className={styles.buttonText}
        style={{
          "color": fontColor,
          fontSize: fontSize
        }}
        >{text}</div>
    </div>
  );
}
