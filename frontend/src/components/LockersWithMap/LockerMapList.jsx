import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

function LockerMapList() {

  const [lockers, setLockers] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/locker`)
      .then(res => res.json())
      .then(data => setLockers(data.lockers))
      .catch(err => alert(err));
  }, []);

  // Szűrt lista
  const filteredLockers = lockers.filter(loc => {
    const lat = parseFloat(loc.lat);
    const lon = parseFloat(loc.lon);
    if (isNaN(lat) || isNaN(lon)) return false;

    return (
      loc.locker_name?.toLowerCase().includes(query.toLowerCase()) ||
      loc.address?.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-200 p-4">
      {/* Oldalsáv keresővel */}
      <div className="w-80 bg-white rounded-2xl shadow-xl p-6 mr-4 h-fit sticky top-4 self-start">
        <h2 className="text-xl font-bold mb-4 text-primary">Keresés</h2>
        <input
          type="text"
          placeholder="Keresés név vagy cím alapján..."
          className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Találatok: {filteredLockers.length}</h3>
          <ul className="text-sm space-y-2 max-h-64 overflow-y-auto">
            {filteredLockers.map(loc => (
              <li key={loc.id} className="border-b pb-1">
                <div className="font-semibold">{loc.locker_name}</div>
                <div className="text-gray-500">{loc.address}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Térkép */}
      <div className="flex-1 max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden border-primary border-2">
        <div className="p-6 border-b bg-base-100 text-primary">
          <h1 className="text-2xl font-bold text-center">Elérhető csomagautomaták</h1>
        </div>
        <div className="h-[80vh]">
          <MapContainer
            center={[47.1625, 19.5033]}
            zoom={7}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap & CartoDB'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <MarkerClusterGroup>
              {filteredLockers.map(loc => {
                const lat = parseFloat(loc.lat);
                const lon = parseFloat(loc.lon);

                if (isNaN(lat) || isNaN(lon)) return null;

                return (
                  <Marker
                    key={loc.id}
                    position={[lat, lon]}
                  >
                    <Popup autoClose={false} closeOnClick={false}>
                      <div className="text-center bg-black text-white p-4 rounded-lg">
                        <h2 className="font-bold text-lg mb-1">{loc.locker_name}</h2>
                        <p className="text-gray-300">{loc.description}</p>
                        <p className="text-gray-400 text-sm">{loc.address}</p>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      </div>
    </div>
  )
}

export default LockerMapList
