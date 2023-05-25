let token: string,
	refreshToken: string,
	loginFail: boolean,
	loginError: string,
	sessionSucceed: boolean,
	tokenExpiration: Date;
const mockConfigure = jest.fn();

export const __initMockDefaultValues = () => {
	token = 'jwt-1';
	refreshToken = 'refresh-1';
	loginFail = false;
	loginError = '';
	sessionSucceed = true;
	tokenExpiration = new Date(new Date().valueOf() + 1000 * 60 * 60 * 24);
	mockConfigure.mockClear();
};

__initMockDefaultValues();

export const __setRefreshToken = (toSet: string) => {
	refreshToken = toSet;
};
export const __setToken = (toSet: string) => {
	token = toSet;
};
export const __setTokenExpiration = (toSet: Date) => {
	tokenExpiration = toSet;
};

export const __setLoginToFailPassword = () => {
	loginFail = true;
	loginError = 'NotAuthorizedException';
};

export const __setLoginToSucceed = () => {
	loginFail = false;
};

export const __setSessionSucceed = () => {
	sessionSucceed = true;
};

export const __setSessionFail = () => {
	sessionSucceed = false;
};

export const __setLoginToFailWError = () => {
	loginFail = true;
	loginError = 'SystemException';
};

export const __getMockConfigure = () => mockConfigure;

const getSessionSucceed = () =>
	Promise.resolve({
		getAccessToken: () => ({
			getJwtToken: () => token,
			getExpiration: () => tokenExpiration,
		}),
		getRefreshToken: () => ({
			getToken: () => refreshToken,
		}),
		getIdToken: jest.fn().mockResolvedValue({
			payload: {
				'cognito:groups': ['Analysts', 'Managers'],
			},
		}),
	});

const getSessionFail = () => Promise.reject({});

export const Auth = {
	signIn: () => {
		if (loginFail) {
			return Promise.reject({
				code: loginError,
				name: loginError,
			});
		} else {
			return Promise.resolve({ t: 3 });
		}
	},
	currentSession: () => {
		if (sessionSucceed) {
			return getSessionSucceed();
		} else {
			return getSessionFail();
		}
	},
};
export const Amplify = {
	configure: mockConfigure,
};
