import express, { Router } from "express";
import { handleServerResponse, routerWrapper } from "../../handlers";
import { RequestAuthInterface } from "../../types";
import { getUserMeInfoController, getUserInfoController } from "../../controllers/userController";
import { authenticateToken } from "../../middlewares/authToken";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get(
		"/me",
		authenticateToken,
		routerWrapper("getUsersInfoRoute", async (req: RequestAuthInterface, res, _) => {
			const { email } = req.user ? req.user : { email: "" };
			const response = await getUserMeInfoController({ email });

			handleServerResponse(res, req, 200, {
				__typename: response.__typename,
				success: true,
				message: "Get user info success",
				data: response,
			});
		})
	);

	router.get(
		"/",
		authenticateToken,
		routerWrapper("getUsersInfoRoute", async (req, res, _) => {
			const response = await getUserInfoController();

			handleServerResponse(res, req, 200, {
				__typename: response[0].__typename,
				success: true,
				message: "Get user info success",
				data: response,
			});
		})
	);

	return router;
};

export const userRoutes = initializeRouter();
