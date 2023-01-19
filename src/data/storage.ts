import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Gullkorn } from "../types";

export const UserContext = React.createContext(null);

export const storeGullkorn = async (author: string, gullkorn: Gullkorn[]) => {
  try {
    const jsonValue = JSON.stringify(gullkorn);
    await AsyncStorage.setItem(author, jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export const fetchGullkorn = async (author: string): Promise<Gullkorn[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(author);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const fetchUserID = async (): Promise<Gullkorn[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem("id");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};
