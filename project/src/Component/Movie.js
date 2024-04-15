import React from 'react';

function Movie({title, genres, cover, rating}){
    const style = {
        width: '230px',
        height: '500px',
        background: "white",
        margin: '10px',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
    }

    return (
        <div style={style}>
            <img src={cover} alt={title}></img>
            <h3>{title}</h3>
            <h4>{genres.join(" ")}</h4>
            <p>평점 : {rating}</p>
            {/* <p>{summary}</p> */}
        </div>
    )
}
 
export default Movie;