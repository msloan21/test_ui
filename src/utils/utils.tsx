import { Auth } from 'aws-amplify';
import { AccountsPublicUIGlobals } from '../react-app-env';

export const getWindowAccountsPublicGlobals = (): AccountsPublicUIGlobals => {
	return window.accountsPublicUIGlobals;
};

interface RequestInitSimple extends Omit<RequestInit, 'headers'> {
	headers?: Headers;
}

export const fetchWithAuth = async (
	input: string,
	init: RequestInitSimple = {}
): Promise<Response> => {
	const session = await Auth.currentSession();
	const token = session.getAccessToken().getJwtToken();
	const prefixedURL = getWindowAccountsPublicGlobals().apiURL + '/' + input;
	const bearerTokenHeader = 'Bearer ' + token;
	if (init.headers !== undefined) {
		init.headers.append('Authorization', bearerTokenHeader);
	} else {
		init.headers = new Headers({
			Authorization: bearerTokenHeader,
		});
	}
	return fetch(prefixedURL, init);
};

export const fetchWithAuthJson = (
	input: string,
	init = {}
): Promise<object> => {
	return fetchWithAuth(input, init).then((res) => {
		if (res.status === 200) {
			return res.json();
		} else {
			return Promise.reject(res);
		}
	});
};
