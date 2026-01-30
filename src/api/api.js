import axios from "axios";

const api= axios.create({
    baseURL: "http://localhost:4500"
})

export const registerUser= async(data)=>{
    try{
        const res= await api.post('/register', data);
        return res.data;
    }catch(err){
        console.log("Error while registring the user!!", err.response.data);
    }
}

export const loginUser= async(data)=>{
    try{
        const res= await api.post('/login', data);
        return res.data;
    }catch(err){
        console.log("Error while logging in the user!!", err.response.data)
        throw err;
    }
}