import React, { useState, useEffect } from 'react';

let interval;
const CountDown = ({ callData }) => {
  const timer = 30;
  const [isOff, setIsOff] = useState(true);
  const [sec, setSec] = useState(timer);

  useEffect(() => {
    if (!isOff) {
      interval = setInterval(() => {
        setSec((prev) => {
          if (prev <= 0) {
            callData();
            return timer;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOff]);

  const check = (prev) => {
    setIsOff((prev) => !prev);
    if (!isOff) {
      clearInterval(interval);
      setSec(timer);
    }
  };
  return (
    <div className='radio-container' onChange={(e) => check(e.target.value)}>
      <span>Every 30 seconds update:</span>
      <input type='radio' id='on' name='countdown' value='on' />
      <label forhtml='on'>On</label>
      <input
        type='radio'
        id='off'
        name='countdown'
        value='off'
        defaultChecked
      />
      <label forhtml='off'>Off</label>
      {!isOff && sec}
    </div>
  );
};

export default CountDown;
