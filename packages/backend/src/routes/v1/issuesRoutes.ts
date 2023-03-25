import express, { Router, Response, NextFunction } from "express";
import { handleServerResponse } from "../../helpers/serverResponse";
import { parseBody } from "../../helpers/parseBody";
import { ErrorServer, RequestAuthInterface, RequestWithMetrics } from "../../types";
import { logger } from "../../utilities/logger";
import { authenticateToken } from "../../middlewares/authToken";
import {
	addIssueController,
	getIssueControllerById,
	getIssuesController,
	updateIssueController,
} from "../../controllers/issuesController";
import { IssueInfo } from "@jds-project/common";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get("/", authenticateToken, async (req: RequestAuthInterface, res: Response, next: NextFunction) => {
		try {
			logger.info("@getIssuesRoute");

			const response = await getIssuesController();
			handleServerResponse(res, req, 200, {
				__typename: response[0].__typename,
				success: true,
				message: "Get issues success",
				data: response,
			});
		} catch (error) {
			logger.error(`@getIssuesRoute.Error ${(error as ErrorServer).message}`);
			next(error);
		}
	});

	router.get("/:id", authenticateToken, async (req: RequestWithMetrics, res: Response, next: NextFunction) => {
		try {
			logger.info("@getIssueRoute");

			const response = await getIssueControllerById(req.params.id as unknown as number);
			handleServerResponse(res, req, 200, {
				__typename: response.__typename,
				success: true,
				message: "Get issue success",
				data: response,
			});
		} catch (error) {
			logger.error(`@getIssuesRoute.Error ${(error as ErrorServer).message}`);
			next(error);
		}
	});

	router.patch("/:id", authenticateToken, async (req: RequestAuthInterface, res: Response, next: NextFunction) => {
		try {
			logger.info("@updateIssuesRoute");

			const fields = parseBody<IssueInfo>("updateIssueController", req.body, req.headers);
			const response = await updateIssueController({ ...fields, id: Number(req.params.id) });

			handleServerResponse(res, req, 200, {
				__typename: "boolean",
				success: true,
				message: "Update issue success. Notification has been sent.",
				data: response,
			});
		} catch (error) {
			logger.error(`@updateIssuesRoute.Error ${(error as ErrorServer).message}`);
			next(error);
		}
	});

	router.post("/", authenticateToken, async (req: RequestAuthInterface, res: Response, next: NextFunction) => {
		try {
			logger.info("@addIssuesRoute");

			const fields = parseBody<IssueInfo>("addIssueController", req.body, req.headers);
			const response = await addIssueController(fields);

			handleServerResponse(res, req, 200, {
				__typename: "boolean",
				success: true,
				message: "Add issue success.",
				data: response,
			});
		} catch (error) {
			logger.error(`@addIssuesRoute.Error ${(error as ErrorServer).message}`);
			next(error);
		}
	});

	return router;
};

export const issuesRoutes = initializeRouter();
