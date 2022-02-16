import React, { useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import notfound from "./image/notfound.png";
import * as FaIcons from "react-icons/fa";

function App() {
  const [state, setState] = useState();
  const [filtered, setFilter] = useState(state);
  const [search, setSearch] = useState("");
  const URL = "http://api.tvmaze.com/search/shows?q=girls";
  useEffect(() =>  {
    const getData = async () => {
        const res = await Axios.get(URL)
        setState(res)
        setFilter(res)
        console.log(res)
    }
    getData();
  },[]);
  useEffect(() =>  {
    // {state ? console.log(state.data[0].show.image.original) : console.log("")}
  
    setFilter(state ? state.data.filter(item => {
      return item.show.name.toLowerCase().includes(search.toLowerCase())
    }): state);
    
  },[state])
  useEffect(() =>  {
    setFilter(state ? state.data.filter(item => {
      return item.show.name.toLowerCase().includes(search.toLowerCase())
    }): state);
  },[search])
  // useEffect(() =>  {
  //   state ?
  //   state = state.
  // },[search])
  
  // const filtered = state ? state.data.map(item => {
  //   console.log(item.show.name)
  //   return item.show.name.toLowerCase().includes(search.toLowerCase())
  // }):""
  const handleChange = (e) =>{
    setSearch(e.target.value);
  }
  
  return (
  <div className='main'>
    <div className="header" style={{ backgroundImage: `url(${state ? state.data[0].show.image.original : ""})` }}>
      <div className='nav'>
        <div className='logo'>
          Company
        </div>
        <div className="rightnav">
          <div>
            <input type="text" value={search} onChange={handleChange}/>
          </div>
          <div>
            Ivan Muhammad Nizar
          </div>
        </div>
      </div>
      
    </div>
    <div className='list'>
      {
        filtered ?
        // console.log("ada kok",filtered)
        filtered.map((item, index) => {
          // console.log(item ? item.show.url : "")
          return(
            <a href={item.show.url} key={index}>
              <div className='content'>
                  <div className='head'>
                    <div className='premiered'>
                      <span>Premired: </span>{item.show.premiered}
                    </div>
                    <div className='rating'>
                      <span><FaIcons.FaStar/>Rating : </span>{item.show.rating.average}
                    </div>
                  </div>
                  <img src={item.show.image ? item.show.image.medium : notfound} alt="" />
                  <div className='title'>
                    {item.show.name}
                  </div>
                  <div>
                    Genres: 
                    {item.show.genres.map((item2, index2) => {
                      console.log("ind ",index2)
                      console.log("item ", item.show.genres.length)
                      return(
                        <span> {item2}{index2 < item.show.genres.length-1 ? "," : ""}</span>
                      )
                    })}
                  </div>
                  <div className='summary' dangerouslySetInnerHTML={{ __html: item.show.summary ? item.show.summary : "<p>Summary Not Found</p>" }}>
                  {/* {item ? "" : "Tidak memiliki summary"} */}
                  </div>
                  
              </div>
            </a>
          )
        })
        :
        <></>
      }
    </div>
  </div>
  );
}

export default App;
