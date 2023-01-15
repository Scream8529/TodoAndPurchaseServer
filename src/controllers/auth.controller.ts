import bcrypt from "bcrypt";
import userService from "../services/user.service";
import jwt from "jsonwebtoken";
import { wraperService } from "../services/wraper.service";
import { Get, Route, Tags, Post, Body, Path, Request } from "tsoa";
import { LoginData, RegistrationData, AuthResponse } from "../models/auth";
import { IRequestAfterMidlware } from "../models";
import { secretHashKey } from "../config";

@Route("auth")
@Tags("Auth")
class AuthController {
  @Post("/registration")
  public async registration(
    @Body()
    body: RegistrationData
  ): Promise<AuthResponse> {
    try {
      const { userName, password } = body;
      const candidate = await userService.getUserByUserName(userName);
      if (candidate) {
        return wraperService.errorResponse([
          {
            message: `User with username ${userName} already exist`,
          },
        ]);
      }

      const hashpass = await bcrypt.hash(password, 5);

      const user = await userService.createUser({
        userName,
        pass: hashpass,
      });
      return wraperService.successResponse({
        message: "User was created",
        user,
      });
    } catch (error) {
      return wraperService.errorResponse([{ message: "Server error" }]);
    }
  }
  @Post("/login")
  async login(
    @Body()
    body: LoginData
  ): Promise<AuthResponse> {
    try {
      const { userName, password } = body;
      const user = await userService.getUserByUserName(userName);
      if (!user || !user.pass) {
        return wraperService.errorResponse([{ message: "User not found" }]);
      }
      const isPassValid = bcrypt.compareSync(password, user.pass);
      if (!isPassValid) {
        return wraperService.errorResponse([{ message: "Invalid Password" }]);
      }
      const token = jwt.sign({ id: user.id }, secretHashKey, {
        expiresIn: "1 days",
      });
      return wraperService.successResponse({
        token,
        user,
      });
    } catch (error) {
      console.log(error);
      wraperService.errorResponse([{ message: "Server error" }]);
    }
  }
  @Get("/auth")
  async auth(@Request() req: IRequestAfterMidlware): Promise<AuthResponse> {
    try {
      const user = await userService.getUserById(req.user.id);
      //todo remove console.log
      console.log(user);
      const token = jwt.sign({ id: user.id }, secretHashKey, {
        expiresIn: "1h",
      });
      return wraperService.successResponse({
        token,
        user,
      });
    } catch (error) {
      wraperService.errorResponse([{ message: "Server error" }]);
    }
  }
}

const authController = new AuthController();

export default authController;
