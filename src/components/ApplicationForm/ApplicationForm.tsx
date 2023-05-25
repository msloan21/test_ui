import React from 'react';
import { Formik, Form } from 'formik';
import { CreateApplicationSchema } from '../../helpers/Validation/ApplicationValidation';
import { Button, Fieldset, Grid } from '@trussworks/react-uswds';
import TextInput from '../Elements/TextInput/TextInput';
import DatePicker from '../Elements/DatePicker/DatePicker';
import Dropdown from '../Elements/Dropdown/Dropdown';
import { Country } from 'country-state-city';
import { startCase } from 'lodash';

export type Application = {
	firstName: string;
	lastName: string;
	dob: Date;
	email: string;
	phoneNumber: string;
	originCountry: string;
};

const INITIAL_APPLICATION_VALS: Application = {
	firstName: '',
	lastName: '',
	dob: new Date(),
	email: '',
	phoneNumber: '',
	originCountry: '',
};

const COUNTRY_OPTIONS = Country.getAllCountries().map((val) => ({
	label: val.name,
	value: val.isoCode,
}));

export const ApplicationForm = () => {
	const textInputFields: string[] = [
		'firstName',
		'lastName',
		'email',
		'phoneNumber',
	];

	//   const handleApplicationCreation = async (
	//     values: Application,
	//   ) => {
	//     // TODO
	//     if (!hasValidationError) {
	//       submitApplication(applicationDetails);
	//     } else {
	//       console.error(`Error submitting application:`, applicationDetails);
	//     }
	// };

	return (
		<div>
			<Formik
				initialValues={INITIAL_APPLICATION_VALS}
				validationSchema={CreateApplicationSchema}
				validateOnMount
				onSubmit={console.log}
			>
				{() => (
					<Form className='maxw-full'>
						<div className='display-flex flex-align-center flex-justify'>
							<h1>Create Application</h1>
						</div>
						<Fieldset className='maxw-tablet-lg'>
							{textInputFields.map((field) => (
								<>
									<TextInput
										id={field}
										name={field}
										type='text'
										label={startCase(field)}
										required={true}
									/>
								</>
							))}
							<Dropdown
								id='countryOfBirth'
								name='countryOfBirth'
								label='Country of birth'
								options={COUNTRY_OPTIONS}
								required={true}
							/>
							<DatePicker
								id='birthDate'
								name='birthDate'
								type='text'
								label='Date of birth'
								defaultValue={new Date().getDate.toString()}
								required={true}
							/>
						</Fieldset>
						<p>
							<span className='text-red'>*</span>Indicates a required field
						</p>
						<Grid row>
							<Button type='submit' disabled={true}>
								Submit Application
							</Button>
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ApplicationForm;
