import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import {  useNavigate } from "react-router-dom"



export const Signin = () => {
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();



    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            
            <Heading label={"Sign in"} />
            <SubHeading label={"Enter your credentials to access your account"}/>
            <InputBox onChange={(e) => {
                setUsername(e.target.value)
            }}  label={"Email"} placeholder={"johndoe@example.com"} />
            <InputBox onChange={(e) => {
                setPassword(e.target.value)
            }}  label={"Password"} placeholder={"******"} />



            <div className="pt-4">
                <Button onClick={() => {

                   navigate("/dashboard")
                   // localStorage.setItem("token", response.data.token)
                }}  label = {"Sign In"} />
            </div>

            <div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>

        </div>

    </div>

    </div>
}