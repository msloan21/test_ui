import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';

interface Coordinates {
	latitude: number;
	longitude: number;
}

interface Locations {
	id?: number;
	name?: string;
	coordinates: Coordinates;
}

interface MapProps {
	defaultCoordinates?: Coordinates;
	locations?: Locations[];
}

const Map: React.FC<MapProps> = ({ defaultCoordinates, locations }) => {
	const [mockLocations, setMockLocations] = useState<Locations[]>([
		{
			id: 123,
			name: 'Office 1',
			coordinates: { latitude: 38.82688, longitude: -76.50847 },
		},
		{
			id: 1234,
			name: 'Office 2',
			coordinates: { latitude: 38.82685, longitude: -76.90842 },
		},
	]);
	const [mockDefaultCoordinates, setMockDefaultCoordinates] =
		useState<Coordinates>({ latitude: 38.82689, longitude: -76.90846 });
	const tileLayerURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

	useEffect(() => {
		defaultCoordinates && setMockDefaultCoordinates(defaultCoordinates);
		locations && setMockLocations(locations);
	}, [locations, defaultCoordinates]);

	return (
		<>
			<MapContainer
				center={[
					mockDefaultCoordinates.latitude,
					mockDefaultCoordinates.longitude,
				]}
				zoom={12}
				scrollWheelZoom={false}
			>
				<TileLayer url={tileLayerURL} />
				{mockLocations.map((location) => (
					<Marker
						key={location.id}
						position={[
							location.coordinates.latitude,
							location.coordinates.longitude,
						]}
						icon={new Icon({ iconUrl: markerIconPng })}
					/>
				))}
			</MapContainer>
		</>
	);
};

export default Map;
