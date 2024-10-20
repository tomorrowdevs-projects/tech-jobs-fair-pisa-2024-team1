import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import itemsData from "../dataset.json";
import { treeMarker, userMarker } from "./markers";
import { useUserLocation } from "../hooks/useUserLocation";
import { useEffect } from "react";

const FlyToUserLocation = ({ position }: { position: [number, number] | null }) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(position, 13);
        }
    }, [position, map]);

    return null;
}

const Map = () => {
    const { position } = useUserLocation();

    return (
        <div className="relative h-screen">
            <MapContainer center={position ?? [51.505, -0.09]} zoom={13} id="map" zoomControl={false} className="h-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {position && <Marker position={position} icon={userMarker()} />}
                <FlyToUserLocation position={position} />
                {itemsData.map((item) => {
                    const isBadCondition = item.Stato !== "Buono";
                    return (
                        <Marker
                            key={item.ID}
                            position={[item.Latitudine, item.Longitudine]}
                            icon={treeMarker(isBadCondition)}
                        />
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default Map;
