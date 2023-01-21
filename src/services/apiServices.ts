import axios from "axios";
import { BASE_API_URL, NEXT_AUTH_API_URL } from "@/config";

export const serverApi = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const nextAuthApi = axios.create({
    baseURL: NEXT_AUTH_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});