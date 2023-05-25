import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ListApplications from './ListApplications';

jest.mock('../../utils/utils', () => {
	const original = jest.requireActual('../../utils/utils');
	let succeed = true;
	const mockFetch = () => {
		if (succeed) {
			return Promise.resolve({
				status: 200,
				json: () => Promise.resolve({}),
			});
		} else {
			return Promise.reject({});
		}
	};

	return {
		...original,
		fetchWithAuthJson: mockFetch,
		__setFetchSuceed: () => {
			succeed = true;
		},
		__setFetchFail: () => {
			succeed = false;
		},
	};
});

describe('List Applications Page', () => {
	beforeEach(() => {
		console.error = jest.fn();
		require('../../utils/utils').__setFetchSuceed();
	});

	it('handles displaying the list of applicants', async () => {
		render(<ListApplications />);

		const titleString = screen.getByText(/List of Applications/i);
		const firstName = screen.getByText(/First Name/i);
		const lastName = screen.getByText(/Last Name/i);
		const dob = screen.getByText(/Date of Birth/i);
		const status = screen.getByText(/Status/i);
		const scheduleApt = screen.getByText(/Schedule Appointment/i);

		expect(titleString).toBeInTheDocument();
		expect(firstName).toBeInTheDocument();
		expect(lastName).toBeInTheDocument();
		expect(dob).toBeInTheDocument();
		expect(status).toBeInTheDocument();
		expect(scheduleApt).toBeInTheDocument();
	});

	it('routes to application page', async () => {
		render(<ListApplications />);

		const submitButton = screen.getByTestId(/open-0-application/i);
		submitButton.click();
	});

	it('utilize previous and next buttons', async () => {
		render(<ListApplications />);

		const nextButton = screen.getByText(/Next/i);
		nextButton.click();

		await waitFor(() => {
			const previousButton = screen.getByText(/Previous/i);
			expect(previousButton).toBeInTheDocument();
			previousButton.click();
		});
	});

	it('triggers pagination numbers', async () => {
		render(<ListApplications />);

		const pageNumberButton = screen.getByLabelText(/Page 2/i);
		pageNumberButton.click();

		await waitFor(() => {
			const previousButton = screen.getByText(/Previous/i);
			expect(previousButton).toBeInTheDocument();
		});
	});
});
