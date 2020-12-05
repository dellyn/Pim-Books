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

// добавить число всех книг по запросу
const SearchPanel = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [booksResult, setBooksResult] = useState<Book[]>([]);
  const [booksLiveResult, setBooksLiveResult] = useState<Book[]>([]);
  const [maxResults] = useState<number>(36);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [statusSearch, setStatusSearch] = useState<boolean>(false);
  const [errorSearch, setErrorSearch] = useState<boolean>(false);
  const [intervalRequest, setIntervalRequest] = useState<any>();
  const [activeSearchString, setActiveSearchString] = useState<string>("");

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
        // setBooksResult([]);
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

  useEffect(() => {
    setActiveSearchString(searchString);
  }, [booksResult]);

  const onSearchSubmit = (): void => {
    if (searchString && searchString !== activeSearchString) {
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
      <li className="result-book" key={idx}>
        <a href={link}>
          <img src={imageLink} title={book.title} alt={title} />
          <p>{title}</p>
        </a>
      </li>
    );
  });

  const renderLiveItems = booksLiveResult.map((book: Book, idx) => {
    const title = configTitle(book.title, 50);
    const link = book.previewLink;

    return (
      <li key={idx}>
        <a href={link} className="result-live-list-item">
          {title}
        </a>
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
                errorSearch && searchString
                  ? "result-live-list-item results-not-found"
                  : "dn"
              }
            >
              No books were found for <b>"{searchString}"</b>
            </li>
          </ul>
          <p className="search-status">
            {booksResult.length !== 0 && !errorSearch
              ? `Query result: '${activeSearchString}'`
              : errorSearch && booksResult.length !== 0
              ? "Nothing to found"
              : ""}
          </p>

          <button
            className={
              booksResult.length !== 0
                ? "search-next-book"
                : " search-next-book dn"
            }
            onClick={getNextBooks}
          >
            Next 5 Books
          </button>
        </form>

        <ul className="result">{renderItems}</ul>
      </div>
    </div>
  );
};

export default SearchPanel;
