import React, { useState,useEffect } from "react";
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

    switch (type){
        case "Business":
        API = `https://gnews.io/api/v4/search?q=Business&lang=en&min=10&apikey=${process.env.REACT_APP_API_KEY}`;
        break;
        case "Technology":
        API = `https://gnews.io/api/v4/search?q=Technology&lang=en&min=10&apikey=${process.env.REACT_APP_API_KEY}`;
        break;
        case "fashion":
        API = `https://gnews.io/api/v4/search?q=fashion&lang=en&min=10&apikey=${process.env.REACT_APP_API_KEY}`;
        break;
        case "Education":
        API = `https://gnews.io/api/v4/search?q=Education&lang=en&min=10&apikey=${process.env.REACT_APP_API_KEY}`;
        break;
        case "Movies":
        API = `https://gnews.io/api/v4/search?q=Movies&lang=en&min=10&apikey=${process.env.REACT_APP_API_KEY}`;
        break;
        case "Lifestyle":
        API = `https://gnews.io/api/v4/search?q=Lifestyle&lang=en&min=10&apikey=${process.env.REACT_APP_API_KEY}`;
        break;
        case "health":
        API = `https://gnews.io/api/v4/search?q=health&lang=en&min=10&apikey=${process.env.REACT_APP_API_KEY}`;
        break;
        case "entertainment":
        API = `https://gnews.io/api/v4/search?q=entertainment&lang=en&min=10&apikey=${process.env.REACT_APP_API_KEY}`;
        break;
        case "USA":
        API = `https://gnews.io/api/v4/top-headlines?country=us&lang=en&apikey=${process.env.REACT_APP_API_KEY}`;
        break;
        case "india":
        API = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&apikey=${process.env.REACT_APP_API_KEY}`;
        break;
        case "japan":
        API = `https://gnews.io/api/v4/top-headlines?country=jp&lang=en&apikey=${process.env.REACT_APP_API_KEY}`;
        break;
        case "singapore":
        API = `https://gnews.io/api/v4/top-headlines?country=sg&lang=en&apikey=${process.env.REACT_APP_API_KEY}`;
        break;
        case "Canada":
        API = `https://gnews.io/api/v4/top-headlines?country=ca&lang=en&apikey=${process.env.REACT_APP_API_KEY}`;
        break;
        case "britain":
        API = `https://gnews.io/api/v4/top-headlines?country=gb&lang=en&apikey=${process.env.REACT_APP_API_KEY}`;
        break;
        case "china":
        API = `https://gnews.io/api/v4/top-headlines?country=cn&apikey=${process.env.REACT_APP_API_KEY}`;
        break;
        default :
        API = `https://gnews.io/api/v4/search?q=world&lang=en&min=10&apikey=${process.env.REACT_APP_API_KEY}`
        setSelectedArticle(null);

    }
    try {
      const response = await fetch(API);
      const data = await response.json();
      setData(data.articles);
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
        <div className="NavNheader">
          <nav className="Navbar">
          <div className="dropdown" >
              <div className="country"><div id ='content'></div><div className="country-child">Country</div></div>
              <div className="dropdown-content">     
                  <div  onClick={()=>specificTopic("india")}>India</div>
                  <div  onClick={()=>specificTopic("USA")}>USA</div>
                  <div  onClick={()=>specificTopic("singapore")}>Singapore</div> 
                  <div  onClick={()=>specificTopic("japan")}>Japan</div>
                  <div  onClick={()=>specificTopic("britain")}>Britain</div>
                  <div  onClick={()=>specificTopic("Canada")}>Canada</div> 
                  <div  onClick={()=>specificTopic("china")}>china</div> 

              </div>
           </div>         
            <li  onClick={() =>specificTopic("Technology")}>Technology</li>
            <li  onClick={() =>specificTopic("Business") }>Business</li>
            <li  onClick={()=>specificTopic("fashion")}>fashion</li>
            <li  onClick={()=>specificTopic("Education")}>Education</li>
            <li  onClick={()=>specificTopic("Movies")}>Movies</li>
            <li  onClick={()=>specificTopic("health")}>Health</li>
            <li  onClick={()=>specificTopic("entertainment")}>Entertainment</li>
            <li  onClick={()=>specificTopic("Lifestyle")}>Lifestyle</li>

          </nav>
            <div className="parent-TH"><h3 className="Top-Headline">Top Headlines</h3></div>
        </div>

      <div className="paraNheadings">
        {selectedArticle ? (
          <div className="NewsPara">
            <h3 className="title">{selectedArticle.title}</h3>
            <div>
              <img
                src={selectedArticle.image}
                alt="Loading"
                className="image"
              />
            </div>
            <p>{selectedArticle.description}</p>

            <p>{selectedArticle.content}</p>
             
            <div>
              <div className="click" onClick={click}>click to read full article</div>
            </div>
            <h3 className="mob_Top_headlines">Top Headlines</h3>
          </div>
        ) :articleData? (
          <div className="NewsPara">
            <h3 className="title">{articleData[0].title}</h3>
            <div>
              <img
                src={articleData[0].image}
                alt="Loading"
                className="image"
              />
            </div>
            <p style={{paddingBottom:"0px"}}>{articleData[0].description}</p>
            <p >{articleData[0].content}</p>

            <div>
              <div className="click" onClick={click}>click to read full article</div>
            </div>
            <h3 className="mob_Top_headlines">Top Headlines</h3>
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
