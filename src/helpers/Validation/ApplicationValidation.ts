import * as Yup from 'yup';
const REQUIRED_ERROR_MSG = 'This field is required';
const DATE_TYPE_ERROR_MSG = 'Please enter a valid date';
const PHONE_ERROR_MSG = 'Please enter a valid phone number';
const NAME_ERROR_MSG = 'Please enter a valid name';

const simpleStringRequired = Yup.string().required(REQUIRED_ERROR_MSG);
export const PHONE_REGEXP = /^([0-9]{3}-[0-9]{3}-[0-9]{4})|^([0-9]{10})$/;
export const ALPHA_REGEXP = /^[a-zA-Z]+$/;

const lengthError = (len: number) => `Please enter a value less than ${len}`;

export const CreateApplicationSchema = Yup.object().shape({
	firstName: Yup.string().matches(ALPHA_REGEXP, NAME_ERROR_MSG).required(),
	lastName: Yup.string().matches(ALPHA_REGEXP, NAME_ERROR_MSG).required(),
	email: Yup.string()
		.required(REQUIRED_ERROR_MSG)
		.email('Please enter a valid email')
		.max(200, lengthError(200)),
	phoneNumber: Yup.string()
		.min(10, PHONE_ERROR_MSG)
		.max(12, PHONE_ERROR_MSG)
		.matches(PHONE_REGEXP, PHONE_ERROR_MSG)
		.required(REQUIRED_ERROR_MSG),
	birthDate: Yup.date()
		.typeError(DATE_TYPE_ERROR_MSG)
		.required(REQUIRED_ERROR_MSG),
	originCountry: simpleStringRequired,
});
