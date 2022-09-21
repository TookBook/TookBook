import { atom } from "recoil";

const openUserPortalState = atom({
	key: "openUserPortalState",
	default: false,
});

export default openUserPortalState