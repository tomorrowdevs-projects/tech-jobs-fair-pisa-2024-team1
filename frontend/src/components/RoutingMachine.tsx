import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';

interface RoutingMachineProps {
  start: [number, number];
  end: [number, number];
}

const RoutingMachine = ({ start, end }: RoutingMachineProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      routeWhileDragging: true,
      plan: new L.Routing.Plan(
        [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
        {
          createMarker: () => {
            return false
          }
        }
      ),
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: '#3b82f6', weight: 3 }],
        extendToWaypoints: false,
        missingRouteTolerance: 0
      },
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, start, end]);

  return null;
};

export default RoutingMachine;
