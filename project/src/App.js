import './App.css';
import React, { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom'
import { Home, About, Error, MovieList } from './Pages';
import { Button, Menu, SideBar } from './Component';

const HomeMenu = [
  {
    url: '/',
    name: 'HOME'
  },
  {
    url: '/About',
    name: 'ABOUT'
  },
  {
    url: '/Movie',
    name: 'MOVIE'
  }
]

function App () {

  const [data, setData] = useState()

  useEffect(()=>{
    fetch('https://yts.mx/api/v2/list_movies.json?limit=50')
      .then( res => res.json())
      .then( result => {
          const {data: {movies}} = result
          return setData(movies)
    })
  },[])

  const [open, setOpen] = useState(false)
    
  const openSidebar = () => {
      setOpen(!open)
  }

  
  return (
    <div className='App'>

      <Button handleClick={openSidebar}>MENU</Button>
      <SideBar open={open}>
        <Menu menus={HomeMenu}></Menu>
      </SideBar>

      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/About' element={<About/>}/>
        <Route exact path='/Movie' element={<MovieList data={data}/>}>
          <Route path=':MovieId' element={<MovieList/>}/>
        </Route>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  )

}

export default App;