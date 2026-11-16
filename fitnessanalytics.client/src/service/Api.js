import axios from "axios";

const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_API_URL : "/";

export const api = axios.create({
    baseURL: String(apiUrl || "/"), // String() força o valor a virar texto, evitando o crash do Axios
    headers: {
        "Content-Type": "application/json"
    }
});