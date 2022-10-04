import { atom } from "recoil";

const fetchedUsersState = atom({
	key: "fetchedUsersState",
	default: null,
});

export default fetchedUsersState