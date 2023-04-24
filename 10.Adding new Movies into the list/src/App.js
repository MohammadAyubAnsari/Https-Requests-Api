import React, { useCallback, useState, useEffect } from "react";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryTimer, setRetryTimer] = useState();
  const [check, setCheck] = useState(false);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
      setCheck(true);

      const retry_timer = setTimeout(() => {
        fetchMoviesHandler();
      }, 5000);
      setRetryTimer(retry_timer);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>Something went wrong ....Retrying.</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  const handleCancelRetry = () => {
    clearTimeout(retryTimer);
    setCheck(false);
  };

  return (
    <React.Fragment>
      <AddMovie />
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        <button onClick={handleCancelRetry}>STOP RETRYING</button>
        {!check && !isLoading && error && (
          <center>
            <p>Nothing to show...</p>
          </center>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
