import React, {Component} from "react";
import '../Style/MovieViewer.css'

function Banner ({cover, title, rating, runtime, genres, summary, children}){
 
    return(
        <div className="movie-viewer">
            <div className="main-img-box">
                <img src={cover}/>
            </div>
            <div className="detail-box">
                <div className="text-box">
                    <h1>{title}</h1>
                    <p>평점 : {rating}</p>
                    <p>상영시간 : {runtime}분</p>
                    <p>장르 : {genres.join(' ')}</p>
                    <p>줄거리 : {summary.length> 500 ? summary.slice(0,500)+'...' : summary}</p>
                </div>
                <div className="sub-img-box">
                    {children}
                </div>
            </div>
        </div>
    )
    
}

export default Banner