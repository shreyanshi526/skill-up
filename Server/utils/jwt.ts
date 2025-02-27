require("dotenv").config();
import { CookieOptions } from 'express';
import { IUser } from "../Models/user.model";
import { Response } from "express";
import { redis } from "./redis";

interface ITokenOptions {  //writing this fro saving it our cookies
  expires: Date;
  maxAge: number;
  httpOnly: boolean,
  sameSite: 'lax' | 'strict' | 'name' | undefined;
  secure?: boolean;
}

//parse enviroment variable to intregte with fallback value - for times when our envo variables are not working

export const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10);
export const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200", 10);

//options for cookies
export const accessTokenOptions: CookieOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
}
export const refreshTokenOptions: CookieOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
}

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  //upload session(when user is logged in) to redis 


  redis.set(user._id, JSON.stringify(user) as any);



  //only set secure is  true in production

  if (process.env.NODE_ENV === 'production') {
    accessTokenOptions.secure = true;

  }


  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);


  //cookie
  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  })
}