import React, {useEffect, useState} from 'react';
import Loading from "../../components/elements/Loading";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
import './Memes.css';
import meme404 from '../../assets/404-Not-Found.webp';

const Memes = () => {

    // const [memes, setMemes] = useState([]);
    const [memes, setMemes] = useState();
    const [after, setAfter] = useState();
    const [page, setPage] = useState(25);
    const [hasMore, toggleHasMore] = useState(true);
    const [loading, toggleLoading] = useState(true);

    const getMemes = async () => {
        try {
            let response;
            if (page > 25) {
                // console.log("page 1");
                response = await axios.get(`https://www.reddit.com/r/memes/new.json?limit=${page}`);
            } else {
                // console.log(`page ${page} after ${after}`);
                response = await axios.get(`https://www.reddit.com/r/memes/new.json?limit=15?after=${after}?count=${page}`);
            }
            setMemes(response.data.data.children);
            setAfter(response.data.data.after);
            setPage(prevPage => prevPage + 25);
            // console.log(after.toString().length);
            (after.toString().length > 0) ? toggleHasMore(true) : toggleHasMore(false);
            // console.log(hasMore.toString());
            toggleLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    const getMoreMemes = () => {
        getMemes();
    }

    useEffect(() => {
        getMemes();
    }, []);

    const renderMemes = (zeMemes) => {
        return zeMemes.map(leMeme => (
            <div key={leMeme.data.name} className={"single-meme"}>
                {/*<h3>{leMeme.data.name}</h3>*/}
                <img
                    src={leMeme.data.url_overridden_by_dest}
                    alt={"meme"}
                    onError={({currentTarget}) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = meme404;
                    }}
                />
            </div>
        ));
    }

    return (
        <>
            {memes &&
                <InfiniteScroll
                    dataLength={memes.length} //This is important field to render the next data
                    next={getMoreMemes}
                    hasMore={hasMore}
                    // loader={<Loading/>}
                    loader={<p>loading</p>}
                    endMessage={
                        <p style={{textAlign: 'center'}}>
                            <b>You meme-devouring you! You have seen all new memes in this sub!</b>
                        </p>
                    }>
                    <div className={"content-wrapper"}>
                        <div className={"section"}>
                            <div className={"section-title"}>
                                <h2>Newest Memes</h2>
                                <h5>on r/Memes right now</h5>
                            </div>
                            <div className={"section-content"}>
                                <div className={"memes"}>
                                    {renderMemes(memes)}
                                </div>
                            </div>
                        </div>
                    </div>
                </InfiniteScroll>
            }
        </>
    );
};

export default Memes;