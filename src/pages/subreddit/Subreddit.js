import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import './Subreddit.css';

import axios from "axios";
import formatNumber from "../../helpers/formatNumber";
import Button from "../../components/button/Button";

const Subreddit = () => {

    const [subDetails, setSubDetails] = useState();
    const [loading, toggleLoading] = useState(true);

    const {sub} = useParams();

    const getSubredditDetails = async () => {
        axios.get(`https://www.reddit.com/r/${sub}/about.json`)
            .then(function (response) {
                setSubDetails(response.data.data);
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
        getSubredditDetails();
    }, []);

    return (
        <>
            {loading && <p className={"loading"}>Loading</p>}
            {subDetails &&
                <>
                    <div className={"content-wrapper"}>
                        <div className={"sub-section"}>
                            <div className={"sub-details"}>
                                <h3>Title</h3>
                                <p>{subDetails.title}</p>
                                <h3>Description</h3>
                                <p>{subDetails.public_description}</p>
                                <h3>Number of subscribers</h3>
                                <p>{formatNumber(subDetails.subscribers)}</p>
                            </div>
                            <div className="go-back-button">
                                <Button/>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default Subreddit;