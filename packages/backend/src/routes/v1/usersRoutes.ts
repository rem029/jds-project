import express, { Router, Response, NextFunction } from "express";
import { handleServerResponse } from "../../helpers/serverResponse";
import { ErrorServer, RequestAuthInterface } from "../../types";
import { logger } from "../../utilities/logger";
import { getUserMeInfoController, getUserInfoController } from "../../controllers/userController";
import { authenticateToken } from "../../middlewares/authToken";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get("/me", authenticateToken, async (req: RequestAuthInterface, res: Response, next: NextFunction) => {
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
			.catch((error: ErrorServer) => {
				logger.error(`@getUserMeInfoController.Error ${error.message}`);
				next(error);
			});
	});

	router.get("/", authenticateToken, async (req: RequestAuthInterface, res: Response, next: NextFunction) => {
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
			.catch((error: ErrorServer) => {
				logger.error(`@getUsersInfoController.Error ${error.message}`);
				next(error);
			});
	});

	return router;
};

export const userRoutes = initializeRouter();
