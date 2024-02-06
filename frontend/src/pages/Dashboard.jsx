import React, { useEffect, useState } from "react";
import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
    const [amount, setAmount] = useState(0);
    console.log("hi from then")
   
   axios.get("http://localhost:3000/api/v1/account/balance", {
        headers : {
            'Authorization' : `Bearer ` + localStorage.getItem("token")
        }
   }) .then(res => {
        console.log("hi from then")
        setAmount(res.data.balance)
   })


    return (
        <div className="py-4 px-4 mx-2">
            <Appbar />
            <div className="mt-8">
                <Balance value={amount} />
                <Users />
            </div>
        </div>
    );
};
