import AsyncStorage from "@react-native-async-storage/async-storage";
import { Gullkorn } from "../types";
import { firestore } from "../services/firestore";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  getDoc,
  doc,
} from "firebase/firestore";

export const storeGullkorn = async (gullkorn: Gullkorn) => {
  try {
    const jsonValue = JSON.stringify(gullkorn);
    await addDoc(collection(firestore, "gullkorn"), gullkorn);
  } catch (e) {
    console.error(e);
  }
};

export const deleteGullkorn = async (id: string) => {
  try {
    const docRef = doc(collection(firestore, "gullkorn"), id);
    await deleteDoc(docRef);
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
