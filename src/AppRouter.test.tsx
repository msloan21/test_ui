import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import AppRouter from './AppRouter';

jest.mock('react-router-dom', () => {
	return {
		Navigate: () => <p>Mocked navigate</p>,
		createBrowserRouter: jest.fn(),
		RouterProvider: () => <p>Mocked Router Provider</p>,
	};
});

describe('AppRouter', () => {
	const amplify = require('aws-amplify');
	beforeEach(() => {
		console.error = jest.fn();
		amplify.__setSessionSucceed();
	});

	it('renders app router', async () => {
		render(<AppRouter />);

		await waitFor(() => {
			const x = screen.getByText('Mocked Router Provider');
			expect(x).toBeInTheDocument();
		});
	});

	it('handles an error obtaining the cognito session', async () => {
		amplify.__setSessionFail();

		render(<AppRouter />);

		await waitFor(() => {
			const x = screen.getByText('Mocked Router Provider');
			expect(x).toBeInTheDocument();
		});
	});
});
