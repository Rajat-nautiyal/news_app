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
      API = `https://gnews.io/api/v4/search?q=Business&lang=en&min=10&apikey=9d95187d657b5c056be45553cbece5ce`;
    } else if (type === "Celebrities") {
      API = `https://gnews.io/api/v4/search?q=Celebrities&lang=en&min=10&apikey=9d95187d657b5c056be45553cbece5ce`;
    } else if (type === `Technology`) {
      API = `https://gnews.io/api/v4/search?q=technology&lang=en&min=10&apikey=9d95187d657b5c056be45553cbece5ce`;
    } else if (type === `Education`) {
      API = `https://gnews.io/api/v4/search?q=Education&lang=en&min=10&apikey=9d95187d657b5c056be45553cbece5ce`;
    }else if (type === `india`) {
      API = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&apikey=9d95187d657b5c056be45553cbece5ce`;
    }else if (type === `japan`) {
      API = `https://gnews.io/api/v4/top-headlines?country=jp&apikey=9d95187d657b5c056be45553cbece5ce`;
    }else if (type === `USA`) {
      API = `https://gnews.io/api/v4/top-headlines?country=us&lang=en&apikey=9d95187d657b5c056be45553cbece5ce`;
    }else if (type === `russia`) {
      API = `https://gnews.io/api/v4/top-headlines?country=ru&lang=en&apikey=9d95187d657b5c056be45553cbece5ce`;
    }else if (type === `spain`) {
      API = `https://gnews.io/api/v4/top-headlines?country=kr&apikey=9d95187d657b5c056be45553cbece5ce`;
    }else if (type === `canada`) {
      API = `https://gnews.io/api/v4/top-headlines?country=ca&lang=en&apikey=9d95187d657b5c056be45553cbece5ce`;
    }else if (type === `britain`) {
      API = `https://gnews.io/api/v4/top-headlines?country=gb&lang=en&apikey=9d95187d657b5c056be45553cbece5ce`;
    }
    else{ API = `https://api.worldnewsapi.com/search-news?number=20&api-key=a3fd4e534caf46b9a25f375049c128de&text=us`
          setSelectedArticle(null) };
          // https://gnews.io/api/v4/search?q=world&lang=en&min=10&apikey=9d95187d657b5c056be45553cbece5ce
    try {
      const response = await fetch(API);
      const data = await response.json();
      setData(data.news); //passing fetched data to articleData(which is used in useState)
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
                  <div  onClick={()=>specificTopic("spain")}>Spain</div> 
                  <div  onClick={()=>specificTopic("japan")}>Japan</div>
                  <div  onClick={()=>specificTopic("britain")}>Britain</div>
                  <div  onClick={()=>specificTopic("canada")}>Canada</div> 
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
                src={selectedArticle.image}
                alt="Loading"
                height="340px"
                width="800px"
              />
            </div>
            <p>{selectedArticle.description}</p>

            <p>{selectedArticle.content}</p>
             
            <div>
              <div className="click" onClick={click}>click to read full article</div>
            </div>
          </div>
        ) :articleData? (
          <div className="NewsPara">
            <h3 className="title">{articleData[0].title}</h3>
            <div>
              <img
                src={articleData[0].image}
                alt="Loading"
                height="340px"
                width="800px"
              />
            </div>
            <p style={{paddingBottom:"0px"}}>{articleData[0].description}</p>
            <p style={{paddingBottom:"0px"}}>{articleData[0].content}</p>

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
