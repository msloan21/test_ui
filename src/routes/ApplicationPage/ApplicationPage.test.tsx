import React from 'react';
import { render, screen } from '@testing-library/react';
import ApplicationPage from './ApplicationPage';

jest.mock('../../components/ApplicationForm/ApplicationForm', () => ({
	__esModule: true,
	default: () => <p>Mock ApplicationForm component</p>,
}));

describe('Home page', () => {
	it('renders Home page', () => {
		render(<ApplicationPage />);
		const mockDemo = screen.getByText('Mock ApplicationForm component');
		expect(mockDemo).toBeInTheDocument();
	});
});
