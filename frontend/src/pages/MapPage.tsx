import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import itemsData from "../dataset.json";
import { useUserLocation } from "../hooks/useUserLocation";
import { useEffect, useMemo, useState } from "react";
import { Logo } from "../components/Logo";
import { treeMarker, userMarker } from "../components/markers";
import SearchInput from "../components/Search";
import { MdOutlineMyLocation } from "react-icons/md";
import TreeCard from "../components/TreeCard";

export interface Place {
    display_name?: string;
    lat?: number;
    lon?: number;
}

interface TreeData {
    ID: number;
    Tipo: string;
    Nome: string;
    Latitudine: number;
    Longitudine: number;
    Stato: string;
    "Ultima Segnalazione": string;
}

const FlyToUserLocation = ({ position }: { position: [number, number] | null }) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(position, 13);
        }
    }, [position, map]);

    return null;
};

const MapPage = () => {
    const { position } = useUserLocation();
    const [location, setLocation] = useState<Place | null>(null);
    const [selectedTree, setSelectedTree] = useState<TreeData | null>(null);

    const currentLocation: [number, number] = useMemo(() => {
        if (location?.lat && location?.lon) {
            return [Number(location.lat), Number(location.lon)];
        }

        if (position) {
            return position;
        }

        return [51.505, -0.09];
    }, [location, position]);

    const handleCloseModal = () => {
        setSelectedTree(null);
    };

    return (
        <div className="h-screen relative flex items-center">
            <MapContainer center={currentLocation} zoom={13} zoomControl={false} className="w-full h-screen">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {position && <Marker position={position} icon={userMarker()} />}
                <FlyToUserLocation position={currentLocation} />
                {itemsData.map(item => {
                    const isBadCondition = item.Stato !== "Buono";
                    return (
                        <Marker
                            key={item.ID}
                            position={[item.Latitudine, item.Longitudine]}
                            icon={treeMarker(isBadCondition)}
                            eventHandlers={{
                                click: () => setSelectedTree(item),
                            }}
                        />
                    );
                })}
            </MapContainer>

            <div className="absolute top-0 left-0 flex justify-center items-center p-4 w-full z-[999]">
                <SearchInput setLocation={setLocation} />
            </div>

            <div className="w-full fixed bottom-0 left-0 z-[999] flex justify-center items-center">
                <button>
                    <Logo />
                </button>
            </div>

            <div className="absolute top-1/2 right-2 bg-white box-shadow p-2 rounded-lg z-[999] flex justify-center items-center">
                <button onClick={() => setLocation(null)}>
                    <MdOutlineMyLocation size={30} />
                </button>
            </div>

            {selectedTree && (
                <TreeCard
                    tipo={selectedTree.Tipo}
                    nome={selectedTree.Nome}
                    stato={selectedTree.Stato}
                    ultimaSegnalazione={selectedTree["Ultima Segnalazione"]}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default MapPage;
