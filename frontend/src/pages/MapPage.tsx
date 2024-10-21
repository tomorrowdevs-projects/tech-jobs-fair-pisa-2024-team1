import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import itemsData from "../dataset.json";

import { useUserLocation } from "../hooks/useUserLocation";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Logo } from "../components/Logo";
import { treeMarker, userMarker } from "../components/markers";


const FlyToUserLocation = ({ position }: { position: [number, number] | null }) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(position, 13);
        }
    }, [position, map]);

    return null;
}

const MapPage = () => {
    const { position } = useUserLocation();
    const [location, setLocation] = useState<string>("")

    return (
        <div className="h-screen relative flex items-center">
            <MapContainer center={position ?? [51.505, -0.09]} zoom={13} zoomControl={false} className="w-full h-screen">
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
            <div className="absolute top-0 left-0 flex justify-center items-center p-4 w-full z-[999]">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search location ..."
                        value={location}
                        onChange={(e) => setLocation(e.currentTarget.value)}
                        className="w-full rounded-full p-4 box-shadow placeholder:italic font-medium outline-none"
                    />
                    <button className="absolute top-[11px] right-5">
                        <IoIosSearch color="#878585" size={35} />
                    </button>
                </div>
            </div>
            <div className="w-full fixed bottom-0 left-0 z-[999] flex justify-center items-center">
                <button>
                    <Logo />
                </button>
            </div>
        </div>
    );
};

export default MapPage;