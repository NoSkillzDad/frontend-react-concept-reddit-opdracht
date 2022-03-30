import React, {useState} from 'react';
import './Reddit.css';

const Reddit = () => {
    const [youtubeID] = useState('dQw4w9WgXcQ')

    return (
        <div className={"content-wrapper"}>
            <div className={"section"}>
                <div className={"section-title"}>
                    <h2>You have been partially RickRolled</h2>
                    <h5>unmute for complete satisfaction</h5>
                </div>
                <div className={"section-content"}>
                    <div className={"video-wrapper"}>
                        <iframe className="video"
                                src={`https://youtube.com/embed/${youtubeID}?autoplay=1&mute=1`}
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Reddit;