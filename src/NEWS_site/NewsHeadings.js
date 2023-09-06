
import React, { useContext } from "react";
import {dataContext} from "./createContextTwo";
 

export const Headings = ({ handleMainPage }) => {
  const articleData = useContext(dataContext);
  return (
    <> 
      
      <div className="AllinOneHeadings">
        {articleData.map((article) => (
          <h4
            className="eachHeading" onClick={() => handleMainPage(article)} key={article.url}
          >                              {/* handleMainPage is used to send data of title to main page */}
            <img
                src={article.urlToImage}
                height="80px"
                width='240px'
              /><div>{article.title}</div>
          </h4>
        ))}
      </div>
    </>
  );
};
