import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { logger } from "utilities/logger";
import { UserInfo, Token } from "@jds-project/common";
import { ErrorServer, RequestAuthInterface } from "types";

export const generateAccessToken = (payload: object, expiresIn = "24h"): Token => {
	console.log("@generateAccessToken", payload);
	return {
		token: jwt.sign(payload, process.env.API_TOKEN_SECRET as jwt.Secret, {
			expiresIn: expiresIn,
		}),
		expiresIn,
	};
};

export const generateRefreshToken = (payload: object, expiresIn = "1y"): Token => {
	return {
		token: jwt.sign(payload, process.env.API_TOKEN_REFRESH as jwt.Secret, {
			expiresIn: expiresIn,
		}),
		expiresIn,
	};
};

export const decodeToken = (token: string): string | jwt.JwtPayload =>
	jwt.verify(token, process.env.API_TOKEN_SECRET as jwt.Secret);

export const authenticateToken = (req: RequestAuthInterface, res: Response, next: NextFunction): void => {
	logger.info("@middleware authenticateToken");
	const tokenFromHeader = req.headers["authorization"];
	const token = tokenFromHeader && tokenFromHeader.split(" ")[1];

	if (!token) {
		throw new ErrorServer(403, "A token is required for authentication.");
	}

	try {
		const decodedUser = decodeToken(token) as UserInfo;
		logger.info(`@middleware authenticateToken decoded userId: ${decodedUser.email}`);
		req.user = { email: decodedUser.email };
	} catch (error) {
		logger.error(`@middleware authenticateToken error: ${JSON.stringify(error)}`);
		next(new ErrorServer(401, "Token has expired or invalid."));
	}
	next();
};
