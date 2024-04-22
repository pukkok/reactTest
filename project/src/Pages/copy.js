import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useParams, useSearchParams } from "react-router-dom";
import './styles/MovieList.css'
import { Movie, Search } from "../Component";

function MovieList ({data}) {

    const [loading, setLoading] = useState(true)
    const [loadData, setLoadData] = useState()
    useEffect(()=>{
        data ? setLoading(false) : setLoading(true)
        if(loading) setLoadData(data)
    })   

    const params = useParams()

    const [searchParams, setSearchParams] = useSearchParams()

    const changeQueryString = (e) => {
        const filter = e.target.value
        if(filter){
            setSearchParams({filter})
        }else{
            setSearchParams({}) // 쿼리스트링 초기화
        }
    }    

    const applyActiveColor = ({ isActive }) => {
        return isActive ? {color: 'white', backgroundColor: 'lightsteelblue'} : {}
    }

    const QueryNavLink = ({to, children, ...props}) =>{
        const loaction = useLocation()
        return <NavLink to={to+loaction.search} {...props}>{children}</NavLink>
    }

    const filtered = loadData && loadData
    .filter(el => {
        const filter = searchParams.get('filter')
        if(!filter) return true
        const title = el.title.toLowerCase()
        return title.includes(filter.toLowerCase())
    })

    const filteredMovie = filtered && filtered[params.MovieId]

    return(
        loading ? 
        <h1>로딩 중...</h1> :
        <>
            <Search placeholder={'search...'} handleChange={changeQueryString} value={searchParams.get('filter') || ''}/>
            <h1>MOVIE PAGE</h1>
            {filteredMovie ?
            <>
                <Movie cover={filteredMovie.medium_cover_image} {...filteredMovie}/>
            </>: ''
            }

            <div className="Movie-List">
                {filtered && filtered.map((el, id)=>{
                    return(
                        <QueryNavLink style={applyActiveColor} key={id} to={`/Movie/${id}`}>{el.title}</QueryNavLink>
                    )
                })}
            </div>
        </>
    )
}

export default MovieList