import React from 'react';
import Dropdown from './Dropdown';
import { render, screen } from '@testing-library/react';

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

describe('Dropdown', () => {
	beforeEach(() => {
		require('formik').__clear();
	});
	const defaultProps = {
		id: 'id',
		name: 'test-name',
		label: 'My text input',
		options: [
			{ label: 'FL', value: 'Florida' },
			{ label: 'AZ', value: 'Arizona' },
		],
	};
	it('renders', () => {
		render(<Dropdown {...defaultProps} />);
	});

	it('displays errors', () => {
		require('formik').__setMeta({
			touched: true,
			error: 'This is my error',
		});

		render(<Dropdown {...defaultProps} />);
		screen.getByText('This is my error');
	});
});
