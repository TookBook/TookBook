import { atom } from "recoil";

const activeUserState = atom({
	key: "activeUserState",
	default: {},
});

export default activeUserState