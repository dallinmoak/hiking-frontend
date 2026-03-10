import "./Header.css";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@neondatabase/neon-js/auth/react/ui";

function Header() {
  return (
    <>
      <div className="nav-bar">
        <Link to="/" className="nav-left">
          <img src="/images/logo.png" alt="hiking logo" />
          <h1>Hiking</h1>
        </Link>

        <div className="nav-right">
          <div className="nav-items">
            <Link to="/newhike">
              <img
                src="/images/build.png"
                className="nav-icon"
                alt="build icon"
              />
              Create New Hike
            </Link>
            <Link to="/my-favorites">
              <img
                src="/images/saved.png"
                className="nav-icon"
                alt="build icon"
              />
              My Favorites
            </Link>
          </div>
          <div className="auth-container">
            <SignedIn>
              <UserButton size="icon" />
            </SignedIn>
            <SignedOut>
              <Link to="/auth/sign-in">Sign In</Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
