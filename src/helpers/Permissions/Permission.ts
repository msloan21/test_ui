import { Auth } from 'aws-amplify';
import { includes } from 'lodash';

export const getPermissionGroups = async () => {
	const session = await Auth.currentSession();
	const token = await session.getIdToken();
	return token.payload['cognito:groups'];
};

export const hasAnalyst = async () => {
	const permissionGroup: string[] = await getPermissionGroups();
	return includes(permissionGroup, 'Analysts');
};

export const hasManager = async () => {
	const permissionGroup: string[] = await getPermissionGroups();
	return includes(permissionGroup, 'Managers');
};

export const hasManagerAndAnalyst = async () => {
	const permissionGroup: string[] = await getPermissionGroups();
	return (
		permissionGroup.length === 2 &&
		includes(permissionGroup, 'Managers') &&
		includes(permissionGroup, 'Analysts')
	);
};
