import { API_URL } from "../constants";
import { School } from "../types";

export const fetchData = async (query: string): Promise<School[]> => {
  const url = `${API_URL}${query}&limit=10`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
