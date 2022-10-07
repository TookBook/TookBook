import { atom } from 'recoil';

const isUserLoggedInState = atom({
	key: 'isUserLoggedInState',
	default: false,
});

export default isUserLoggedInState;