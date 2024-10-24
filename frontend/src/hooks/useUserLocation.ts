import { useEffect, useState } from 'react';
import { getStoredPosition, requestPosition } from '../utils';

export const useUserLocation = () => {
  const [position, setPosition] = useState<[number, number] | null>(
    getStoredPosition()
  );
  const [locationAllowed, setLocationAllowed] = useState<boolean>(true);
  const [permissionState, setPermissionState] =
    useState<PermissionState>('prompt');

  useEffect(() => {
    requestPosition(setPosition, setLocationAllowed);

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      setPermissionState(result.state);
      if (result.state === 'granted') {
        requestPosition(setPosition, setLocationAllowed);
      } else if (result.state === 'denied') {
        setPosition(null);
        setLocationAllowed(false);
      }
    });

    const intervalId = setInterval(() => {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted' && permissionState !== 'granted') {
          requestPosition(setPosition, setLocationAllowed);
          setPermissionState('granted');
        } else if (result.state === 'denied' && permissionState === 'granted') {
          setPosition(null);
          setLocationAllowed(false);
          setPermissionState('denied');
        }
      });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [permissionState]);

  return {
    position,
    locationAllowed,
  };
};
