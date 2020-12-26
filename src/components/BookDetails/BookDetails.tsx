import React, { useState, useEffect } from "react";
import "./BookDetails.scss";
import Preloader from "../Preloader/Preloader";

import { getBookData } from "../../service/BookService";

const BookDetails = (data: any) => {
  const [activeBookData, setActiveBookData] = useState<any>(null);
  const [descStatus, setDescStatus] = useState<boolean>(false);
  const { activeBookId } = data;

  activeBookId && localStorage.setItem("activeBookId", activeBookId);
  const storageBookId: string = localStorage.getItem("activeBookId")!;

  useEffect(() => {
    const bookId = activeBookId || storageBookId;
    if (bookId) {
      getBookData(bookId).then((books) => {
        setActiveBookData(books);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBookId]);

  if (!activeBookData) {
    return <Preloader />;
  }

  const {
    title,
    publisher,
    description,
    infoLink,
    publishedDate,
    pageCount,
    categories,
    authors,
    language,
    imageLink,
  } = activeBookData;

  const renderItems = (array: string[]) => {
    return array.map((item: any, i: number) => <span key={i}>{item}</span>);
  };
  const renderDescription = (string: string) => {
    console.log(string.length);

    const str = string.replaceAll(/<.?.>/g, "");
    const max = 275;
    if (str.length < max || descStatus) {
      return str;
    }

    return str.slice(0, max) + "..";
  };
  return (
    <div className="book-details">
      <div className="container">
        <div className="book-details-cover">
          <div></div>
        </div>
        <div className="book">
          <div className="book-preview">
            <img src={imageLink} alt="book" className="book-img" />
            <a href={infoLink} className="book-preview_link button-styles">
              Learn More
            </a>
          </div>
          <div className="book-info">
            <h2 className="book-info_title">{title}</h2>
            <div className="book-info_authors">
              <p>{renderItems(authors)}</p>
            </div>
            <div className="book-info_desc">
              <span className="key">About Book:</span>{" "}
              <p>{renderDescription(description)}</p>
              {!descStatus && (
                <div className="desc-wrapper">
                  <i className="arrow down"></i>
                  <button onClick={() => setDescStatus(true)}>Show All</button>
                </div>
              )}
            </div>
            <ul className="book-info_list">
              <li className="categories-wrapper">
                <span className="key">Categories:</span>
                {renderItems(categories)}
              </li>
              <li>
                <span className="key">Publish Date:</span>
                <span>{publishedDate}</span>
              </li>
              <li>
                <span className="key">Print Page:</span>
                <span>{pageCount}</span>
              </li>

              <li>
                <span className="key">Publisher:</span>
                <span>{publisher}</span>
              </li>

              <li>
                <span className="key">Languages:</span>
                <span>{language}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
