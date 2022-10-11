import { atom } from "recoil";

const shoppingCartContentsState = atom({
	key: "shoppingCartContentsState",
	default: [],
});

export default shoppingCartContentsState