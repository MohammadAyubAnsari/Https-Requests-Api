import React, { useState } from "react";
import classes from "./AddMovie.module.css";

const AddMovie = () => {
  const [title, settitle] = useState("");
  const [openingText, setopeningText] = useState("");
  const [date, setdate] = useState("");

  const handleform = (e) => {
    e.preventDefault();

    const data = {
      Title: title,
      OpeningText: openingText,
      Date: new Date(date),
    };

    console.log(data);
    settitle("");
    setdate("");
    setopeningText("");
  };

  return (
    <form onSubmit={handleform}>
      <div className={classes.section}>
        <div className={classes.input}>
          <div>
            <label htmlFor="title">Title:</label>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
        </div>
        <div>
          <div>
            <label htmlFor="opening-text">Opening Text:</label>
          </div>
          <input
            type="text"
            value={openingText}
            onChange={(e) => {
              setopeningText(e.target.value);
            }}
          />
        </div>
        <div>
          <div>
            <label htmlFor="release-date">Release Date:</label>
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setdate(e.target.value);
            }}
          />
        </div>
        <button type="submit">Add Movie</button>
      </div>
    </form>
  );
};

export default AddMovie;
