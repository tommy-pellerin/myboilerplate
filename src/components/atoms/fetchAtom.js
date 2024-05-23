import { atom } from 'jotai';
import Cookies from 'js-cookie';
import { dataAtom } from './dataAtom';

export const fetchAtom = atom(
  get => ({ data: get(dataAtom), isLoading: false }), // Initialize isLoading to false
  async (get, set, url) => {
    set(fetchAtom, { ...get(fetchAtom), isLoading: true }); // Set isLoading to true before fetching

    const token = Cookies.get("token");
    const headers = {
      "Content-Type": "application/json",
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, { headers });
    const data = await response.json();

    set(dataAtom, data); // Update the value of dataAtom
    set(fetchAtom, { data, isLoading: false }); // Set isLoading to false after fetching
  }
);