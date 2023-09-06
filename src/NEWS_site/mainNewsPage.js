import React, { useContext, useState,useEffect } from "react";
import './News.css';

import { Headings } from './NewsHeadings';
import { dataContext } from "./createContextTwo";

export const MainPage = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleData, setData] = useState([]);
 

  const specificTopic = async (type) => {  
    let API;
    const A = new Date();
    let D = A.getDate()-5;
    const Y = A.getFullYear();
    let M = A.getMonth()+1;


    if (D <= 0) {
      D = D +30; 
      M = M -1      
    }    

   const date = `${Y}-${M}-${D}`
   console.log(date)
      
    if (type === "Business") {
      API = `https://newsapi.org/v2/everything?q=business&from=${date}&sortBy=popularity&apiKey=3552f797383b4fa7a08da1b7175650f6`;
    } else if (type === "Celebrities") {
      API = `https://newsapi.org/v2/everything?q=celebrities&from=${date}&sortBy=popularity&apiKey=3552f797383b4fa7a08da1b7175650f6`;
    } else if (type === `Technology`) {
      API = `https://newsapi.org/v2/everything?q=technology&from=${date}&sortBy=popularity&apiKey=3552f797383b4fa7a08da1b7175650f6`;
    } else if (type === `Education`) {
      API = `https://newsapi.org/v2/everything?q=education&from=${date}&sortBy=popularity&apiKey=3552f797383b4fa7a08da1b7175650f6`;
    }else if (type === `india`) {
      API = `https://newsapi.org/v2/top-headlines?country=in&from=${date}&sortBy=popularity&apiKey=3552f797383b4fa7a08da1b7175650f6`;
    }else if (type === `france`) {
      API = `https://newsapi.org/v2/everything?q=fr&from=${date}&language=en&sortBy=popularity&apiKey=3552f797383b4fa7a08da1b7175650f6`;
    }else if (type === `japan`) {
      API = `https://newsapi.org/v2/top-headlines?country=jp&from=${date}&sortBy=popularity&apiKey=3552f797383b4fa7a08da1b7175650f6`;
    }else if (type === `USA`) {
      API = `https://newsapi.org/v2/top-headlines?country=us&from=${date}&sortBy=popularity&apiKey=3552f797383b4fa7a08da1b7175650f6`;
    }else if (type === `russia`) {
      API = `https://newsapi.org/v2/top-headlines?country=ru&from=${date}&sortBy=popularity&apiKey=3552f797383b4fa7a08da1b7175650f6`;
    }else if (type === `korea`) {
      API = `https://newsapi.org/v2/top-headlines?country=kr&from=${date}&sortBy=popularity&apiKey=3552f797383b4fa7a08da1b7175650f6`;
    }else if (type === `ukraine`) {
      API = `https://newsapi.org/v2/top-headlines?country=ua&from=${date}&sortBy=popularity&apiKey=3552f797383b4fa7a08da1b7175650f6`;
    }else if (type === `britain`) {
      API = `https://newsapi.org/v2/top-headlines?country=gb&from=${date}&sortBy=popularity&apiKey=3552f797383b4fa7a08da1b7175650f6`;
    }
    else{ API = `https://newsapi.org/v2/everything?q=BBC&from=${date}&sortBy=popularity&apiKey=3552f797383b4fa7a08da1b7175650f6`
          setSelectedArticle(null) };

    try {
      const response = await fetch(API);
      const data = await response.json();
      setData(data.articles); //passing fetched data to articleData(which is used in useState)
      setSelectedArticle(null)
    } catch (error) {
      console.log(error);
    }
  };

 
useEffect(() => {
  specificTopic();
}, []);
  
  if (!articleData || articleData.length === 0) {
    return <p>Loading...</p>;
  }

  const handleMainPage = (article) => {
    setSelectedArticle(article);
  };

 

  const click = () => {
    if (selectedArticle) {
      window.open(selectedArticle.url);
    } else if (articleData && articleData.length > 0) {
      window.open(articleData[0].url);
    }
  };
        
  return (
    <>
      <div className="header">
        <h1 className="quickGlance">QuickGlance</h1>
      </div>
      <div className="parentElement">
        <div className="NavNheader">
          <nav className="Navbar">
          <div className="dropdown" style={{ position: 'relative' }}>
              <div className="country"><div id ='content'></div><div className="country-child">Country</div></div>
              <div className="dropdown-content">     
                  <div  onClick={()=>specificTopic("india")}>India</div>
                  <div  onClick={()=>specificTopic("USA")}>USA</div>
                  <div  onClick={()=>specificTopic("korea")}>Korea</div> 
                  <div  onClick={()=>specificTopic("japan")}>Japan</div>
                  <div  onClick={()=>specificTopic("russia")}>Russia</div>
                  <div  onClick={()=>specificTopic("france")}>France</div> 
              </div>
           </div>         
            <li  onClick={() =>specificTopic("Technology")}>Technology</li>
            <li  onClick={() =>specificTopic("Business") }>Business</li>
            <li  onClick={()=>specificTopic("Celebrities")}>Personalities</li>
            <li  onClick={()=>specificTopic("Education")}>Education</li>
          </nav>
          <div className="parent-top-headline"><h3 className="Top-Headline">Top Headlines</h3></div>
        </div>
      </div>

      <div className="paraNheadings">
        {selectedArticle ? (
          <div className="NewsPara">
            <h3 className="title">{selectedArticle.title}</h3>
            <div>
              <img
                src={selectedArticle.urlToImage}
                alt="Loading"
                height="340px"
                width="800px"
              />
            </div>
            <p>{selectedArticle.description}</p>
             
            <p style={{padding:"0px"}}>{selectedArticle.content}</p>
            <div>
              <div className="click" onClick={click}>click to read full article</div>
            </div>
          </div>
        ) :articleData? (
          <div className="NewsPara">
            <h3 className="title">{articleData[0].title}</h3>
            <div>
              <img
                src={articleData[0].urlToImage}
                alt="Loading"
                height="340px"
                width="800px"
              />
            </div>
            <p style={{paddingBottom:"0px"}}>{articleData[0].description}</p>
           
            <p style={{padding:"0px"}}>{articleData[0].content}</p>
            <div>
              <div className="click" onClick={click}>click to read full article</div>
            </div>
          </div>
        ):(<div className="NewsPara">Loading</div>) 
        }
      <dataContext.Provider value={articleData}>
        <Headings handleMainPage={handleMainPage} />
      </dataContext.Provider>     
      </div>

    </>
  );
};
