import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

const USERNAME_TEXT = 'Username or email address';
const PASSWORD_TEXT = 'Password';

describe('< Form />', () => {
	const mockProps = {
		handleLoginSubmit: jest.fn(),
		showPassword: false,
		setShowPassword: jest.fn((showPassword) => !showPassword),
		errors: '',
		disabled: false,
	};

	it('triggers state change when link is clicked', async () => {
		render(<LoginForm {...mockProps} />);

		const showPasswordLink = screen.getByRole('button', {
			name: /show password/i,
		});
		userEvent.click(showPasswordLink);

		await waitFor(() => {
			expect(mockProps.setShowPassword).toBeCalledTimes(1);
		});
	});

	it('renders "hide password" when showPassword is true', () => {
		const mockInstanceProps = {
			...mockProps,
			showPassword: true,
		};
		render(<LoginForm {...mockInstanceProps} />);

		const hidePasswordLink = screen.getByText(/hide password/i);
		expect(hidePasswordLink).toBeInTheDocument();
	});

	it('renders error alert when there are errors', () => {
		const mockInstanceProps = {
			...mockProps,
			errors: 'these are my errors',
		};
		render(<LoginForm {...mockInstanceProps} />);

		const errorsAlert = screen.getByText(/these are my errors/i);
		expect(errorsAlert).toBeInTheDocument();
	});

	it('handles username input', async () => {
		render(<LoginForm {...mockProps} />);

		const username = screen.getByLabelText(USERNAME_TEXT);
		expect(username).toBeInTheDocument();
		fireEvent.change(username, { target: { value: 'testUsername' } });
		await waitFor(() => {
			expect(screen.getByDisplayValue('testUsername')).toBeInTheDocument();
		});
	});

	it('handles password input', async () => {
		render(<LoginForm {...mockProps} />);

		const password = screen.getByLabelText(PASSWORD_TEXT);
		expect(password).toBeInTheDocument();
		fireEvent.change(password, { target: { value: 'testPass' } });
		await waitFor(() => {
			expect(screen.getByDisplayValue('testPass')).toBeInTheDocument();
		});
	});

	it('calls submit handler when submitting', async () => {
		const mockSubmit = jest.fn();
		const mockInstanceProps = {
			...mockProps,
			handleLoginSubmit: mockSubmit,
		};
		render(<LoginForm {...mockInstanceProps} />);

		const username = screen.getByLabelText(USERNAME_TEXT);
		const password = screen.getByLabelText(PASSWORD_TEXT);
		const submitButton = screen.getByTestId(/submit button/i);

		fireEvent.change(username, { target: { value: 'testUsername' } });
		fireEvent.change(password, { target: { value: 'testPass' } });
		submitButton.click();

		await waitFor(() => {
			expect(mockSubmit).toBeCalledWith('testUsername', 'testPass');
		});
	});
});
