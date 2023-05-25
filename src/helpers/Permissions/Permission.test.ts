import { hasAnalyst, hasManager, hasManagerAndAnalyst } from './Permission';

describe('Determine roles', () => {
	it('hasAnalystRole', async () => {
		expect(await hasAnalyst()).toBeTruthy();
	});

	it('hasManagerRole', async () => {
		const hasRole: boolean = await hasManager();
		expect(hasRole).toBe(true);
	});

	it('has both analyst and manager', async () => {
		const hasRole: boolean = await hasManagerAndAnalyst();
		expect(hasRole).toBe(true);
	});
});
