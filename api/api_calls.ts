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

/* ---------------------------- PUBLIC APIs ---------------------------- */

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

/* ---------------------------- USER APIs ---------------------------- */

export const getCurrentUser = async (): Promise<User> => {
  const response = await journalApi.get("/user/me", authHeader());
  return response.data;
};

export const updateUser = async (user: User): Promise<void> => {
  await journalApi.put("/user", user, authHeader());
};

export const deleteUser = async (): Promise<void> => {
  await journalApi.delete("/user", authHeader());
};

export const getUserGreeting = async (): Promise<string> => {
  const response = await journalApi.get("/user", authHeader());
  return response.data;
};

export const updateSentimentAnalysis = async (
  enabled: boolean
): Promise<void> => {
  await journalApi.put(
    `/user/sentiment-analysis?enabled=${enabled}`,
    null,
    authHeader()
  );
};

/* ------------------------- JOURNAL ENTRY APIs ------------------------- */

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
  await journalApi.delete(`/journal/id/${id}`, authHeader());
};

/* ---------------------------- ADMIN APIs ---------------------------- */

export const getAllUsers = async (): Promise<User[]> => {
  const response = await journalApi.get("/admin/all-users", authHeader());
  return response.data;
};

export const createAdminUser = async (user: User): Promise<void> => {
  await journalApi.post("/admin/create-admin-user", user, authHeader());
};

export const clearAppCache = async (): Promise<void> => {
  await journalApi.get("/admin/clear-app-cache", authHeader());
};

export const deleteUserByUsername = async (username: string): Promise<void> => {
  await journalApi.delete(`/admin/user/${username}`, authHeader());
};
