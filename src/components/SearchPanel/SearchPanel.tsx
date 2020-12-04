import React, { useEffect, useState } from "react";
import { getBooksData, getLiveBooksData } from "../../service/BookService";
import "./SearchPanel.scss";

interface Book {
  readonly title: string;
  readonly selfLink: string;
  readonly authors: string[];
  readonly textSnippet: string;
  readonly imageLinks: string;
  readonly previewLink: string;
}

const SearchPanel = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [booksResult, setBooksResult] = useState<Book[]>([]);
  const [booksLiveResult, setBooksLiveResult] = useState<Book[]>([]);
  const [maxResults] = useState<number>(10);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [statusSearch, setStatusSearch] = useState<boolean>(false);
  const [errorSearch, setErrorSearch] = useState<boolean>(false);
  const [intervalRequest, setIntervalRequest] = useState<any>();

  const updateData = (
    getData: any,
    setData: any,
    index: number = 0,
    statusSearch = true
  ): void => {
    getData(searchString, maxResults, index)
      .then((bookArray: Book[]) => {
        setData(bookArray);
        setStatusSearch(statusSearch);
      })
      .catch(() => {
        setErrorSearch(true);
        setBooksLiveResult([]);
      });
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const searchString: string = e.target.value;
    setErrorSearch(false);
    setSearchString(searchString);
  };

  useEffect(() => {
    const enterInterval = setTimeout(() => {
      if (searchString) {
        updateData(getLiveBooksData, setBooksLiveResult);
      } else {
        setBooksLiveResult([]);
      }
    }, 500);
    setIntervalRequest(enterInterval);

    return () => {
      clearTimeout(enterInterval);
    };
  }, [searchString]);

  const onSearchSubmit = (): void => {
    if (searchString) {
      updateData(getBooksData, setBooksResult, 0, false);
      setBooksLiveResult([]);

      clearTimeout(intervalRequest);
    }
  };

  const getNextBooks = (): void => {
    const newStartIndex = startIndex + 5;
    setStartIndex(newStartIndex);
    updateData(getBooksData, setBooksResult, newStartIndex);
  };

  const configTitle = (title: string, max: number) => {
    if (title.length > max) {
      let lenCounter: number = 0;
      let newTitle: string = "";

      title.split(" ").forEach((word: string) => {
        lenCounter += word.length;
        if (lenCounter <= max) {
          newTitle += " " + word;
          return newTitle;
        }
      });
      return newTitle + "..";
    }
    return title;
  };
  const renderItems = booksResult.map((book: Book, idx) => {
    const imageLink = book.imageLinks;
    const title = configTitle(book.title, 20);
    const link = book.previewLink;

    return (
      <div className="result-book" key={idx}>
        <a href={link}>
          <img src={imageLink} title={book.title} />
          <p>{title}</p>
        </a>
      </div>
    );
  });

  const renderLiveItems = booksLiveResult.map((book: Book, idx) => {
    const title = configTitle(book.title, 50);
    const link = book.previewLink;

    return (
      <li key={idx}>
        <a href={link}>{title}</a>
      </li>
    );
  });

  return (
    <div
      className={
        booksLiveResult.length !== 0 || errorSearch
          ? "search search-live"
          : "search"
      }
    >
      <div className="container">
        <div className="">
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

            <ul className="result-live-list">
              {statusSearch && renderLiveItems}
              <li
                className={
                  errorSearch && searchString ? "search-error-box" : "dn"
                }
              >
                No books were found for <b>"{searchString}"</b>
              </li>
            </ul>

            <button
              className={statusSearch ? "dn" : "dn"}
              onClick={getNextBooks}
            >
              Next 5 Books
            </button>
          </form>
          <div className="result">{renderItems}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
