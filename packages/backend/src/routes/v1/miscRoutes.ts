import express, { Router } from "express";
import { elapsedTime } from "../../helpers/now";
import { RequestWithMetrics } from "../../types";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get("/test", (req: RequestWithMetrics, res) => {
		res.json({
			status: "running",
			started: req.startDate?.toUTCString(),
			upTime: elapsedTime(req.startDate?.getTime() || new Date().getTime(), new Date().getTime()),
		});
	});

	router.get("/favicon.ico", (_, res) => {
		res.redirect("/");
	});

	return router;
};

export const miscRoutes = initializeRouter();
