import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [time, setTime] = useState("");
  const [isStart, setIsStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  //Function to handle start button
  const handleStart = () => {
    console.log("Handle start called");
    setIsStart(true);
    setIsPaused(false);
  };

  //Function to handle pause button
  const handlePause = () => {
    console.log("Handle Pause called");
    setIsPaused(!isPaused);
  };

  //Function to format Time
  const formatTime = () => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  useEffect(() => {
    let interval = null;
    let count = time;

    if (isStart && !isPaused) {
      interval = setInterval(() => {
        console.log("Set Interval called");
        if (count > 0) {
          count = count - 1;
          setTime((prevTime) => prevTime - 1);
        } else {
          console.log("Clear Interval called");
          clearInterval(interval);

          setTimeout(() => {
            setIsStart(false);
          }, 1500);
        }
      }, 1000);
    } else {
      console.log("Clear Interval called");
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isStart, isPaused]);

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "40vh" }}>
      <h1>CountDown Timer</h1>
      {!isStart && (
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        ></input>
      )}

      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Stop</button>
      </div>
      {isStart && <h1>{formatTime()}</h1>}
      {time == 0 && isStart && <h3>TIME'S UP!!</h3>}
    </div>
  );
};

export default CountdownTimer;
