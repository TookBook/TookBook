import { atom } from "recoil";

const fetchedBooksState = atom({
	key: "fetchedBooksState",
	default: null,
});

export default fetchedBooksState