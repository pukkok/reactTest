import React from 'react';

function Movie({title, genres, cover, rating, summary}){
    const style = {
        width: '500px',
        height: '600px',
        background: "white",
        margin: '0 auto',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
    }

    return (
        <div className='Movie-item' style={style}>
            <h3>{title}</h3>
            <img src={cover} alt={title}></img>
            <h4>genres: {genres.join(" ")}</h4>
            <p>rating : {rating}</p>
            <p>details: {summary.length>300 ? summary.slice(0, 300)+'...' : summary }</p>
        </div>
    )
}
 
export default Movie;

Movie.defaultProps = {
    genres : []
}