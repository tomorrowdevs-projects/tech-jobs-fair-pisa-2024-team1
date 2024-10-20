import { useEffect, useState } from "react";
import { getStoredPosition, requestPosition } from "../utils";

export const useUserLocation = () => {
    const [position, setPosition] = useState<[number, number] | null>(getStoredPosition());
    const [locationAllowed, setLocationAllowed] = useState<boolean>(true);

    useEffect(() => {
        // Check the initial position when the component mounts
        requestPosition(setPosition, setLocationAllowed);

        // Poll every 5 seconds to check if location permission has changed
        const intervalId = setInterval(() => {
            navigator.permissions.query({ name: "geolocation" }).then((result) => {
                if (result.state === "granted") {
                    requestPosition(setPosition, setLocationAllowed);  // Request position again if permission has changed to "granted"
                } else if (result.state === "denied") {
                    setPosition(null);  // Reset position if permission is "denied"
                    setLocationAllowed(false);  // Update the flag accordingly
                    localStorage.removeItem("userPosition")
                }
            });
        }, 5000);  // Poll every 5 seconds

        return () => {
            clearInterval(intervalId);  // Clean up the interval when the component unmounts
        };
    }, []);

    return {
        position,
        locationAllowed,
    };
};
