import { Router } from "express";
import { loginController } from "controllers/loginController";
import { authenticateLogin } from "middlewares/authUser";
import { RequestAuthInterface } from "types";
import { handleServerResponse, routerWrapper } from "../../handlers";

const initializeRouter = (): Router => {
	const router = Router();

	router.post(
		"/",
		authenticateLogin,
		routerWrapper("loginRoute", async (req: RequestAuthInterface, res, _) => {
			const body = req.user ? req.user : { email: "", password: "" };

			const response = await loginController(body);
			handleServerResponse(res, req, 200, {
				__typename: response.__typename,
				success: true,
				message: "Login success",
				data: response,
			});
		})
	);

	return router;
};

export const loginRoute = initializeRouter();
