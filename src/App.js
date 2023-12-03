import Table from "./components/Table";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Count from "./context/count";
import React, { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="App">
      <Count.Provider value={[currentPage, setCurrentPage]}>
        <Table />
      </Count.Provider>
    </div>
  );
}

export default App;
