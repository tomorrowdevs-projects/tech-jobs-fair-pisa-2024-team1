export const getStoredPosition = (): [number, number] | null => {
  const stored = localStorage.getItem('userPosition');
  return stored ? JSON.parse(stored) : null;
};

export const requestPosition = (
  setPosition: (value: [number, number]) => void,
  setLocationAllowed: (value: boolean) => void
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        const newPosition: [number, number] = [latitude, longitude];
        setPosition(newPosition);
        localStorage.setItem('userPosition', JSON.stringify(newPosition));
        setLocationAllowed(true); // User allowed location access
      },
      (error) => {
        console.error('Unable to retrieve your location', error);
        setLocationAllowed(false); // User denied location access
      }
    );
  }
};
