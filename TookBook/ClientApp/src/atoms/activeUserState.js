import { atom } from "recoil";

const activeUserState = atom({
	key: "activeUserState",
	default: null,
});

export default activeUserState