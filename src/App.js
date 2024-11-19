import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieSearchPage from "./components/Moviesearch";
import LoginPage from "./components/Login";
import WatchlistPage from "./components/WatchList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<MovieSearchPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
