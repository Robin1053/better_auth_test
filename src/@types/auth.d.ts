type Provider = "passkey" | "google" | "github";

type SigninProps = {
    onForgotPassword?: () => void;
};

export { Provider, SigninProps }