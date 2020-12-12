import React, { useState, useEffect } from "react";
import "./App.scss";
import SearchPanel from "./components/SearchPanel";
import BookDetails from "./components/BookDetails";
import { getBookData } from "../src/service/BookService";

const App = () => {
  const [activeBookId, setActiveBookId] = useState<string | null>(null);
  const [activeBookData, setActiveBookData] = useState<any>(null);

  const openBookDetails = (bookId: string) => {
    setActiveBookId(bookId);
  };

  useEffect(() => {
    if (activeBookId) {
      getBookData(activeBookId!).then((books) => {
        setActiveBookData(books);
      });
    }
  }, [activeBookId]);

  return (
    <div className="App">
      <div className="container">
        <h1 className="logo">
          Pim<span>Book</span>
        </h1>

        <SearchPanel openBookDetails={openBookDetails} />
        <BookDetails {...activeBookData} />
      </div>
    </div>
  );
};

export default App;
