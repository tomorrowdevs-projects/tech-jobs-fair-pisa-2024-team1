import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useUserLocation } from '../hooks/useUserLocation';
import { useEffect, useMemo, useState } from 'react';
import { Logo } from '../components/Logo';
import { treeMarker, userMarker } from '../components/markers';
import SearchInput from '../components/Search';
import { MdOutlineMyLocation } from 'react-icons/md';
import Modal from '../components/Modal';
import { useReports } from '../hooks/useReports';
import TreeCard from '../components/TreeCard';
import { Report } from '../types';
import RoutingMachine from '../components/RoutingMachine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

export interface Place {
  display_name?: string;
  lat?: number;
  lon?: number;
}

const FlyToUserLocation = ({
  position,
}: {
  position: [number, number] | null;
}) => {
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
  const { allReports, findReports } = useReports();
  const [location, setLocation] = useState<Place | null>(null);
  const [selectedTree, setSelectedTree] = useState<Report | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigate, setIsNavigate] = useState<boolean>(false);

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
    setIsNavigate(false);
  };

  const handleNavigate = () => {
    setIsNavigate(true);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
    handleCloseModal();
  };

  useEffect(() => {
    findReports();
  }, []);

  return (
    <div className="h-screen relative flex items-center max-w-md">
      <MapContainer
        center={currentLocation}
        zoom={13}
        zoomControl={false}
        className="w-full h-screen"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {position && <Marker position={position} icon={userMarker()} />}
        <FlyToUserLocation position={currentLocation} />

        {position && selectedTree && isNavigate && (
          <RoutingMachine
            start={position}
            end={[
              Number(selectedTree.latitudine),
              Number(selectedTree.longitudine),
            ]}
          />
        )}

        {allReports.map((report) => {
          const isBadCondition = report.stato !== 'Buono';
          return (
            <Marker
              key={report.id}
              position={[Number(report.latitudine), Number(report.longitudine)]}
              icon={treeMarker(isBadCondition)}
              eventHandlers={{
                click: () => {
                  setSelectedTree(report);
                  setIsNavigate(false);
                },
              }}
            />
          );
        })}
      </MapContainer>

      <div className="absolute top-0 left-0 flex justify-center items-center p-4 w-full z-[400]">
        <SearchInput
          setLocation={setLocation}
          includeIcon
          className="w-full rounded-full p-4 box-shadow placeholder:italic font-medium outline-none"
        />
      </div>

      <div className="w-full fixed bottom-0 left-0 z-[400] flex justify-center items-center">
        <button onClick={() => setIsOpen(true)}>
          <Logo />
        </button>
      </div>

      <div className="absolute top-1/2 right-4 bg-white box-shadow p-2 rounded-md z-[400] flex justify-center items-center">
        <button
          onClick={() =>
            setLocation(
              position ? { lat: position[0], lon: position[1] } : null
            )
          }
        >
          <MdOutlineMyLocation size={30} />
        </button>
      </div>

      <Modal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        selectedTree={selectedTree}
      />

      {selectedTree && (
        <TreeCard
          selectedTree={selectedTree}
          onClose={handleCloseModal}
          onNavigate={handleNavigate}
          onOpenModal={handleOpenModal}
        />
      )}
    </div>
  );
};

export default MapPage;
