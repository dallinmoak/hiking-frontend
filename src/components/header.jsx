import { useState } from 'react';
import './header.css';

function Header() {
    const [ isOpenE, setIsOpenE ] = useState(false);
    const [ isOpenS, setIsOpenS ] = useState(false);

    function handleClick(type) {
        if (type === 'explore') {
            setIsOpenE(!isOpenE);
            setIsOpenS(false);

        }
        else if (type ==='save') {
            setIsOpenS(!isOpenS);
            setIsOpenE(false);

        }
    }

    return <>
    <div className="nav-bar">

        <div className="nav-left">
            <img src="../public/images/logo.png" alt="hiking logo"/>
            <h1>Hiking</h1>
        </div>

        <div className="nav-right">

            <div className="nav-drop-downs">
                <div>
                    <button 
                        onClick={() => handleClick('explore')} 
                        aria-expanded={isOpenE}
                        aria-haspopup="true"
                        className="explore-btn"
                    >
                        <div className="ebtn-name">
                            Explore
                        </div>
                        <div className="down-arrow">
                            <img 
                                src="../public/images/down.png" 
                                alt="drop-down arrow"
                                className={isOpenE ? "rotate":""}
                            />
                        </div>
                    </button>

                    {/* pop-up html */}
                    {isOpenE && (
                        <>
                        <div className="ebtn-dropMenu">
                            <ul>
                                <a 
                                    href="#"
                                    className="nhLink"
                                >
                                    <img src="../public/images/trail.png" alt="trail icon" />
                                    Nearby Hikes
                                </a>
                                <a 
                                    href="#"
                                    className="cnhLink"
                                >
                                    <img src="../public/images/build.png" alt="build icon" />
                                    Create New Hike
                                </a>
                            </ul>
                        </div>
                        </>
                    )}

                </div>
                <div>
                    <button 
                        onClick={() => handleClick('save')} 
                        aria-expanded={isOpenS}
                        aria-haspopup="true"
                        className="save-btn"
                    >
                         <div className="sbtn-name">
                            Saved
                        </div>
                        <div className="down-arrow">
                            <img 
                            src="../public/images/down.png" 
                            alt="drop-down arrow"
                            className={isOpenS ? "rotate":""}
                        />
                        </div>
                    </button>

                    {/* pop-up html */}
                    {isOpenS && (
                        <>
                        <div className="sbtn-dropMenu">
                            <ul>
                                <a 
                                    href="#"
                                    className="shLink"
                                >
                                    <img src="../public/images/saved.png" alt="" />
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
        
}

export default Header 