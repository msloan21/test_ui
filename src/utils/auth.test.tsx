import { initAmplify } from './auth';
const awsAmplify = require('aws-amplify');

jest.mock('./utils', () => {
	return {
		getWindowAccountsPublicGlobals: () => ({
			domain: 'localhost',
			cognito: {
				region: 'region',
				userPoolId: 'userPoolId',
				userPoolWebClientId: 'clientId',
			},
		}),
	};
});

describe('Auth functions', () => {
	beforeEach(() => {
		awsAmplify.__initMockDefaultValues();
	});

	it('initAmplify', () => {
		initAmplify();
		expect(awsAmplify.__getMockConfigure()).toBeCalledWith({
			Auth: {
				region: 'region',
				userPoolId: 'userPoolId',
				userPoolWebClientId: 'clientId',
			},
		});
	});
});
