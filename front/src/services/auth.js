import baseAxios from "./base";

export const loginUser = (data) => baseAxios.post("/login", data);
export const registerUser = (data) => baseAxios.post("/signup", data);
export const updateProfile = (data) => baseAxios.post("/completeUserProfile", data);
export const getProfile = () => baseAxios.get("/getUserProfile");