import React, { useEffect, useState } from "react";
import { getBooksData, getLiveBooksData } from "../../service/BookService";
import Preloader from "../Preloader/Preloader";
import "./SearchPanel.scss";
import { Link } from "react-router-dom";

interface Book {
  readonly id: number | string;
  readonly title: string;
  readonly imageLink: string;
  readonly infoLink: string;
}
const SearchPanel = (props: any) => {
  const [moreBoksStep] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [booksResult, setBooksResult] = useState<Book[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [intervalRequest, setIntervalRequest] = useState<any>();
  const [errorSearch, setErrorSearch] = useState<boolean>(false);
  const [maxResults, setMaxResults] = useState<number>(moreBoksStep);
  const [booksLiveResult, setBooksLiveResult] = useState<Book[]>([]);
  const [moreBookLoading, setMoreBookLoading] = useState<boolean>(false);
  const [activeSearchString, setActiveSearchString] = useState<string>("");

  const updateData = (
    getData: any,
    setData: any,
    newMaxResults: number = maxResults
  ): void => {
    getData(searchString, newMaxResults)
      .then((bookArray: Book[]) => {
        setLoading(false);
        setData(bookArray);
        setErrorSearch(false);
        setMoreBookLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErrorSearch(true);
        setMoreBookLoading(false);
        setBooksLiveResult([]);
      });
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const string: string = e.target.value;
    setSearchString(string);
  };

  useEffect(() => {
    setErrorSearch(false);

    if (searchString.trim()) {
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
    if (searchString !== activeSearchString && !errorSearch) {
      updateData(getBooksData, setBooksResult, maxResults);
      setLoading(true);
      setBooksLiveResult([]);
      clearTimeout(intervalRequest);
    }
  };

  const getMoreBooks = (): void => {
    if (maxResults >= moreBoksStep && maxResults <= 30) {
      const newMaxResults = maxResults + moreBoksStep;
      setMaxResults(newMaxResults);
      setMoreBookLoading(true);
      updateData(getBooksData, setBooksResult, newMaxResults);
    }
  };

  const configTitle = (title: string, max: number): string => {
    if (title.length > max) {
      let lenCounter: number = 0;
      const newTitle = title
        .trim()
        .split(" ")
        .filter((word: string) => {
          lenCounter += word.length;
          return lenCounter <= max && " " + word;
        });
      return newTitle.join(" ") + "..";
    }
    return title;
  };

  const renderItems = booksResult.map(
    (book: Book, i): React.ReactNode => {
      const { title, imageLink, id } = book;
      const configuredTitle: string = configTitle(title, 20);

      return (
        <li
          className="result-list-item"
          key={i}
          onClick={() => props.openBookDetails(id)}
        >
          <Link to={"/book/" + id}>
            <img src={imageLink} title={title} alt={title} />
            <p>{configuredTitle}</p>
          </Link>
        </li>
      );
    }
  );

  const renderLiveItems = booksLiveResult.map(
    (book: Book, i): React.ReactNode => {
      const configuredTitle: string = configTitle(book.title, 40);
      const { id } = book;
      const iconLink: string =
        "https://www.flaticon.com/svg/static/icons/svg/482/482631.svg";

      return (
        <li
          key={i}
          onClick={() => props.openBookDetails(id)}
          className="search-live-list-item"
        >
          <img src={iconLink} alt="icon" />
          {configuredTitle}
        </li>
      );
    }
  );

  const MoreBooksElem = () => {
    const len = booksResult.length;

    if (!moreBookLoading && len < 40 && !loading && len === maxResults) {
      return (
        <button onClick={getMoreBooks} className="more-books-btn">
          Show more books
        </button>
      );
    } else if (moreBookLoading) return <Preloader />;
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

  const liveResultErrLogic = errorSearch && searchString;
  const formStyleLogic = booksLiveResult.length !== 0 || liveResultErrLogic;

  return (
    <div className="search">
      <form
        onSubmit={onSearchSubmit}
        className={
          formStyleLogic ? "search-form-live search-form" : "search-form"
        }
      >
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
          {!liveResultErrLogic ? renderLiveItems : <ResultNotFound />}
        </ul>

        <p className="search-status">
          {booksResult.length !== 0 && `Query result: '${activeSearchString}'`}
        </p>
      </form>

      <div className="result">
        <ul className="result-list">
          {!loading ? renderItems : <Preloader />}
        </ul>
        <div className="more-books">
          <MoreBooksElem />
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
