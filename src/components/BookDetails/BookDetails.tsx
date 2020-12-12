import React from "react";
import "./BookDetails.scss";
const BookDetails = (activeBookData: any) => {
  console.log(activeBookData);
  const { title } = activeBookData;
  return (
    <div className="book-details">
      <div className="container">
        <h2 className="book-title">{title}</h2>
        <ul>
          <li>publisher</li>
        </ul>
        <div className="book">
          <img src="" alt="book" className="book-img" />
          <p className="book-title">Flowers for Algernon</p>
          <p className="book-author">Daniel Kizz</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
