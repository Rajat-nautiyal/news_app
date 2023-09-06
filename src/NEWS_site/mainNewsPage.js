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
      API = `https://api.worldnewsapi.com/search-news?api-key=a3fd4e534caf46b9a25f375049c128de&text=Business.`;
    } else if (type === "Celebrities") {
      API = `https://api.worldnewsapi.com/search-news?api-key=a3fd4e534caf46b9a25f375049c128de&text=Celebrities.`;
    } else if (type === `Technology`) {
      API = `https://api.worldnewsapi.com/search-news?api-key=a3fd4e534caf46b9a25f375049c128de&text=Technology.`;
    } else if (type === `Education`) {
      API = `https://api.worldnewsapi.com/search-news?api-key=a3fd4e534caf46b9a25f375049c128de&text=korea.`;
    }else if (type === `india`) {
      API = `https://api.worldnewsapi.com/search-news?api-key=a3fd4e534caf46b9a25f375049c128de&text=korea.`;
    }else if (type === `france`) {
      API = `https://api.worldnewsapi.com/search-news?api-key=a3fd4e534caf46b9a25f375049c128de&text=korea.`;
    }else if (type === `japan`) {
      API = `https://api.worldnewsapi.com/search-news?api-key=a3fd4e534caf46b9a25f375049c128de&text=korea.`;
    }else if (type === `USA`) {
      API = `https://api.worldnewsapi.com/search-news?api-key=a3fd4e534caf46b9a25f375049c128de&text=korea.`;
    }else if (type === `russia`) {
      API = `https://api.worldnewsapi.com/search-news?api-key=a3fd4e534caf46b9a25f375049c128de&text=korea.`;
    }else if (type === `korea`) {
      API = `https://api.worldnewsapi.com/search-news?api-key=a3fd4e534caf46b9a25f375049c128de&text=korea.`;
    }else if (type === `ukraine`) {
      API = `https://api.worldnewsapi.com/search-news?api-key=a3fd4e534caf46b9a25f375049c128de&text=korea.`;
    }else if (type === `britain`) {
      API = `https://api.worldnewsapi.com/search-news?api-key=a3fd4e534caf46b9a25f375049c128de&text=korea.`;
    }
    else{ API = `https://api.worldnewsapi.com/search-news?api-key=a3fd4e534caf46b9a25f375049c128de&text=korea.6`
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
                src={selectedArticle.image}
                alt="Loading"
                height="340px"
                width="800px"
              />
            </div>
            <p>{selectedArticle.text}</p>
             
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
            <p style={{paddingBottom:"0px"}}>{articleData[0].text}</p>
           
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
