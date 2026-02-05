"use client";

import { Button, useTheme, CircularProgress, SvgIcon } from "@mui/material";
import { JSX, useState } from "react";
import { authClient } from "@/lib/auth-client";

type ButtonProps = {
  onClick: () => Promise<void> | void;
  label: string;
  icon: JSX.Element;
  fullWidth?: boolean; // 100% Breite
  width?: string | number; // z.B. "300px" oder 250
};

function AuthButton({ onClick, label, icon, fullWidth, width }: ButtonProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const isDark = theme.palette.mode === "dark";

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={loading}
        variant="outlined"
        className="h-12 rounded-xl font-medium flex items-center justify-center gap-3"
        sx={{
          width: fullWidth ? "100%" : width ? width : "auto",
          backgroundColor: isDark ? "#131314" : "#fff",
          color: isDark ? "#E3E3E3" : "#3c4043",
          borderColor: isDark ? "#3c4043" : "#dadce0",
          textTransform: "none",
          fontSize: "16px",
          "&:hover": {
            backgroundColor: isDark ? "#2a2a2a" : "#f7f7f7",
            borderColor: isDark ? "#5f6368" : "#c6c6c6",
          },
        }}
        startIcon={!loading ? icon : undefined}
      >
        {loading ? <CircularProgress size={22} /> : label}
      </Button>
    </>
  );
}

// -----------------------------
// ICONS
// -----------------------------
const GoogleIcon = (
  <SvgIcon>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  </SvgIcon>
);

const PasskeyIcon = (
  <span className="material-symbols-outlined">
    passkey
  </span>
);

const GitHubIcon = (
  <SvgIcon>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
      <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.262.82-.582 0-.288-.012-1.244-.017-2.258-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.332-5.467-5.931 0-1.31.467-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.48 11.48 0 013.003-.403 11.48 11.48 0 013.003.403c2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.624-5.48 5.921.429.37.81 1.096.81 2.21 0 1.595-.014 2.882-.014 3.272 0 .322.216.697.825.578C20.565 21.796 24 17.298 24 12c0-6.63-5.373-12-12-12z" />
    </svg>
  </SvgIcon>
);

// -----------------------------
// EXPORTIERTE BUTTONS
// -----------------------------
export function GoogleButton(props: { fullWidth?: boolean; width?: string | number }) {
  return <AuthButton label="Mit Google anmelden" icon={GoogleIcon} onClick={async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" });
  }} {...props} />;
}

export function PasskeyButton(props: { fullWidth?: boolean; width?: string | number }) {
  return <AuthButton label="Mit Passkey anmelden" icon={PasskeyIcon} onClick={async () => {
    await authClient.signIn.passkey({
      autoFill: false,
      fetchOptions: {
        onSuccess() { window.location.href = "/dashboard"; },
        onError(context) { console.error(context.error); }
      }
    });
  }} {...props} />;
}

export function GitHubButton(props: { fullWidth?: boolean; width?: string | number }) {
  return <AuthButton label="Mit GitHub anmelden" icon={GitHubIcon} onClick={async () => {
    await authClient.signIn.social({ provider: "github", callbackURL: "/dashboard" });
  }} {...props} />;
}