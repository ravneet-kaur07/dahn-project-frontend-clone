"use client";
import { useState } from "react";
import { loginUser } from "@/api/api";
import { loginSchema } from "@/validations/loginSchema";
import Link from "next/link";

export default function Register(){
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [errors, setErrors]= useState({})
    const [successMsg, setSuccessMsg]= useState("");
    const [errorMsg, setErrorMsg]= useState("");

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const data={ email, password };

        const result= loginSchema.safeParse(data);
        if(!result.success){
            setErrors(result.error.flatten().fieldErrors);
            return;
        }
        setErrors({});

        console.log("Sending:", result.data);

        try{
            const res = await loginUser(result.data);
            setSuccessMsg(res.message||"Login Successful!!!!");
            setEmail("");
            setPassword("");
            console.log("Success:", res);
        }catch(err){
            setSuccessMsg("");
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }else{
                setErrorMsg(err?.response?.data?.message||"Invalid Credentials!!!");
            }
            console.log("Error object:", err);
        }
    }

    return(
        <>
           <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-6xl font-8 mb-4">Login to the Website</h1>
            {successMsg&&(<div className="mb-4 w-96 bg-green-100 text-green-700 p-3 rounded">{successMsg}</div>)}
            {errorMsg&& (<div className="mb-4 w-96 bg-red-100 text-red-700 p-3 rounded">{errorMsg}</div>)}
            <form onSubmit={handleSubmit} className="p-6 rounded-shadow w-96">
    
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input type="text" id="email" placeholder="Email" className="w-full border p-2 mb-3" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        {errors.email&&(
                            <p className="text-red-600 text-sm mb-2">{errors.email[0]}</p>
                        )} 
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" placeholder="Password" className="w-full border p-2 mb-3" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                        {errors.password&&(
                            <p className="text-red-600 text-sm mb-2">{errors.password[0]}</p>
                        )} 
                    </div>                
                
                <button type="submit" className="w-full bg-slate-800 text-white py-2 rounded">Login</button>
            </form>
            <p>Don't have an account? <Link href='/register' className="text-yellow-600">Register here</Link></p>
            </div> 
        </>
    )
}
