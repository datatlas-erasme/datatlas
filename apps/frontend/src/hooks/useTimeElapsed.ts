import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

// 2 options with luxon to display a human state modified time. toRelative to have a more specific time of modified, or toRelativeCalendar to have a friendly human value.

const useTimeElapsed = (createdAt) => {
  const [timeElapsed, setTimeElapsed] = useState<string | null>(null);

  useEffect(() => {
    const now = DateTime.now();
    const timeElapsed = DateTime.fromISO(createdAt);
    setTimeElapsed(timeElapsed.toRelative({ base: now, locale: 'fr' }));
  }, [createdAt]);
  return timeElapsed;
};
export default useTimeElapsed;
