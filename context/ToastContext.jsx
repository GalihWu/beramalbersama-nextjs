"use client";

import Toastr from "@/components/ui/toastr";
import React, { createContext, useContext, useState, useCallback } from "react";

// Create a context
const ToastContext = createContext();

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: "",
    type: "info",
    isVisible: false,
  });

  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type, isVisible: true });

    // Auto-hide the toast after 3 seconds
    setTimeout(() => {
      setToast({ message: "", type: "info", isVisible: false });
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast.isVisible && (
        <Toastr
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", isVisible: false })}
        />
      )}
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  return useContext(ToastContext);
};
