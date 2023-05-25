import { Amplify } from 'aws-amplify';
import { getWindowAccountsPublicGlobals } from './utils';

export const initAmplify = () => {
	const AmplifyConfig = {
		Auth: {
			region: getWindowAccountsPublicGlobals().cognito.region,
			userPoolId: getWindowAccountsPublicGlobals().cognito.userPoolId,
			userPoolWebClientId:
				getWindowAccountsPublicGlobals().cognito.userPoolWebClientId,
		},
	};

	Amplify.configure(AmplifyConfig);
};
