import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import itemsData from "../dataset.json";
import { useUserLocation } from "../hooks/useUserLocation";
import { useEffect, useMemo, useState } from "react";
import { Logo } from "../components/Logo";
import { treeMarker, userMarker } from "../components/markers";
import SearchInput from "../components/Search";
import { MdOutlineMyLocation } from "react-icons/md";
import Modal from "../components/Modal";

export interface Place {
    display_name?: string;
    lat?: number;
    lon?: number;
}

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
    const [location, setLocation] = useState<Place | null>(null)
    const [isOpen, setIsOpen] = useState(false);

    const currentLocation: [number, number] = useMemo(() => {
        if (location?.lat && location?.lon) {
            return [Number(location.lat), Number(location.lon)]
        }

        if (position) {
            return position
        }

        return [51.505, -0.09]
    }, [location, position])

    return (
        <div className="h-screen relative flex items-center">
            <MapContainer center={currentLocation} zoom={13} zoomControl={false} className="w-full h-screen">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {position && <Marker position={position} icon={userMarker()} />}
                <FlyToUserLocation position={currentLocation} />
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
            <div className="absolute top-0 left-0 flex justify-center items-center p-4 w-full z-[400]">
                <SearchInput setLocation={setLocation} />
            </div>
            <div className="w-full fixed bottom-0 left-0 z-[400] flex justify-center items-center">
                <button onClick={() => setIsOpen(true)}>
                    <Logo />
                </button>
            </div>
            <div className="absolute top-1/2 right-2 bg-white box-shadow p-2 rounded-lg z-[400] flex justify-center items-center">
                <button onClick={() => setLocation(null)}>
                    <MdOutlineMyLocation size={30} />
                </button>
            </div>

            <Modal setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
    );
};

export default MapPage;
