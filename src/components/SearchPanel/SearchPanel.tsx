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
  const [moreBoksStep] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [booksResult, setBooksResult] = useState<Book[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [intervalRequest, setIntervalRequest] = useState<any>();
  const [errorSearch, setErrorSearch] = useState<boolean>(false);
  const [statusSearch, setStatusSearch] = useState<boolean>(false);
  const [maxResults, setMaxResults] = useState<number>(moreBoksStep);
  const [booksLiveResult, setBooksLiveResult] = useState<Book[]>([]);
  const [activeSearchString, setActiveSearchString] = useState<string>("");

  const updateData = (
    getData: any,
    setData: any,
    newMaxResults: number = maxResults,
    statusSearch = true
  ): void => {
    getData(searchString, newMaxResults)
      .then((bookArray: Book[]) => {
        setLoading(false);
        setData(bookArray);
        setStatusSearch(statusSearch);
        setErrorSearch(false);
      })
      .catch(() => {
        setLoading(false);
        setErrorSearch(true);
        setStatusSearch(true);
        setBooksLiveResult([]);
        console.log("catch");
      });
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const searchString: string = e.target.value;
    setSearchString(searchString);
  };

  // useEffect(() => {
  //   const enterInterval = setTimeout(() => {
  //     if (searchString) {
  //       updateData(getLiveBooksData, setBooksLiveResult);
  //     } else {
  //       setStatusSearch(false);
  //       setBooksLiveResult([]);
  //     }
  //   }, 500);
  //   setIntervalRequest(enterInterval);

  //   return () => {
  //     clearTimeout(enterInterval);
  //   };
  // }, [searchString]);
  useEffect(() => {
    if (searchString) {
      const enterInterval = setTimeout(() => {
        updateData(getLiveBooksData, setBooksLiveResult);
      }, 500);
      setIntervalRequest(enterInterval);

      return () => {
        clearTimeout(enterInterval);
      };
    } else {
      setBooksLiveResult([]);
    }
  }, [searchString]);

  useEffect(() => {
    setActiveSearchString(searchString);
  }, [booksResult]);

  const onSearchSubmit = (): void => {
    if (searchString && searchString !== activeSearchString && !errorSearch) {
      updateData(getBooksData, setBooksResult, maxResults, false);
      setLoading(true);
      setBooksLiveResult([]);
      clearTimeout(intervalRequest);
    }
  };

  const getMoreBooks = (): void => {
    if (maxResults >= 10 && maxResults <= 30) {
      const newMaxResults = maxResults + moreBoksStep;
      setMaxResults(newMaxResults);
      updateData(getBooksData, setBooksResult, newMaxResults);
    } else setMaxResults(40);
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
        (statusSearch && booksLiveResult.length !== 0) ||
        (searchString && errorSearch)
          ? "search-live search"
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
                searchString &&
                errorSearch &&
                searchString !== activeSearchString
                  ? "result-live-list-item results-not-found"
                  : "dn"
              }
            >
              No books were found for <b>"{searchString}"</b>
            </li>
          </ul>
          <p className="search-status">
            {booksResult.length !== 0
              ? `Query result: '${activeSearchString}'`
              : errorSearch && booksResult.length !== 0
              ? "Nothing to found"
              : ""}
          </p>
        </form>

        <ul className="result">{!loading ? renderItems : "Loading..."}</ul>
        <button
          className={
            activeSearchString &&
            maxResults < 40 &&
            booksResult.length === maxResults &&
            !loading
              ? "search-next-book"
              : "search-next-book dn"
          }
          onClick={getMoreBooks}
        >
          Show more books
        </button>
      </div>
    </div>
  );
};

export default SearchPanel;
