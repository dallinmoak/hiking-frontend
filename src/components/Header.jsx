import "./Header.css";
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@neondatabase/neon-js/auth/react/ui";
import { useState, useEffect } from "react";

function Header() {
  const [windowConfig, setWindowConfig] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowConfig(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowConfig]);

  const BrandContent = () => {
    return (
      <Link to="/" className="brand">
        <img src="/images/logo.png" alt="hiking logo" />
        <h1>Hiking</h1>
      </Link>
    );
  };

  const AuthContent = ({ size }) => {
    return (
      <div className="auth-container">
        <SignedIn>
          <UserButton size={size} variant="outline" />
        </SignedIn>
        <SignedOut>
          <Link to="/auth/sign-in">
            <Button>Sign In</Button>
          </Link>
        </SignedOut>
      </div>
    );
  };

  const NavItem = ({ to, imgSrc, text }) => {
    return (
      <SignedIn>
        <Link to={to}>
          <img src={imgSrc} className="nav-icon" alt={text + " icon"} />
          {text}
        </Link>
      </SignedIn>
    );
  };

  const NavList = () => {
    return (
      <div className="nav-items">
        <NavItem
          to="/newhike"
          imgSrc="/images/build.png"
          text="Create New Hike"
        />
        <NavItem
          to="/my-favorites"
          imgSrc="/images/saved.png"
          text="My Favorites"
        />
        {/* <NavItem to="#"
          imgSrc="/images/trail.png"
          text="Nearby Hikes"
        /> */}
      </div>
    );
  };

  const breakpoint = 790;
  const breakpoint2 = 500;

  return (
    <div className="cpt-header">
      <div className="nav-bar">
        <div className="nav-main">
          <BrandContent />
          {windowConfig > breakpoint && <NavList />}
          <AuthContent size={
            windowConfig > breakpoint2 ? "lg" : "sm"
          } />
        </div>
        {windowConfig <= breakpoint && <NavList />}
      </div>
    </div>
  );
}

export default Header;
