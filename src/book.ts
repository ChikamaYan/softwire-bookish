import {User} from "./user";
import * as moment from "moment";

export class Book {
    bookid: number;
    isbn: number;
    title: string;
    author: string;
    catalogue: string;
    borrowedby: User;
    returndate: moment.Moment; //ISO string for now
}