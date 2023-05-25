import React from 'react';
import { render, screen } from '@testing-library/react';
import Map from './Map';

jest.mock('react-leaflet', () => {
	return {
		MapContainer: () => (
			<>
				<p>Mocked map container</p>
			</>
		),
	};
});

describe('Map', () => {
	it('handles displaying map', async () => {
		render(
			<Map
				defaultCoordinates={{ latitude: 38.82689, longitude: -76.90846 }}
				locations={[
					{
						id: 123,
						name: 'Office 1',
						coordinates: { latitude: 38.82688, longitude: -76.50847 },
					},
				]}
			/>
		);

		const map = screen.getByText(/Mocked map container/i);
		expect(map).toBeInTheDocument();
	});
});
