import React from "react";

function SongCard({ song }) {
    const { name, album, external_urls, artists } = song;

    return (
        <div className="song-card">
            <a href={external_urls.spotify}>
                <img src={album.images[1].url} alt={`Capa álbum ${name}`} />
            </a>
            <div className="track-info">
                <b>{name}</b>
                <span>{artists.map((artist) => artist.name).join(", ")}</span>
            </div>
        </div >
    );
}

export default SongCard;