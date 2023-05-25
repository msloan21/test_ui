import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
const { createBrowserRouter, RouterProvider } =
	jest.requireActual('react-router-dom');
import LoginPage from './LoginPage';

describe('Login page', () => {
	it('renders Login page', () => {
		const testRouter = createBrowserRouter([
			{ path: '/', element: <LoginPage /> },
		]);
		render(<RouterProvider router={testRouter} />);

		expect(screen.queryAllByRole('heading')[0].textContent).toBe('Sign in');
		expect(screen.getByText(/Agency Contact Center/)).toBeInTheDocument();
	});

	it('triggers state change when toggle password visibility link is clicked', async () => {
		const testRouter = createBrowserRouter([
			{ path: '/', element: <LoginPage /> },
		]);
		render(<RouterProvider router={testRouter} />);
		const showPasswordLink = screen.getByRole('button', {
			name: /show password/i,
		});

		await act(() => {
			showPasswordLink.click();
		});

		await waitFor(() => {
			expect(
				screen.getByRole('button', {
					name: /hide password/i,
				})
			).toBeInTheDocument();
		});
	});
});
