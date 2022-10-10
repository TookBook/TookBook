import { atom } from "recoil";

const shoppingCartContents = atom({
	key: "shoppingCartContentsState",
	default: [],
});

export default shoppingCartContents