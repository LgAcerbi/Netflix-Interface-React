import React, {useEffect, useState} from 'react';
import Dados from './Tmdb';
import Filmes from './components/Filmes'
import './App.css';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header'
import { keyframes } from "styled-components";

export default () => {
      
    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBlackheader] = useState(false);
    useEffect(() =>{
    const loadAll = async () =>{
  //Pegando a lista total

      let list = await Dados.getHomeList();
      console.log(list)
      setMovieList(list)
      

     

    //Pegando a feature
    let originals = list.filter(i=> i.slug === 'originals');
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
    let chosen = originals[0].items.results[randomChosen];

    let chosenInfo = await Dados.getMovieInfo(chosen.id, 'tv')
    console.log(chosenInfo)
    setFeaturedData(chosenInfo)
    }

    loadAll();
  },[])
  

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackheader(true);
      }
      else{
        setBlackheader(false);
      }
    }
    window.addEventListener('scroll',scrollListener);
    return () =>{
      window.removeEventListener('scroll',scrollListener)
    }
  }, []);

  return (
    <div className ="page">

      <Header black={blackHeader}></Header>

      {featuredData &&
        <FeatureMovie  item = {featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) =>(
          <Filmes key={key} title={item.title} items={item.items}></Filmes>
        ))
        }
      </section>
      <footer>
        Todos os direitos reservados ao Netflix<br/>
        All rights reserved to Netflix<br/>
        Dados providos por themoviedb.org
      </footer>
      
      {movieList.length <= 0 &&
      <div className = "loading">
          <img src = "https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif" alt = "Loading"></img>
      </div>
      }
    </div>
  )
}