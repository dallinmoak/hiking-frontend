import {
  AuthView,
  SignedIn,
  SignedOut,
} from "@neondatabase/neon-js/auth/react";

export default function Login() {
  return (
    <>
      <SignedIn>
        <p>signed in</p>
      </SignedIn>
      <SignedOut>
        <AuthView pathname="login" />
      </SignedOut>
    </>
  );
}
