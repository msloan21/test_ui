import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorPage from './ErrorPage';

jest.mock('react-router-dom', () => {
	return {
		useRouteError: jest.fn(),
	};
});

describe('Error Page', () => {
	beforeEach(() => {
		console.error = jest.fn();
	});

	it('renders error page', () => {
		render(<ErrorPage />);
		const textElement = screen.getByText(/Sorry, an unexpected error has/i);
		expect(textElement).toBeInTheDocument();
	});
});
