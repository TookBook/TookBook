import { atom } from "recoil";

const fetchedBooksState = atom({
	key: "fetchedBooksState",
	default: [],
});

export default fetchedBooksState