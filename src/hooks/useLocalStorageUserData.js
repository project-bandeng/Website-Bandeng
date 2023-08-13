export default function useLocalStorageUserData(){

    let data = localStorage.getItem("data-user")

    return JSON.parse(data)
}