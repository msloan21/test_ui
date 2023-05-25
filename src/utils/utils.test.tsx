import {
	fetchWithAuth,
	fetchWithAuthJson,
	getWindowAccountsPublicGlobals,
} from './utils';

describe('Utility functions', () => {
	const URL = 'apple/banana';

	it('getWindowAccountsPublicGlobals', () => {
		const windowAPData = {
			domain: 'localhost',
			apiURL: 'http://localhost:8080',
			cognito: {
				region: 'region-ex',
				userPoolId: 'upid-111',
				userPoolWebClientId: 'upwclid-111',
			},
		};

		window.accountsPublicUIGlobals = windowAPData;

		expect(getWindowAccountsPublicGlobals()).toBe(windowAPData);
	});

	it('fetchWithAuth without existing headers', async () => {
		const mockFetch = jest.fn();
		window.fetch = mockFetch;
		const url = 'http://localtest.xyz';
		const testToken = 'testToken';
		require('aws-amplify').__setToken(testToken);
		await fetchWithAuth(url);
		expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
			headers: new Headers({
				Authorization: `Bearer ${testToken}`,
			}),
		});
	});

	it('fetchWithAuth with existing headers', async () => {
		const windowAPData = {
			domain: 'localhost',
			apiURL: 'http://fake.test',
			cognito: {
				region: 'region-ex',
				userPoolId: 'upid-111',
				userPoolWebClientId: 'upwclid-111',
			},
		};

		window.accountsPublicUIGlobals = windowAPData;

		const testToken = 'testToken';
		require('aws-amplify').__setToken(testToken);
		const mockFetch = jest.fn();
		window.fetch = mockFetch;
		const options = {
			headers: new Headers({
				test: 'abc',
			}),
		};

		await fetchWithAuth(URL, options);
		expect(mockFetch).toBeCalledWith('http://fake.test/' + URL, {
			headers: new Headers({
				test: 'abc',
				Authorization: `Bearer ${testToken}`,
			}),
		});
	});

	it('fetchWithAuthJson', async () => {
		const testToken = 'testToken';
		require('aws-amplify').__setToken(testToken);
		const mockFetch = jest.fn().mockReturnValue(
			Promise.resolve({
				status: 200,
				json: () => ({
					a: 100,
				}),
			})
		);
		window.fetch = mockFetch;
		const options = {
			headers: new Headers({
				test: 'abc',
			}),
		};

		const res = await fetchWithAuthJson(URL, options);
		expect(mockFetch).toBeCalledWith(expect.any(String), {
			headers: new Headers({
				test: 'abc',
				Authorization: `Bearer ${testToken}`,
			}),
		});
		expect(res).toEqual({ a: 100 });
	});

	it('fetchWithAuthJson failure', async () => {
		const testToken = 'testToken';
		require('aws-amplify').__setToken(testToken);
		const mockFetch = jest.fn().mockReturnValue(
			Promise.resolve({
				status: 500,
			})
		);
		window.fetch = mockFetch;
		expect.assertions(1);
		let e;
		try {
			await fetchWithAuthJson(URL);
		} catch (err) {
			e = err;
		} finally {
			expect(e).toEqual({
				status: 500,
			});
		}
	});
});
