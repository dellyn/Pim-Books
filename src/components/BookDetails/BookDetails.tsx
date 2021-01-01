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
    return (
      <div className="center">
        <Preloader />
      </div>
    );
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
  const maxDescLength = 225;

  const renderItems = (array: string[]) => {
    return array.map((item: any, i: number) => <span key={i}>{item}</span>);
  };

  const renderDescription = (description: string): string => {
    const str = description.replaceAll(/(\<(\/?[^>]+)>)/g, " ");
    if (str.length < maxDescLength || descStatus) {
      return str;
    }
    return str.slice(0, maxDescLength) + "..";
  };

  return (
    <div className="book-details">
      <div className="container">
        <div className="cover">
          <div className="cover_block"></div>
        </div>
        
        <div className="book">
          <div className="preview">
            <img src={imageLink} alt="book" className="preview_img" />
            <a href={infoLink} className="preview_link button-styles">
              Learn More
            </a>
          </div>

          <div className="info">
            <h2 className="info_title">{title}</h2>
            <div className="info_authors">
              <p>{renderItems(authors)}</p>
            </div>

            <div className="description">
              <span className="key">About Book:</span>{" "}
              <p>{renderDescription(description)}</p>
              {!descStatus && description.length > maxDescLength && (
                <div className="description_wrapper">
                  <i className="arrow down"></i>
                  <button onClick={() => setDescStatus(true)}>Show All</button>
                </div>
              )}
            </div>

            <ul className="list">
              <li className="list_categories">
                <span className="list_key">Categories:</span>
                {renderItems(categories)}
              </li>
              <li>
                <span className="list_key">Publish Date:</span>
                <span>{publishedDate}</span>
              </li>
              <li>
                <span className="list_key">Print Page:</span>
                <span>{pageCount}</span>
              </li>
              <li>
                <span className="list_key">Publisher:</span>
                <span>{publisher}</span>
              </li>
              <li>
                <span className="list_key">Language:</span>
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
