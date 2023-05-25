import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('< Header />', () => {
	it('triggers state update when the header button is clicked', async () => {
		const mockProps = {
			isOpen: false,
			setBannerOpen: jest.fn(),
			displayLogout: true,
		};

		render(<Header {...mockProps} />);

		const headerButton = screen.getByRole('button', {
			name: /here's how you know/i,
		});
		userEvent.click(headerButton);

		await waitFor(() => {
			expect(mockProps.setBannerOpen).toBeCalledTimes(1);
		});
	});
	it('shows the open banner when isOpen is true', async () => {
		const mockProps = {
			isOpen: true,
			setBannerOpen: jest.fn(),
			displayLogout: true,
		};

		render(<Header {...mockProps} />);

		const openBanner = screen.getByText(/Official websites use .gov/i);
		expect(openBanner).toBeInTheDocument();
	});
});
