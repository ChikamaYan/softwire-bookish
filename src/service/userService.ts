import {User} from "../repo/userRepo";
import {Borrowed} from "../repo/borrowedRepo";

export class UserService {
    private userRepo;
    private borrowedRepo;

    constructor(userRepo, borrowedRepo) {
        this.userRepo = userRepo;
        this.borrowedRepo = borrowedRepo;
    }

    getUserByUsername(username): Promise<User> {
        return this.userRepo.getUserByUsername(username);
    }

    getBorrowedByUserID(userID): Promise<Borrowed[]> {
        return this.borrowedRepo.getBorrowedByUserID(userID);
    }
}