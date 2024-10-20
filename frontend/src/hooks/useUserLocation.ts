import { useEffect, useState } from "react";
import { getStoredPosition, requestPosition } from "../utils";

export const useUserLocation = () => {
    const [position, setPosition] = useState<[number, number] | null>(getStoredPosition());
    const [locationAllowed, setLocationAllowed] = useState<boolean>(true);
    const [permissionState, setPermissionState] = useState<PermissionState>("prompt"); // Track permission state

    useEffect(() => {
        requestPosition(setPosition, setLocationAllowed)

        // Initial permission check
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
            setPermissionState(result.state);
            if (result.state === "granted") {
                requestPosition(setPosition, setLocationAllowed);  // If permission is already granted, get the position
            } else if (result.state === "denied") {
                setPosition(null);
                setLocationAllowed(false);
            }
        });

        // Poll every 5 seconds to check if location permission has changed
        const intervalId = setInterval(() => {
            navigator.permissions.query({ name: "geolocation" }).then((result) => {
                // Only recalculate position if permission changes from denied to granted
                if (result.state === "granted" && permissionState !== "granted") {
                    requestPosition(setPosition, setLocationAllowed);  // If permission has been granted, request the position
                    setPermissionState("granted");
                } else if (result.state === "denied" && permissionState === "granted") {
                    // Reset if permission changes from granted to denied
                    setPosition(null);
                    setLocationAllowed(false);
                    setPermissionState("denied");
                }
            });
        }, 5000);  // Poll every 5 seconds

        return () => {
            clearInterval(intervalId);
        };
    }, [permissionState]);

    return {
        position,
        locationAllowed,
    };
};
