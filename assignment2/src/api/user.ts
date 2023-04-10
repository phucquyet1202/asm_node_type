import axios from "axios";
import IUser from "../interfaces/user";
import instance from "./index";
import ISignin from "../interfaces/signin";

export const signinUser = async (user: ISignin) => {
    try {
        const res = await axios.post('http://127.0.0.1:8080/api/signin', user)
        sessionStorage.setItem('token', res.data.accessToken);
        sessionStorage.setItem('user', JSON.stringify(res.data.Email));
        console.log(res);
        return res
    } catch (error: any) {
        console.log(error.message);
        // return error
    }
}
// dang ky
export const signupUser = async (userData: IUser) => {
    try {
        const { data } = await instance.post('http://127.0.0.1:8080/api/signup', userData)
        console.log(data);
        return data
    } catch (error: any) {
        return error.message
    }
} 
