import { primsaClient } from "../lib/db";
import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  age: number;
  email: string;
  password: string;
  profileImageURL?: string;
}
export interface GetUserTokenPayload {
  email: string;
  password: string;
}

export class UserService {
  private static generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    return hashedPassword;
  }
  private static getUserByEmail(email: string) {
    const user = primsaClient.user.findUnique({
      where: { email },
    });
    return user;
  }
  private static getUserById(id: string) {
    const user = primsaClient.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error(`User not found`);
    return user;
  }
  public static createUser(payload: CreateUserPayload) {
    const { email, firstName, lastName, age, password } = payload;
    const salt = randomBytes(32).toString("hex");

    const hashedPassword = UserService.generateHash(salt, password);

    return primsaClient.user.create({
      data: {
        firstName,
        lastName,
        age,
        email,
        salt,
        password: hashedPassword,
      },
    });
  }
  public static async getUserToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await UserService.getUserByEmail(email);
    if (!user) throw new Error(`User not found`);
    const userSalt = user?.salt;
    const userHashedPassword = UserService.generateHash(userSalt!, password);

    if (userHashedPassword !== user?.password) {
      throw new Error(`Invalid Password`);
    }
    //generate a token
    const token = JWT.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET!
    );
    return token;
  }
}
