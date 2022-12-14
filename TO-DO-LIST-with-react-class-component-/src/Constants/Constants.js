const SERVER_URL = "http://localhost:5000"


export const TODO_URL = `${SERVER_URL}/api/todo`;
export const LOGIN_URL = `${SERVER_URL}/api/auth/login`;
export const SIGNUP_URL = `${SERVER_URL}/api/auth/signup`;
export const USER_URL = `${SERVER_URL}/api/auth/user`;
export const HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
};