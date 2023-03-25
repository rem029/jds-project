import { Router, Response, NextFunction } from "express";
import { loginController } from "controllers/loginController";
import { authenticateLogin } from "middlewares/authUser";
import { RequestAuthInterface, ErrorServer } from "types";
import { handleServerResponse } from "helpers/serverResponse";
import { logger } from "utilities/logger";

const initializeRouter = (): Router => {
	const router = Router();

	router.post("/", authenticateLogin, (req: RequestAuthInterface, res: Response, next: NextFunction) => {
		logger.info("@loginRoute");
		const body = req.user ? req.user : { email: "", password: "" };

		loginController(body)
			.then((response) => {
				handleServerResponse(res, req, 200, {
					__typename: response.__typename,
					success: true,
					message: "Login success",
					data: response,
				});
			})
			.catch((error: ErrorServer) => {
				logger.error(`@loginController.Error ${error.message} ${body.email}`);
				next(error);
			});
	});

	return router;
};

export const loginRoute = initializeRouter();
