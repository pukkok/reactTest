import React from "react";
import { useSearchParams } from "react-router-dom";

function Search ({placeholder, handleChange, value, filtering}) {

    const [searchParams, setSearchParams] = useSearchParams({})

    const changeQueryString = (e) => {
        const filter = e.target.value
        if(filter){
            setSearchParams({[filtering]:filter})
        }else{
            setSearchParams({}) // 쿼리스트링 초기화
        }
    }

    value = searchParams.get(filtering) || ''
    
    return(
        <div className="Search">
            <input placeholder={placeholder} onChange={changeQueryString}/>
        </div>
    )
}

export default Search

Search.defaultProps = {
    filtering : 'filter'
}