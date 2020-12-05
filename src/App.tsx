import React from "react";
import "./App.scss";
import SearchPanel from "./components/SearchPanel";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <SearchPanel />
      </div>
    </div>
  );
};

export default App;
