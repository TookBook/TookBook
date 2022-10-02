import { atom } from "recoil";

const fetchedCategoriesState = atom({
	key: "fetchedCategoriesState",
	default: null,
});

export default fetchedCategoriesState