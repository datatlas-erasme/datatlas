import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const UseTimeElapsed = (createdAt) => {
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [elapsedHours, setElapsedHours] = useState(0);
  const [elapsedDays, setElapsedDays] = useState(0);

  useEffect(() => {
    const startTime = DateTime.fromISO(createdAt);
    const currentTime = DateTime.now();
    const elapsed = currentTime.diff(startTime, ['days', 'hours', 'minutes']).toObject();
    setElapsedDays(Math.floor(elapsed.days));
    setElapsedHours(Math.floor(elapsed.hours));
    setElapsedMinutes(Math.floor(elapsed.minutes));
  }, [createdAt]);
  return (
    <p className={'status'}>
      Modifié il y a {elapsedDays > 0 && `${elapsedDays} jour${elapsedDays > 1 ? 's' : ''} `}
      {elapsedHours > 0 && `${elapsedHours} heure${elapsedHours > 1 ? 's' : ''} `}
      {elapsedMinutes > 0 && `${elapsedMinutes} minute${elapsedMinutes > 1 ? 's' : ''} `}
      {elapsedMinutes === 0 && "moins d'une minute"}
    </p>
  );
};

export default UseTimeElapsed;
