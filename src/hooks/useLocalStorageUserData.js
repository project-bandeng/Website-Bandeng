import { useNavigate } from "react-router-dom"

export default function useLocalStorageUserData(){

    let navigate = useNavigate()
    let data = localStorage.getItem("data-user")

    if(!data){
        navigate("/login")
    }

    return data ? JSON.parse(data) : null
}