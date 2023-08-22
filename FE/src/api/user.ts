import axios, { AxiosError } from "axios";
import IUser from "../interfaces/user";
import instance from "./index";
import ISignin from "../interfaces/signin";

export const signinUser = async (user: ISignin) => {
    try {
        const response = await instance.post("/signin", user)
        console.log(response);
        if (response.status === 200) {
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('user', JSON.stringify(response.data.Email));
            return true;
        }
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response && error.response.status === 400) {
            throw new Error(error.response.data.message);
        } else {
            console.log(error);
            throw new Error('Đã xảy ra lỗi khi đăng nhập!');
        }
    }

}
// dang ky
export const signupUser = async (userData: IUser) => {
    try {
        const { data } = await instance.post('/signup', userData)
        console.log(data);
        return data
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response && error.response.status === 400) {
            throw new Error(error.response.data.message);
        } else {
            console.log(error);
            throw new Error('Đã xảy ra lỗi khi đăng ký!');
        }
    }
} 
