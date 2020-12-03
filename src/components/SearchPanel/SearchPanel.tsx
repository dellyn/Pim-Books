import React, { useState } from "react";
import { getSearchBooksData } from "../../service/BookService";
import "./SearchPanel.scss";

interface Book {
  id: string;
  title: string;
  selfLink: string;
  authors: string[];
  textSnippet: string;
  imageLinks: string;
}

const SearchPanel = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [booksResult, setBooksResult] = useState<Book[]>([]);
  const [maxResults] = useState<number>(30);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [statusSearch, setStatusSearch] = useState<boolean>(false);

  const getNextBooks = (): void => {
    const newStartIndex = startIndex + 5;
    setStartIndex(newStartIndex);
    updateData(newStartIndex);
  };

  const updateData = (index: number = startIndex): void => {
    getSearchBooksData(searchString, maxResults, index)
      .then((bookArray: Book[]) => {
        setBooksResult(bookArray);
        setStatusSearch(true);
      })
      .catch(() => {
        throw new Error("search error");
      });
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const searchString: string = e.target.value;
    setSearchString(searchString);
  };

  const onSearchSubmit = () => {
    searchString && updateData();
  };

  const renderItems = booksResult.map((book: Book, idx) => {
    console.log(book);

    const imageLink = book.imageLinks;
    let title = book.title;

    if (title.length > 20) {
      let lenCounter: number = 0;
      let newTitle: string = "";

      title.split(" ").forEach((word: string) => {
        lenCounter += word.length;
        if (lenCounter <= 20) {
          newTitle += " " + word;
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
              placeholder="Search"
              autoFocus={true}
            />
            <input
              className="search-labels-button"
              type="submit"
              value="Search"
              onClick={onSearchSubmit}
            />
          </div>
          <button className={statusSearch ? "" : "dn"} onClick={getNextBooks}>
            Next 5 Books
          </button>
        </form>
        <div className="result">{renderItems}</div>
      </div>
    </div>
  );
};

export default SearchPanel;
