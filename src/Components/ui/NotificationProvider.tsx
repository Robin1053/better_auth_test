// NotificationProvider.tsx
"use client";

import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastMessage {
  message: string;
  type: ToastType;
}

interface NotificationContextValue {
  notify: (toast: ToastMessage) => void;
}

const NotificationContext = createContext<NotificationContextValue>({
  notify: () => {}
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage>({
    message: "",
    type: "info"
  });

  const notify = ({ message, type }: ToastMessage) => {
    setToast({ message, type });
    setOpen(true);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={toast.type}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};
