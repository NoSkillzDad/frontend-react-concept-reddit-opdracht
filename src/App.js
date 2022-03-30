import React, {useEffect} from 'react';
import './App.css';
import {Routes, Route, NavLink, useLocation} from "react-router-dom";
import Home from "./pages/home/Home";
import Post from "./pages/post/Post";
import logo from './assets/logo.png';
import Reddit from "./pages/reddit/Reddit";
import Memes from "./pages/memes/Memes";
import Subreddit from "./pages/subreddit/Subreddit";

function App() {

    let location = useLocation();

    const renderTitle = () => {
        switch (location.pathname) {
            case "/": {
                return (<>
                    <div className={"logo"}>
                        <img src={logo} alt={"reddit logo"}/>
                        <h1 className={"main-title"}>Reddit</h1>
                    </div>
                </>)
            }
            case "/memes": {
                return (<>
                    <div className={"logo"}>
                        <h1>r/Memes</h1>
                        <h5>new memes in this sub</h5>
                    </div>
                </>)
            }
            case "/reddit": {
                return (<>
                    <div className={"logo"}>
                        <img src={logo} alt={"reddit logo"}/>
                        <h1 className={"main-title"}>You have been redditfied!</h1>
                    </div>
                </>)
            }
            default: {
                return (
                <div className={"logo"}>
                    <h1>r/{location.pathname.substring(11)}</h1>
                    <h5>subreddit specifications</h5>
                </div>)
            }
        }



        // if (location.pathname === "/")
        //     return (<>
        //         <div className={"logo"}>
        //             <img src={logo} alt={"reddit logo"}/>
        //             <h1 className={"main-title"}>Reddit</h1>
        //         </div>
        //     </>)
        //
        // else return (<>
        //         <div className={"logo"}>
        //             <h1>r/{location.pathname.substring(11)}</h1>
        //             <h5>subreddit specifications</h5>
        //         </div>
        //
        //     </>
        // )
    }

    useEffect(() => {
    }, [location]);

    return (
        <div className={"app-wrapper"}>
            <div className={"header-wrapper"}>
                <div className={"nav-wrapper"}>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to={"/"} id={"nav-reddit"}>HOTTEST POSTS</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/reddit"} id={"nav-reddit"}>REDDIT</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/memes"} id={"nav-reddit"}>MEMES</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={"title-wrapper"}>
                    <div className={"inner-title"}>
                        {renderTitle()}
                    </div>
                </div>
            </div>

            <div className={"body-wrapper"}>
                <div className={"main-wrapper"}>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/reddit"} element={<Reddit/>}/>
                        <Route path={"/memes"} element={<Memes/>}/>
                        <Route path={"/subreddit/:sub"} element={<Subreddit/>}/>
                        <Route path={"/subreddit/:sub/:post"} element={<Post/>}/>
                    </Routes>
                </div>

                <div className={"footer-wrapper"}>
                    <div className={"footer"}>
                        <p>frontend-react-reddit-assignment</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
