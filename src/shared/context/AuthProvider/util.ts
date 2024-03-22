import { Api } from "../../services/api"
import { IUser } from "./types";

export function setUserLocalStorage(user: IUser | null){
  localStorage.setItem('u', JSON.stringify(user))
}

export function getUserLocalStorage() {
  const json = localStorage.getItem('u')
  if(!json){
    return null
  }
  const user = JSON.parse(json)
  return user ?? null 
}

export async function LoginRequest(email: string, password: string){
  try {
    const response = await Api.get(`/users?email=${email}&password=${password}`);
    return response.data[0];
  } catch (error) {
    console.error('Error logging in:', error);
    return null
  }
}