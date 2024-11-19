const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchMoviesByTitle = async (title) => {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${title}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.Response === "True") {
      return data.Search;
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    alert("There was an issue fetching movies. Please try again later.");
    throw error;
  }
};


