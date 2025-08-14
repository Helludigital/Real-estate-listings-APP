import { useState, useEffect } from 'react';

export default function useSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  useEffect(() => { /* could hydrate from storage later */ }, []);
  return { notificationsEnabled, setNotificationsEnabled };
}
