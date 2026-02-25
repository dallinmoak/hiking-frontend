import { SignedIn, AccountView } from "@neondatabase/neon-js/auth/react";

export default function AccountSecurity() {
  return (
    <>
      <SignedIn>
        <AccountView pathname="/security" />
      </SignedIn>
    </>
  );
}
