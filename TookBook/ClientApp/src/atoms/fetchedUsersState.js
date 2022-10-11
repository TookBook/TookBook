import { atom } from "recoil";

const fetchedUsersState = atom({
	key: "fetchedUsersState",
	default: [],
});

export default fetchedUsersState