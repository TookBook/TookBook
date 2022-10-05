import { atom } from "recoil";

const adminModeState = atom({
	key: "adminModeState",
	default: false,
});

export default adminModeState