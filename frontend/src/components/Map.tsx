import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import itemsData from "../dataset.json";
import { treeMarker, userMarker } from "./markers";
import { useUserLocation } from "../hooks/useUserLocation";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Logo } from "./Logo";
import TreeCard from "./TreeCard";

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

const Map = () => {
  const { position } = useUserLocation();
  const [location, setLocation] = useState<string>("");

  const [selectedTree, setSelectedTree] = useState<TreeData | null>(null);

  const handleMarkerClick = (item: TreeData) => {
    setSelectedTree(item);
  };

  const handleCloseModal = () => {
    setSelectedTree(null);
  };

  return (
    <div className="h-screen relative">
      <MapContainer center={position ?? [51.505, -0.09]} zoom={13} id="map" zoomControl={false} className="h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {position && <Marker position={position} icon={userMarker()} />}
        <FlyToUserLocation position={position} />

        {itemsData.map(item => {
          const isBadCondition = item.Stato !== "Buono";
          return (
            <Marker
              key={item.ID}
              position={[item.Latitudine, item.Longitudine]}
              icon={treeMarker(isBadCondition)}
              eventHandlers={{
                click: () => handleMarkerClick(item),
              }}
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
            onChange={e => setLocation(e.currentTarget.value)}
            className="w-full rounded-full p-4 box-shadow placeholder:italic font-medium outline-none"
          />
          <button className="absolute top-[11px] right-5">
            <IoIosSearch color="#878585" size={35} />
          </button>
        </div>
      </div>

      <div className="h-auto w-full absolute bottom-0 left-0 z-[999] flex justify-center items-center mb-4">
        <button>
          <Logo />
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

export default Map;
