import React, { useState, useEffect } from 'react';
import styles from './CountdownTimer.module.css';

const CountdownTimer: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [time, setTime] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('Start');

  useEffect(() => {
    let countdown: NodeJS.Timeout;

    if (timerRunning && time > 0) {
      countdown = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(countdown);
            setTimerRunning(false);
            setButtonText('Start');
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    } else if (time === 0) {
      setTimerRunning(false);
      setButtonText('Start');
    }

    return () => clearInterval(countdown);
  }, [timerRunning, time]);

  const handleStartPauseClick = () => {
    if (buttonText === 'Start' || buttonText === 'Continue') {
      if (buttonText === 'Start') {
        setTime(parseInt(inputValue));
        setInputValue('');
      }
      setButtonText('Pause');
      setTimerRunning(true);
    } else if (buttonText === 'Pause') {
      setButtonText('Continue');
      setTimerRunning(false);
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

  return (
    <div>
      <h1 className={styles.heading}>Countdown Timer</h1>
      <div className={styles.container}>
        <div className={styles['input-container']}>
          <input
            type="number" id='seconds'
            placeholder="Enter time in seconds"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className={styles['buttons-container']}>
          <button className={`${styles.button} ${timerRunning ? styles.pause : ''}`} onClick={handleStartPauseClick}>{buttonText}</button>
        </div>
        <div className={styles.timer}>{formatTime(time)}</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
