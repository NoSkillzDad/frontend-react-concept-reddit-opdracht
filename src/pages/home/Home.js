import React, {useEffect, useState} from 'react';
import axios from "axios";
import { NavLink} from "react-router-dom";
import formatNumber from "../../helpers/formatNumber";
import formatTitle from "../../helpers/formatTitle";
import './Home.css';
import Loading from "../../components/elements/Loading";

const Home = () => {

    const [hotPosts, setHotPosts] = useState([]);
    const [initialState, setInitialState] = useState([]);
    const [loading, toggleLoading] = useState(true);

    const [title, setTitle] = useState();

    const getPosts = async () => {
        axios.get('https://www.reddit.com/hot.json?limit=15')
            .then(function (response) {
                const getDetails = (posts) => {
                    setHotPosts(initialState);
                    posts.forEach(post => {
                        setHotPosts(detailsAdded => [...detailsAdded, post.data]);
                    });
                }
                getDetails(response.data.data.children);
                toggleLoading(false);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        // .then(function () {
        //     // always executed
        // });
    }

    useEffect(() => {
        getPosts();
    }, []);

    const renderArticles = (articles) => {
        // console.log(articles)
        return articles.map((article, index) => (
            <div key={index} className={"article"}>
                <div className={"article-title"}>
                    <a href={`https://www.reddit.com${article.permalink}`}>
                        <h4>{formatTitle(article.title, 100)}</h4>
                    </a>
                </div>
                <div className={"article-stats"}>
                    <NavLink to={`/subreddit/${article.subreddit}`}>{article.subreddit_name_prefixed}</NavLink>
                    <p>Comments {formatNumber(article.num_comments)} - Ups {formatNumber(article.ups)}</p>
                </div>
            </div>
        ));

    }

    return (
        <>
            {/*{loading && <p className={"loading"}>Loading</p>}*/}
            {loading && <Loading/>}
            {hotPosts &&
                <>
                    <div className={"content-wrapper"}>
                        <div className={"section"}>
                            <div className={"section-title"}>
                                <h2>Hottest Posts</h2>
                                <h5>on Reddit right now</h5>
                            </div>
                            <div className={"section-content"}>
                                {renderArticles(hotPosts)}
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default Home;