import React from "react";
import "./App.scss";
import SearchPanel from "./components/SearchPanel";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <h1 className="logo">
          Pim<span>Book</span>
        </h1>
        <SearchPanel />
      </div>
    </div>
  );
};

export default App;
