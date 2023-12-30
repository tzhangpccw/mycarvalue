import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signup(email: string, passwork: string) {
        //See if Email is in use
        const user = await this.usersService.find(email)

        if (user) {
            throw new BadRequestException('email in use')
        }
        //Hash the users password
        //1. Generate a salt

        //2. Hash the salt and the password together

        //3. Join in the hashed result and the salt together

        // Create a new user and save it 

        //return the user
    }

    signin() {

    }
}