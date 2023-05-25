import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogoutButton from './LogoutButton';
import { Auth } from 'aws-amplify';

jest.mock('aws-amplify');

describe('LogoutButton', () => {
	beforeEach(() => {
		Auth.signOut = jest.fn().mockImplementation(() => {
			Promise.resolve();
		});
	});

	it('triggers signout when log out button is clicked', async () => {
		render(<LogoutButton />);

		const logoutButton = screen.getByRole('button', {
			name: /Log out/i,
		});
		userEvent.click(logoutButton);

		await waitFor(() => {
			expect(Auth.signOut).toBeCalledTimes(1);
		});

		await waitFor(() => {
			expect(require('react-router-dom').__mockNavigate).toBeCalled();
		});
	});
});
