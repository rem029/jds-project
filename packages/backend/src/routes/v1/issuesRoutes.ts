import express, { Router } from "express";
import { handleServerResponse, routerWrapper } from "../../handlers";
import { parseBody } from "../../helpers/parseBody";
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

	router.get(
		"/",
		authenticateToken,
		routerWrapper("getIssuesRoute", async (req, res, _) => {
			const response = await getIssuesController();

			handleServerResponse(res, req, 200, {
				__typename: response[0].__typename,
				success: true,
				message: "Get issues success",
				data: response,
			});
		})
	);

	router.get(
		"/:id",
		authenticateToken,
		routerWrapper("getIssueRouteById", async (req, res, _) => {
			const response = await getIssueControllerById(req.params.id as unknown as number);

			handleServerResponse(res, req, 200, {
				__typename: response.__typename,
				success: true,
				message: "Get issue success",
				data: response,
			});
		})
	);

	router.patch(
		"/:id",
		authenticateToken,
		routerWrapper("updateIssuesRoute", async (req, res, _) => {
			const fields = parseBody<IssueInfo>("updateIssueController", req.body, req.headers);
			const response = await updateIssueController({ ...fields, id: Number(req.params.id) });

			handleServerResponse(res, req, 200, {
				__typename: "boolean",
				success: true,
				message: "Update issue success. Notification has been sent.",
				data: response,
			});
		})
	);

	router.post(
		"/",
		authenticateToken,
		routerWrapper("addIssuesRoute", async (req, res, _) => {
			const fields = parseBody<IssueInfo>("addIssueController", req.body, req.headers);
			const response = await addIssueController(fields);

			handleServerResponse(res, req, 200, {
				__typename: "boolean",
				success: true,
				message: "Add issue success.",
				data: response,
			});
		})
	);

	return router;
};

export const issuesRoutes = initializeRouter();
