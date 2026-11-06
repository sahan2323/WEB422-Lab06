import { atom } from "jotai";
import usersData from "./data/users.json";

export const usersAtom = atom(usersData.users);