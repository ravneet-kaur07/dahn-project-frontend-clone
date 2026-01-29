"use client";
import { useState } from "react";
import { registerUser } from "@/api/api";
import { registerSchema } from "@/validations/registerSchema";
import Link from "next/link";

export default function Register(){
    const [name, setName]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [role, setRole]= useState("individual_nurse");
    const [errors, setErrors]= useState({})
    const [successMsg, setSuccessMsg]= useState("");
    const [errorMsg, setErrorMsg]= useState("");

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const data={name, email, password, role};

        const result= registerSchema.safeParse(data);
        if(!result.success){
            setErrors(result.error.flatten().fieldErrors);
            return;
        }
        setErrors({});

        console.log("Sending:", result.data);

        try{
            const res = await registerUser(result.data);
            setSuccessMsg("Account Created Successfully!!!!");
            setName("");
            setEmail("");
            setPassword("");
            console.log("Success:", res);
        }catch(err){
            setErrorMsg(err?.response?.data?.mesaage||"Something went wrong!!!");
            console.log("Error object:", err);
        }
    }

    return(
        <>
           <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-6xl font-8 mb-4">Create Your Free Account</h1>
            {successMsg&&(<div className="mb-4 w-96 bg-green-100 text-green-700 p-3 rounded">{successMsg}</div>)}
            {errorMsg&& (<div className="mb-4 w-96 bg-red-100 text-red-700 p-3 rounded">{errorMsg}</div>)}
            <form onSubmit={handleSubmit} className="p-6 rounded-shadow w-96">
                
                <div className="flex mb-4">
                    <button type="button" onClick={()=>setRole("individual_nurse")} className={`flex-1 py-2 rounded-l ${role==="individual_nurse"?"bg-slate-800 text-white":"bg-gray-200"}`}>Individual</button>
                    <button type="button" onClick={()=>setRole("agency")} className={`flex-1 py-2 rounded-l ${role==="agency"?"bg-slate-800 text-white":"bg-gray-200"}`}>Agency</button>
                </div>
                {/* <div className="grid grid-cols-2 gap-4"> */}
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="name" placeholder="Name" className="w-full border p-2 mb-3" value={name} onChange={(e) => setName(e.target.value)}/> 
                        {errors.name&&(
                            <p className="text-red-600 text-sm mb-2">{errors.name[0]}</p>
                        )} 
                    </div>
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
                {/* </div> */}
                
                
                
                <button type="submit" className="w-full bg-slate-800 text-white py-2 rounded">Next</button>
            </form>
            <p>Already have an account? <Link href='/login' className="text-yellow-600">Login</Link></p>
            </div> 
        </>
    )
}
