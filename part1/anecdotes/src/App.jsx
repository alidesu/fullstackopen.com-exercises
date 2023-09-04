import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  

  const anecdoteHandler = () => {
    const randomNumber = Math.floor(Math.random() * 8);
    setSelected(randomNumber);
  };

  const increaseVotesHandler = () => {
    setPoints((prevPoints) => {
      const newPoints = [...prevPoints];
      newPoints[selected] += 1;
      return newPoints;
    });
  };

  console.log(points);

  const maxVotes = points.indexOf(Math.max(...points))


  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <div>
        <button onClick={increaseVotesHandler}>vote</button>
        <button onClick={anecdoteHandler}>new anecdote</button>
      </div>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[maxVotes]}</div>
    </>
  );
};

export default App;
