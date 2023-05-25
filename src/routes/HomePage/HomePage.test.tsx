import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

jest.mock('../../components/demo/DemoComponent', () => ({
	__esModule: true,
	default: () => <p>Mock demo component</p>,
}));

describe('Home page', () => {
	it('renders Home page', () => {
		render(<HomePage />);
		const mockDemo = screen.getByText('Mock demo component');
		expect(mockDemo).toBeInTheDocument();
	});
});
