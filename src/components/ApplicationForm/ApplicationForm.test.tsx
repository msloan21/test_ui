import React from 'react';
import { render, screen } from '@testing-library/react';
import ApplicationForm from './ApplicationForm';

jest.mock('../../utils/utils', () => {
	const original = jest.requireActual('../../utils/utils');
	let succeed = true;
	const mockFetch = () => {
		if (succeed) {
			return Promise.resolve({
				status: 200,
				json: () =>
					Promise.resolve({
						id: 1,
						firstName: 'Wade',
						lastName: 'Wilson',
						email: 'Wade.Wilson@testCompany.com',
						phoneNumber: '111-111-1111',
						originCountry: 'Canada',
					}),
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

describe('Application Form component', () => {
	beforeEach(() => {
		console.error = jest.fn();
		require('../../utils/utils').__setFetchSuceed();
	});

	it('handles application input and submit', async () => {
		render(<ApplicationForm />);
		const titleString = screen.getByText(/Create Application/i);
		const infoString = screen.getByText(/Indicates a required field/i);

		const firstName = screen.getByText(/First Name/i);
		const lastName = screen.getByText(/Last Name/i);
		const dob = screen.getByText(/Country of birth/i);
		const email = screen.getByText(/Email/i);
		const phoneNumber = screen.getByText(/Phone Number/i);
		const originCountry = screen.getByText(/Date of birth/i);

		expect(titleString).toBeInTheDocument();
		expect(infoString).toBeInTheDocument();
		expect(firstName).toBeInTheDocument();
		expect(lastName).toBeInTheDocument();
		expect(email).toBeInTheDocument();
		expect(dob).toBeInTheDocument();
		expect(phoneNumber).toBeInTheDocument();
		expect(originCountry).toBeInTheDocument();
		expect(originCountry).toBeInTheDocument();
		expect(email).toBeInTheDocument();

		const submitButton = screen.getByText('Submit Application', {
			selector: 'button',
		});
		expect(submitButton).toBeInTheDocument();
	});
});
