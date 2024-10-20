import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { DivIcon } from "leaflet";
import itemsData from "../dataset.json"

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"
});

const getStoredPosition = (): [number, number] | null => {
    const stored = localStorage.getItem('userPosition');
    return stored ? JSON.parse(stored) : null;
};

const createCustomMarker = (): DivIcon => {
    return L.divIcon({
        className: "custom-marker",
        html: `
            <div class="relative flex items-center justify-center">
                <div class="absolute h-8 w-8 bg-blue-300 rounded-full opacity-75 animate-ping"></div>
                <div class="relative h-4 w-4 bg-blue-500 rounded-full z-10"></div>
            </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    });
};

const treeCustomMarker = (colorClass: string): DivIcon => {
    return L.divIcon({
        className: "custom-marker",
        html: `
            <div class="relative flex items-center justify-center">
                <div class="relative h-5 w-5 ${colorClass} rounded-full z-10"></div>
            </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    });
};

interface MarkerProps {
    position: [number, number] | null
    setPosition: (value: [number, number]) => void
}

const LocationMarker = ({ position, setPosition }: MarkerProps) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(position, 13);
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (location) => {
                    const { latitude, longitude } = location.coords;
                    const newPosition: [number, number] = [latitude, longitude];
                    setPosition(newPosition);
                    map.flyTo(newPosition, 13);
                    localStorage.setItem('userPosition', JSON.stringify(newPosition));
                },
                (error) => {
                    console.error("Unable to retrieve your location", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by your browser");
        }
    }, [map, position]);

    return position === null ? null : <Marker position={position} icon={createCustomMarker()} />;
};

const Map = () => {
    const [position, setPosition] = useState<[number, number] | null>(getStoredPosition());

    return (
        <div className="relative h-screen">
            <MapContainer center={position ?? [51.505, -0.09]} zoom={13} id="map" zoomControl={false} className="h-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker position={position} setPosition={setPosition} />
                {itemsData.map((item: any) => {
                    const colorClass = item.Stato === "Buono" ? "bg-green-500" : "bg-red-500";
                    return (
                        <Marker
                            key={item.ID}
                            position={[item.Latitudine, item.Longitudine]}
                            icon={treeCustomMarker(colorClass)}
                        />
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default Map;