import axios from "axios";
import { User } from "../types";

const journalApi = axios.create({
  baseURL: "http://localhost:8080",
});

export const healthCheck = async (): Promise<string> => {
  const response = await journalApi.get("/public/health-check");
  return response.data;
};

export const signUp = async (user: User): Promise<void> => {
  await journalApi.post("/public/signup", user);
};

export const login = async (user: User): Promise<string> => {
  const response = await journalApi.post("/public/login", user);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const token = localStorage.getItem("jwt");
  const response = await journalApi.get("/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
