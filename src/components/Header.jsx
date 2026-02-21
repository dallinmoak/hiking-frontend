import { useState, useRef, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  const [isOpenE, setIsOpenE] = useState(false);
  const [isOpenS, setIsOpenS] = useState(false);
  
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isAnyOpen = isOpenE || isOpenS;
      const isMenuOpen = menuRef.current && !menuRef.current.contains(event.target);

      if (isAnyOpen && isMenuOpen) {
        setIsOpenE(false);
        setIsOpenS(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);

  },[isOpenE, isOpenS]);


  function handleClick(type) {
    if (type === "explore") {
      setIsOpenE(!isOpenE);
      setIsOpenS(false);
    } else if (type === "save") {
      setIsOpenS(!isOpenS);
      setIsOpenE(false);
    }
  }

  return (
    <>
      <div className="nav-bar">
          <Link to="/" className="nav-left">
            <img src="/images/logo.png" alt="hiking logo" />
            <h1>Hiking</h1>
          </Link>

        <div className="nav-right">
          <div className="nav-drop-downs" ref={menuRef}>
            <div>
              <button
                onClick={() => handleClick("explore")}
                aria-expanded={isOpenE}
                aria-haspopup="true"
                className="explore-btn"
              >
                <div className="ebtn-name">Explore</div>
                <div className="down-arrow">
                  <img
                    src="/images/down.png"
                    alt="drop-down arrow"
                    className={isOpenE ? "rotate" : ""}
                  />
                </div>
              </button>

              {isOpenE && (
                <>
                  <div className="ebtn-dropMenu">
                    <ul>
                      <a href="#" className="nhLink">
                        <img src="/images/trail.png" alt="trail icon" />
                        Nearby Hikes
                      </a>
                      <Link to='/newhike' className="cnhLink">
                        <img src="/images/build.png" alt="build icon" />
                        Create New Hike
                      </Link>
                    </ul>
                  </div>
                </>
              )}
            </div>
            <div>
              <button
                onClick={() => handleClick("save")}
                aria-expanded={isOpenS}
                aria-haspopup="true"
                className="save-btn"
              >
                <div className="sbtn-name">Saved</div>
                <div className="down-arrow">
                  <img
                    src="/images/down.png"
                    alt="drop-down arrow"
                    className={isOpenS ? "rotate" : ""}
                  />
                </div>
              </button>

              {isOpenS && (
                <>
                  <div className="sbtn-dropMenu">
                    <ul>
                      <a href="#" className="shLink">
                        <img src="/images/saved.png" alt="" />
                        Saved Hikes
                      </a>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
