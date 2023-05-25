import React from 'react';
import DatePicker from './DatePicker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('formik', () => {
	type MockMetaType = {
		touched?: boolean;
		error?: string;
	};

	let field = {};
	let meta: MockMetaType = {};

	const getMeta = () => meta;

	return {
		__clear: () => {
			meta = {};
			field = {
				onChange: jest.fn(),
			};
		},
		__setMeta: (toSet: MockMetaType) => {
			meta = toSet;
		},
		__getMeta: () => meta,
		useField: () => [field, getMeta()],
	};
});

describe('DatePicker', () => {
	beforeEach(() => {
		require('formik').__clear();
	});
	const defaultProps = {
		id: 'id',
		name: 'test-name',
		label: 'My text input',
	};
	it('renders', () => {
		render(<DatePicker {...defaultProps} />);
		expect(screen.getByText('mm/dd/yyyy')).toBeInTheDocument();
	});

	it('displays errors', () => {
		require('formik').__setMeta({
			touched: true,
			error: 'This is my error',
		});
		render(<DatePicker {...defaultProps} />);
		screen.getByText('This is my error');
	});

	it('can be updated', async () => {
		render(<DatePicker {...defaultProps} />);

		await userEvent.type(
			screen.getByRole('textbox', {
				name: 'My text input',
			}),
			'12/22/2020'
		);

		expect(screen.getByDisplayValue('12/22/2020')).toBeInTheDocument();
	});
});
