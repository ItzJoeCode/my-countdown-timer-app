import React, { useState, useEffect } from 'react';
import styles from './CountdownTimer.module.css';

const CountdownTimer: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [pauseText, setPauseText] = useState<string>('Start');

  useEffect(() => {
    let countdown: NodeJS.Timeout;

    if (timerRunning) {
      countdown = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(countdown);
            setTimerRunning(false);
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [timerRunning]);

  const startOrPauseTimer = () => {
    if (timerRunning) {
      setTimerRunning(false);
      setPauseText('Continue');
    } else {
      setTimerRunning(true);
      setPauseText('Pause');
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${padZero(minutes)} min : ${padZero(seconds)} sec`;
  };

  const padZero = (num: number): string => {
    return num < 10 ? `0${num}` : num.toString();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setTime(value);
  };

  return (
    <div>
      <h1 className={styles.heading}>Countdown Timer</h1>
      <div className={styles.container}>
        <div className={styles['input-container']}>
          <input
            type="number"
            placeholder="Enter time in seconds"
            value={time}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles['buttons-container']}>
          <button onClick={startOrPauseTimer}>{pauseText}</button>
        </div>
        <div className={styles.timer}>{formatTime(time)}</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
