import { atom } from "recoil";

const shoppingCartState = atom({
	key: "shoppingCartState",
	default: false,
});

export default shoppingCartState