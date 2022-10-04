import {atom} from 'recoil';

const openBasketState = atom({
	key: 'openBasketState',
	default: true,
});

export default openBasketState;