import React, { useEffect, useState } from "react";
import { getBooksData, getLiveBooksData } from "../../service/BookService";
import Preloader from "../Preloader/Preloader";
import "./SearchPanel.scss";

interface Book {
  readonly title: string;
  // readonly authors: string[];
  readonly imageLinks: string;
  readonly infoLink: string;
}

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
  const [moreBookPending, setMoreBookPending] = useState<boolean>(false);
  const [activeSearchString, setActiveSearchString] = useState<string>("");

  const updateData = (
    getData: any,
    setData: any,
    newMaxResults: number = maxResults,
    statusSearch = true
  ): void => {
    const newSearchString = searchString.trim();
    console.log(searchString, searchString.length);
    console.log(newSearchString, newSearchString.length);

    getData(newSearchString, newMaxResults)
      .then((bookArray: Book[]) => {
        setLoading(false);
        setData(bookArray);
        setErrorSearch(false);
        setMoreBookPending(false);
        setStatusSearch(statusSearch);
      })
      .catch(() => {
        setLoading(false);
        setErrorSearch(true);
        setStatusSearch(true);
        setMoreBookPending(false);
        setBooksLiveResult([]);
      });
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const string: string = e.target.value;
    setSearchString(string);
  };

  useEffect(() => {
    setErrorSearch(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  useEffect(() => {
    setActiveSearchString(searchString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booksResult]);

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
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
      setMoreBookPending(true);
      updateData(getBooksData, setBooksResult, newMaxResults);
    }
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

    const link = book.infoLink;

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
    const title = configTitle(book.title, 40);
    const link = book.infoLink;

    return (
      <li key={idx}>
        <a href={link} className="search-live-list-item">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/482/482631.svg"
            alt="search"
          />
          {title}
        </a>
      </li>
    );
  });

  const booksLiveResultErrorLogic =
    searchString && errorSearch && searchString !== activeSearchString;

  const searchClassLogic =
    (statusSearch && booksLiveResult.length !== 0) ||
    (searchString && errorSearch);

  const MoreBooksElem = () => {
    const len = booksResult.length;

    if (!moreBookPending && len < 40 && !loading && len === maxResults) {
      return (
        <button onClick={getMoreBooks} className="more-books-btn">
          Show more books
        </button>
      );
    } else if (moreBookPending) return <Preloader />;
    return null;
  };

  const ResultNotFound = () => {
    return (
      <li className="search-live-list-item results-not-found">
        <img
          src="https://www.flaticon.com/svg/static/icons/svg/482/482631.svg"
          alt="search"
        />
        No books were found for "<b>{searchString}</b>"
      </li>
    );
  };

  return (
    <div className={searchClassLogic ? "search-live search" : "search"}>
      <form action="#" onSubmit={onSearchSubmit}>
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
          />
        </div>

        <ul className="search-live-list">
          {statusSearch && renderLiveItems}
          {booksLiveResultErrorLogic && <ResultNotFound />}
        </ul>

        <p className="search-status">
          {booksResult.length !== 0
            ? `Query result: '${activeSearchString}'`
            : errorSearch && booksResult.length !== 0 && "Nothing to found"}
        </p>
      </form>

      <ul className="result">{!loading ? renderItems : <Preloader />}</ul>
      <div className="more-books">
        <MoreBooksElem />
      </div>
    </div>
  );
};

export default SearchPanel;
