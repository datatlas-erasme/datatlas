import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const useTimeElapsed = (createdAt) => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const now = DateTime.now().plus({ days: 1 });
    const timeElapsed = DateTime.fromISO(createdAt);
    setTimeElapsed(timeElapsed.toRelativeCalendar({ base: now, unit: 'day', locale: 'fr' }));
  }, [createdAt]);
  return <p className={'status'}>Projet modifié {timeElapsed}</p>;
};
export default useTimeElapsed;
