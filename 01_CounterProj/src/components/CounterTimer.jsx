import React from 'react'
import { useState,useEffect } from 'react';
import './CounterTimer.css'


const CounterTimer = () => {
    const [time, setTime] = useState(0);

    const [isActive, setisActive] = useState(false);
    const [isPause, setisPause] = useState(false);

    

    const handleInput = (event) => {
        const minute = parseInt(event.target.value);

        if(minute > 0) {
            setTime(minute * 60);
        }
        else{
            setTime(0);
        }
    }


    const formatTime = () => {
        const min = String(Math.floor(time / 60)).padStart(2,'0');  // convert sec to min
        const sec = String(time % 60).padStart(2,'0');

        return `${min} : ${sec}`;
    }


    const handleStartButton = () => {
        setisActive(true);
        setisPause(false);
    }

    const handlePauseButton = () => {
        setisPause(!isPause);
    }

    const handleResetButton = () => {
        setisActive(false);
        setisPause(false);
        setTime(0);
    }

    useEffect(() => {
        let timer;
        if(isActive && !isPause && time > 0) {
             timer = setInterval(() => {
                setTime((prev) => prev - 1)
            }, 1000)
        }

       if(time === 0) {
            clearInterval(timer);
            setisActive(false);
            alert("time is up")
        }

        return () => clearInterval(timer);

    },[isActive,isPause,time]);

  return (
    <div className='countdown-timer'>
       <h1>countdown Timer</h1>

       <div className='timer-display'>
            <input 
            type='number'
            placeholder='Enter the time in minutes'
            min="0"
            onChange = {handleInput}
            />

            <div>
                {formatTime()}
            </div>
       </div>

       <div className='timer-controls'>
        <button onClick={handleStartButton} disabled = {isActive && !isPause}>Start</button>
        <button onClick={handlePauseButton} disabled={!isActive}>{isPause ? 'Resume' : 'Pause'}</button>
        <button onClick={handleResetButton}>Reset</button>
       </div>

    </div>
  )
}

export default CounterTimer