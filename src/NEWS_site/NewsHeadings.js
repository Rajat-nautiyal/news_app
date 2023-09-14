import React, { useContext } from "react";
import {dataContext} from "./createContextTwo";
 

export const Headings = ({ handleMainPage }) => {
  const articleData = useContext(dataContext);

  const scrollToTop = () => {
    if(window.screen.width < 1025){
      window.scrollTo({
      top: 0,
    })
    } else return
  }
  return (
    <>  
      <div className="AllinOneHeadings">
        {articleData.map((article, index) => (
            <h4
                className="eachHeading"  onClick={() => {scrollToTop(); handleMainPage(article);}} key={index}
              >            {/* handleMainPage function is used to send data to main page */}
                <img
                    src={article.image}
                    className="imageHeadings"
                    height="80px"
                    width='240px'

                  />
                  <div>
                      <div className="articleTitle">{article.title}</div>
                      <div className="publishDate">
                        <div>Published on</div><div>{article.publishedAt}</div>
                    </div>
                  </div>
              </h4>
        ))}
      </div>
    </>
  );
};
