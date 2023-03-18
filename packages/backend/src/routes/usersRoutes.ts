import express, { Router, Response } from "express";
import { handleServerResponse, handleServerError } from "../helpers/serverResponse";
import { RequestAuthInterface } from "../types";
import { logger } from "../utilities/logger";
import { getUserMeInfoController, getUserInfoController } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authToken";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get("/me", authenticateToken, async (req: RequestAuthInterface, res: Response) => {
		logger.info("@getUsersInfoRoute");
		const { email } = req.user ? req.user : { email: "" };

		getUserMeInfoController({ email })
			.then((response) => {
				handleServerResponse(res, req, 200, {
					__typename: response.__typename,
					success: true,
					message: "Get user info success",
					data: response,
				});
			})
			.catch((error) => {
				logger.error(`@getUserMeInfoController.Error ${error.message}`);
				handleServerError(res, req, 500, {
					success: false,
					message: "Get user info error",
					errorMessage: (error as Error).message,
				});
			});
	});

	router.get("/", authenticateToken, async (req: RequestAuthInterface, res: Response) => {
		logger.info("@getUsersInfoRoute");

		getUserInfoController()
			.then((response) => {
				handleServerResponse(res, req, 200, {
					__typename: response[0].__typename,
					success: true,
					message: "Get user info success",
					data: response,
				});
			})
			.catch((error) => {
				logger.error(`@getUsersInfoController.Error ${error.message}`);
				handleServerError(res, req, 500, {
					success: false,
					message: "Get user info error",
					errorMessage: (error as Error).message,
				});
			});
	});

	return router;
};

export const userRoutes = initializeRouter();
