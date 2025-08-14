import { useMemo } from "react";

export default function useProfile(){

    const {userDetails,token} = useMemo(()=>{
        let user = null;
        let token = null;
        if(typeof window !== "undefined"){
            const userInfo = localStorage.getItem("user");
            const token = localStorage.getItem("token") ?? null;
            user = userInfo ? JSON.parse(userInfo) : null;
        }
        return {userDetails:user,token};
    },[])
    return {
        token, userDetails
    };
}