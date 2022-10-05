import { atom } from "recoil";

const fetchedCategoriesState = atom({
	key: "fetchedCategoriesState",
	default: [],
});

export default fetchedCategoriesState