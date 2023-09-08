import React from "react";
import Part from "./Part";
import TotalSum from "./TotalSum";

const Content = ({parts}) => {

    const exerciseArray = parts.map(part => part.exercises); 
    const sumOfExercises = exerciseArray.reduce((total, current) => total + current, 0);
    console.log(`The sum of exercises is: ${sumOfExercises}`);

  return (
    <>
      {parts.map(data => <Part name={data.name} exercises={data.exercises} key={data.id}/>)}
      <TotalSum sum={sumOfExercises}/>
    </>
  );
};

export default Content;
