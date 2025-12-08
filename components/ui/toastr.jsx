"use client";

import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "./button";

export default function Toastr({
  type = "default",
  message,
  onClose,
  duration = 3000,
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  // Default styles
  let textStyle = "text-dark";
  let bgStyle = "bg-light";
  let textColor = "black";

  // Conditionally set styles based on type
  if (type === "success") {
    textStyle = "text-white";
    bgStyle = "bg-success";
    textColor = "white";
  } else if (type === "error") {
    textStyle = "text-white";
    bgStyle = "bg-danger";
    textColor = "white";
  }
  return (
    <div
      className={`toast ${bgStyle} ${textStyle} fade show position-fixed bottom-0 end-0 m-3`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      id="copyToastLink"
      style={{ height: "fit-content", top: "80px" }}
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <Button
          type="button"
          className="btn-close me-2 m-auto"
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
        >
          <FaTimes color={textColor} />
        </Button>
      </div>
    </div>
  );
}
