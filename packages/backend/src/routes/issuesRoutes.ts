import express, { Router, Response } from "express";
import { handleServerResponse, handleServerError } from "../helpers/serverResponse";
import { RequestAuthInterface, RequestWithMetrics } from "../types";
import { logger } from "../utilities/logger";

import { authenticateToken } from "../middlewares/authToken";
import {
	addIssueController,
	getIssueController,
	getIssuesController,
	updateIssueController,
} from "../controllers/issuesController";
import { IssueInfo } from "@jds-project/common";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get("/", authenticateToken, async (req: RequestAuthInterface, res: Response) => {
		logger.info("@getIssuesRoute");

		getIssuesController()
			.then((response) => {
				handleServerResponse(res, req, 200, {
					__typename: response[0].__typename,
					success: true,
					message: "Get issues success",
					data: response,
				});
			})
			.catch((error) => {
				logger.error(`@getIssuesRoute.Error ${error.message}`);
				handleServerError(res, req, 500, {
					success: false,
					message: "Get issues error",
					errorMessage: (error as Error).message,
				});
			});
	});

	router.get("/:id", authenticateToken, async (req: RequestWithMetrics, res: Response) => {
		logger.info("@getIssueRoute");

		getIssueController(req.params.id as unknown as number)
			.then((response) => {
				handleServerResponse(res, req, 200, {
					__typename: response.__typename,
					success: true,
					message: "Get issue success",
					data: response,
				});
			})
			.catch((error) => {
				logger.error(`@getIssuesRoute.Error ${error.message}`);
				handleServerError(res, req, 500, {
					success: false,
					message: "Get issue error",
					errorMessage: (error as Error).message,
				});
			});
	});

	router.patch("/:id", authenticateToken, async (req: RequestAuthInterface, res: Response) => {
		logger.info("@updateIssuesRoute");

		const fields = (
			req.body.updateIssueController ? req.body.updateIssueController : JSON.parse(req.headers["data"] as string)
		) as IssueInfo;

		updateIssueController({ ...fields, id: Number(req.params.id) })
			.then((response) => {
				handleServerResponse(res, req, 200, {
					__typename: "boolean",
					success: true,
					message: "Update issue success. Notification has been sent.",
					data: response,
				});
			})
			.catch((error) => {
				logger.error(`@updateIssuesRoute.Error ${error.message}`);
				handleServerError(res, req, 500, {
					success: false,
					message: "Update issue error",
					errorMessage: (error as Error).message,
				});
			});
	});

	router.post("/", authenticateToken, async (req: RequestAuthInterface, res: Response) => {
		logger.info("@addIssueController");

		const fields = (
			req.body.addIssueController ? req.body.addIssueController : JSON.parse(req.headers["data"] as string)
		) as IssueInfo;

		addIssueController(fields)
			.then((response) => {
				handleServerResponse(res, req, 200, {
					__typename: "boolean",
					success: true,
					message: "Add issue success.",
					data: response,
				});
			})
			.catch((error) => {
				logger.error(`@addIssueController.Error ${error.message}`);
				handleServerError(res, req, 500, {
					success: false,
					message: "Add issue error",
					errorMessage: (error as Error).message,
				});
			});
	});

	return router;
};

export const issuesRoutes = initializeRouter();
