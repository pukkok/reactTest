import './App.css';
import React, { Component } from 'react';
import Movie from './Component/Movie';
import Banner from './Component/Banner';



// 영화제목별로 오름차순,  평점 rating
class App extends Component {
  num = 0

  constructor(props){
    super(props)
    this.state = {
      loading: true,
      movies: [],
      pick:[],
      first: true
    }
  }
 

  randomPick = () => {
    const {movies} = this.state
    this.num = this.extractNum(movies)

    fetch(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${this.num}`)
    .then(res => res.json())
    .then(datas => {
      console.log(datas)
      const {data : {movies : sub}} = datas
      this.setState({pick : sub})
    })
    
  }

  pickRandomNumber = (movies) => {
    return Math.floor( Math.random() * movies.length )
  }
  
  extractNum = (movies) => {
    let randomNum = this.pickRandomNumber(movies)

    return this.num === randomNum ? this.extractNum(movies) : this.num = randomNum
  }

  componentDidMount(){
    fetch('https://yts.mx/api/v2/list_movies.json?limit=30&minimum_rating=7&sort_by=title&order_by=asc')
    .then( res => res.json())
    .then( result => {
      const {data: {movies}} = result
      console.log(movies)
      this.setState({movies, loading: false})
      setInterval(()=>{
        this.randomPick()
      }, 3000);
    })

  }


  render(){
    const {loading, movies, pick} = this.state
    const selected = movies[this.num]
    const style = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      width: '60%',
      margin: '100px auto',
      textAlign: 'center'
    }
    const loadingStyle = {
      position: 'absolute', 
      left: '50%', 
      top:'50%', 
      transform: 'translate(-50%, -50%)', 
      fontSize: '2rem'
    }

    if(loading){
      return (
        <div style={loadingStyle}>
          <h1>Loading ...</h1>
        </div>
      )
    }else{
      return (
        <>
          <Banner
            key={selected.id}
            title={selected.title}
            genres={selected.genres}
            runtime={selected.runtime}
            cover={selected.large_cover_image}
            rating={selected.rating}
            summary={selected.summary}
            children={pick.map(data => {
              return(
                <div key={data.id} className='img-box'>
                <img src = {data.medium_cover_image}/>
                </div>
              ) 
            })}
          >
          </Banner>

        <div style={style}>
          {movies.map(movie => {
            return (
              <Movie 
                key={movie.id}
                title={movie.title}
                genres={movie.genres}
                cover={movie.medium_cover_image}
                summary={movie.summary}
                rating = {movie.rating}
              ></Movie>
            )
          })}
        </div>
        </>
      )
    }
  }
}

export default App;