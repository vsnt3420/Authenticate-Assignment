import React, { useEffect, useState } from "react";
import {
  BsBookmarkDashFill,
  BsFillBookmarkPlusFill,
  BsThreeDots,
} from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { fetchMoviesByTitle } from "../api/search";

const MovieSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [myList, setMyList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("myWatchlist")) || [];
    setMyList(savedList);
  }, []);

  const fetchMovies = async () => {
    if (!searchTerm.trim()) return;
    try {
      const movieResults = await fetchMoviesByTitle(searchTerm);
      setMovies(movieResults || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleAddToWatchlist = (movie) => {
    const userEmail = localStorage.getItem("userEmail");
    const currentWatchlist =
      JSON.parse(localStorage.getItem(`watchlist_${userEmail}`)) || [];
    const isAlreadyAdded = currentWatchlist.some(
      (item) => item.imdbID === movie.imdbID
    );

    if (isAlreadyAdded) {
      alert(`${movie.Title} is already in your watchlist!`);
      return;
    }

    const updatedList = [...currentWatchlist, movie];
    localStorage.setItem(`watchlist_${userEmail}`, JSON.stringify(updatedList));
    alert(`${movie.Title} added to your watchlist!`);
    navigate("/watchlist");
  };

  const handleRemoveFromWatchlist = (movie) => {
    const updatedList = myList.filter((item) => item.imdbID !== movie.imdbID);
    setMyList(updatedList);
    localStorage.setItem("myWatchlist", JSON.stringify(updatedList));
    alert(`${movie.Title} removed from your watchlist!`);
  };

  const userEmail = localStorage.getItem("userEmail");

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
        <h1 className="text-xl font-bold text-red-500">Watchlists</h1>
        <button
          className="text-gray-700"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu size={24} />
        </button>
      </div>

      <div className="flex flex-1">
        <aside
          className={`z-10 fixed inset-y-0 left-0 bg-white shadow-lg w-64 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative`}
        >
          <div className="p-4 flex flex-col justify-between min-h-full">
            <div>
              <h1 className="text-2xl font-bold text-red-500 mb-6">
                Watchlists
              </h1>
              <div className="mb-4">
                <button
                  onClick={() => navigate("/search")}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <FaHome />
                  Home
                </button>
              </div>
              <div className="font-medium text-gray-700 mb-2">My Lists</div>

              <button
                onClick={() => navigate("/watchlist")}
                className="p-2 text-neutral-50 text-sm flex items-center gap-2 bg-red-500 rounded-md shadow-lg"
              >
                My Watchlist
              </button>
            </div>
            <div className="p-4 bg-neutral-100 shadow-lg flex justify-center items-center space-x-3">
              <span>{userEmail}</span>
              <BsThreeDots />
            </div>
          </div>
        </aside>

        <div className="flex-1 p-6">
          <header className="bg-white p-4 mb-6 shadow rounded-md border border-red-500 space-y-3">
            <h2 className="text-3xl font-bold">
              Welcome to <span className="text-red-500">Watchlists</span>
            </h2>
            <p className="text-gray-600 mt-2">
              Browse movies, add them to watchlists and share them with friends.
            </p>
          </header>

          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="Search movies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              onClick={fetchMovies}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Search
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie) => {
              const isInWatchlist = myList.some(
                (item) => item.imdbID === movie.imdbID
              );

              return (
                <div
                  key={movie.imdbID}
                  className="bg-white shadow rounded-lg flex flex-col"
                >
                  <div className="relative justify-center items-center">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-full h-64 object-fill rounded-lg "
                    />
                    {isInWatchlist ? (
                      <button
                        onClick={() => handleRemoveFromWatchlist(movie)}
                        className="absolute top-2 left-2 text-neutral-300 rounded-lg flex items-center justify-center "
                      >
                        <BsBookmarkDashFill className="w-8 h-8 text-white" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToWatchlist(movie)}
                        className="absolute top-2 left-2 text-neutral-300 rounded-lg flex items-center justify-center "
                      >
                        <BsFillBookmarkPlusFill className="w-8 h-8 text-white" />
                      </button>
                    )}
                  </div>
                  <div className="px-4 py-2 mt-4 text-start">
                    <h3 className="font-bold text-lg">{movie.Title}</h3>
                    <p className="text-gray-600">{movie.Year}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSearchPage;
