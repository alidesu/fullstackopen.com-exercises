import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onclickFunction}>{props.text}</button>;
};

const StatisticLineText = (props) => {
  return (
    <>
      <p>{props.text}</p>
    </>
  );
};

const StatisticLineValue = (props) => {
  return (
    <>
      <p>{props.value}</p>
    </>
  );
};

const Statistics = (props) => {
  const { good, bad, neutral, all } = props;

  if (props.all === 0) {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <h2>statistics</h2>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <StatisticLineText text={"good"} />
              </td>
              <td>
                <StatisticLineValue value={good} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLineText text={"neutral"} />
              </td>
              <td>
                <StatisticLineValue value={neutral} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLineText text={"bad"} />
              </td>
              <td>
                <StatisticLineValue value={bad} />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <StatisticLineText text={"all "} />
              </td>
              <td>
                <StatisticLineValue value={all} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLineText text={"average"} />
              </td>
              <td>
                <StatisticLineValue value={(good - bad) / all} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLineText text={"positive"} />
              </td>
              <td>
                <StatisticLineValue value={(good / all) * 100 + " %"} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    console.log("Updated Good: ", good);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    console.log("Updated Neutral: ", neutral);
  };

  const handleBad = () => {
    setBad(bad + 1);
    console.log("Updated Bad: ", bad);
  };

  const all = good + bad + neutral;

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button onclickFunction={handleGood} text={"good"} />
        <Button onclickFunction={handleNeutral} text={"neutral"} />
        <Button onclickFunction={handleBad} text={"bad"} />
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} />
    </div>
  );
};

export default App;
