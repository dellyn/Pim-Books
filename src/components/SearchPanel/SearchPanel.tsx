import React, { useState, useEffect } from "react";
import BookService from "../../service";
import "./SearchPanel.scss";

const SearchPanel = () => {
  const bookService = new BookService();
  const [searchString, setSearchString] = useState("javascript");
  const [booksResult, setBooksResult] = useState([]);

  const updateData = () => {
    bookService.getSearchBooksData(searchString).then((body) => {
      setBooksResult(body);
    });
    // .catch(() => {
    //   console.log("Search result is empty");
    // });
  };

  const onSearchChange = (e: any) => {
    const searchString: string = e.target.value;
    setSearchString(searchString);
  };

  const onSearchSubmit = (e: any) => {
    e.preventDefault();
    if (searchString.length > 0) {
      updateData();
    }
  };

  const renderItems = booksResult.map((item: any, idx) => {
    const imageLink = item.imageLinks;
    let title = item.title;
    if (title.length > 20) {
      const titleArr = title.split(" ");
      let lenCounter: number = 0;
      let newTitle: string = "";

      titleArr.forEach((item: string) => {
        lenCounter += item.length;
        if (lenCounter <= 20) {
          newTitle += " " + item;
          return newTitle;
        }
      });

      title = newTitle + "..";
    }
    return (
      <div className="result-book" key={idx}>
        <img src={imageLink} alt="" />
        <p>{title}</p>
      </div>
    );
  });

  return (
    <div className="search">
      <div className="container">
        <form action="#">
          <div className="search-labels">
            <input
              className="search-labels-input"
              type="text"
              onChange={onSearchChange}
              value={searchString}
            />
            <input
              className="search-labels-button"
              type="submit"
              value="Search"
              onClick={onSearchSubmit}
            />
          </div>
        </form>
        <div className="result">{renderItems}</div>
      </div>
    </div>
  );
};

export default SearchPanel;
