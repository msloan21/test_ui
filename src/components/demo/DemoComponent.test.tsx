import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DemoComponent from './DemoComponent';

jest.mock('../../utils/utils', () => {
	const original = jest.requireActual('../../utils/utils');
	let succeed = true;
	const mockFetch = () => {
		if (succeed) {
			return Promise.resolve({
				status: 200,
				json: () =>
					Promise.resolve({
						id: 3,
						val: 'sds',
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

describe('Demo component', () => {
	beforeEach(() => {
		console.error = jest.fn();
		require('../../utils/utils').__setFetchSuceed();
	});

	it('renders error page', async () => {
		render(<DemoComponent />);
		let headerEl1: HTMLElement;
		await waitFor(() => {
			headerEl1 = screen.getByText(/Create a Demo entity/i);
		});
		const headerEl2 = screen.getByText(/Retrieve a Demo entity/i);
		const inputElement1 = screen.getByLabelText(/Entity value/i);
		const inputElement2 = screen.getByLabelText(/Entity id/i);
		const createButton = screen.getByText('Create', {
			selector: 'button',
		});
		const retrieveEntityButton = screen.getByText('Retrieve', {
			selector: 'button',
		});

		await waitFor(() => {
			expect(headerEl1).toBeInTheDocument();
		});

		expect(headerEl2).toBeInTheDocument();
		expect(inputElement1).toBeInTheDocument();
		expect(inputElement2).toBeInTheDocument();
		expect(createButton).toBeInTheDocument();
		expect(retrieveEntityButton).toBeInTheDocument();
	});

	it('handles entity value input and submit', async () => {
		render(<DemoComponent />);
		await waitFor(async () => {
			expect(screen.getByLabelText(/Entity value/i)).toBeInTheDocument();
		});
		fireEvent.change(screen.getByLabelText(/Entity value/i), {
			target: { value: 'fakeDemoValue' },
		});
		await waitFor(() => {
			expect(screen.getByDisplayValue('fakeDemoValue')).toBeInTheDocument();
		});
		const createButton = screen.getByText('Create', {
			selector: 'button',
		});
		fireEvent.click(createButton);
		require('../../utils/utils').__setFetchFail();
		fireEvent.click(createButton);
	});

	it('handles demo id input and submit', async () => {
		render(<DemoComponent />);
		await waitFor(() => {
			expect(screen.getByLabelText('Entity id')).toBeInTheDocument();
		});
		const retrieveEntityButton = screen.getByText('Retrieve', {
			selector: 'button',
		});
		expect(retrieveEntityButton).toBeInTheDocument();
		fireEvent.change(screen.getByLabelText('Entity id'), {
			target: { value: '33' },
		});
		await waitFor(() => {
			expect(screen.getByDisplayValue(33)).toBeInTheDocument();
		});
		fireEvent.click(retrieveEntityButton);
		require('../../utils/utils').__setFetchFail();
		fireEvent.click(retrieveEntityButton);
		await waitFor(() => {
			expect(screen.getByText('No demo value found.')).toBeInTheDocument();
		});
	});
});
