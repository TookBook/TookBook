import { atom } from "recoil";

const itemsInCartState = atom({
	key: "itemsInCartState",
	default: [],
});

export default itemsInCartState