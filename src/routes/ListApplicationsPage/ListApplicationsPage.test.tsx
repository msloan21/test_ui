import React from 'react';
import { render, screen } from '@testing-library/react';
import ListApplicationsPage from './ListApplicationsPage';

jest.mock('../../components/ListApplications/ListApplications', () => ({
	__esModule: true,
	default: () => <p>Mock List Application component</p>,
}));

describe('List Application Pge', () => {
	it('renders Application Page', () => {
		render(<ListApplicationsPage />);
		const mockDemo = screen.getByText('Mock List Application component');
		expect(mockDemo).toBeInTheDocument();
	});
});
