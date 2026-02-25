import { AccountView, SignedIn } from "@neondatabase/neon-js/auth/react";

export default function AccountSettings() {
  return (
    <>
      <SignedIn>
        <AccountView pathname="/settings" />
      </SignedIn>
    </>
  );
}
