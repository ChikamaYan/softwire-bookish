import {User} from "./user";
import * as moment from "moment";

export class Book {
    bookID: number;
    ISBN: number;
    title: string;
    author: string;
    catalogue: string;
    borrowedBy: User;
    returnDate: string; //ISO string for now
}