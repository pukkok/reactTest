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
      pick:[]
    }
  }
 

  randomPick = (id) => {
    fetch(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${id}`)
    .then(res => res.json())
    .then(datas => {
      // console.log(datas)
      const {data : {movies : sub}} = datas
      this.setState({pick : sub})
    })
  }

  pickRandomNumber = (movies) => {
    return Math.floor(Math.random() * movies.length )
  }
  
  extractNumber = (movies) => {
    let randomNum = this.pickRandomNumber(movies)

    this.num === randomNum ? this.extractNumber(movies) : this.num = randomNum

    return movies[randomNum].id
  }

  componentDidMount(){
    // 최대 30개, 최소평점 7, 제목기준 정렬, 오름차순
    fetch('https://yts.mx/api/v2/list_movies.json?limit=30&minimum_rating=7&sort_by=title&order_by=asc')
    .then( res => res.json())
    .then( result => {
      const {data: {movies}} = result
      console.log(movies)
      this.randomPick(movies[0].id)
      this.setState({movies, loading: false})
        
      this.timerId = setInterval(()=>{
          const id = this.extractNumber(movies)
          this.randomPick(id)
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
            {...selected}
            cover = {selected.large_cover_image}
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
                {...movie}
                key={movie.id}
                cover={movie.medium_cover_image}
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