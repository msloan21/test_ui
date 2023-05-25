/// <reference types="react-scripts" />
export {};

export type AccountsPublicUIGlobals = {
	domain: string;
	apiURL: string;
	cognito: {
		region: string;
		userPoolId: string;
		userPoolWebClientId: string;
	};
};

declare global {
	interface Window {
		accountsPublicUIGlobals: AccountsPublicUIGlobals;
	}
}
