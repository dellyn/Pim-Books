import React, { useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import SearchPanel from "./components/SearchPanel";
import BookDetails from "./components/BookDetails";

const App = () => {
  const [activeBookId, setActiveBookId] = useState<string | null>(null);

  const openBookDetails = (bookId: string) => {
    setActiveBookId(bookId);
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <h1 className="logo">
              Pim<span>Book</span>
            </h1>
            <SearchPanel openBookDetails={openBookDetails} />
          </Route>

          <Route path="/book/:id">
            <BookDetails activeBookId={activeBookId} />
          </Route>
          <Route>page not found</Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
