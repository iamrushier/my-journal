import axios from "axios";
import { User, JournalEntry } from "../types";

const journalApi = axios.create({
  baseURL: "http://localhost:8080",
});

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
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
  const response = await journalApi.get("/user/me", authHeader());
  return response.data;
};

// Journal Entry APIs
export const getUserJournalEntries = async (): Promise<JournalEntry[]> => {
  const response = await journalApi.get("/journal", authHeader());
  return response.data;
};

export const getJournalEntryById = async (
  id: string
): Promise<JournalEntry> => {
  const response = await journalApi.get(`/journal/id/${id}`, authHeader());
  return response.data;
};

export const createJournalEntry = async (
  entry: JournalEntry
): Promise<JournalEntry> => {
  const response = await journalApi.post("/journal", entry, authHeader());
  return response.data;
};

export const updateJournalEntry = async (
  id: string,
  entry: JournalEntry
): Promise<JournalEntry> => {
  const response = await journalApi.put(
    `/journal/id/${id}`,
    entry,
    authHeader()
  );
  return response.data;
};

export const deleteJournalEntry = async (id: string): Promise<void> => {
  console.log(id);
  await journalApi.delete(`/journal/id/${id}`, authHeader());
};
