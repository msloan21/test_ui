import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from './Footer';

describe('< Footer />', () => {
	it('scroll to top when clicked', async () => {
		window.scrollTo = jest.fn();
		render(<Footer />);

		const FooterButton = screen.getByRole('button', {
			name: /Return to top/i,
		});
		userEvent.click(FooterButton);

		await waitFor(() => {
			expect(window.scrollTo).toBeCalledTimes(1);
		});
	});
});
