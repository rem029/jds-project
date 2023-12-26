import express, { Express } from "express";
import cors from "cors";

import { v1Router } from "routes/v1";
import { v2Router } from "routes/v2";
import { RequestWithMetrics } from "types";
import { errorHandler } from "../handlers";
import { logger } from "utilities/logger";

const initializeAppExpress = (): Express => {
	const app = express();

	const corsOptions = {
		origin: "*",
		optionsSuccessStatus: 200,
	};

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cors(corsOptions));

	const startDate = new Date();

	app.all("*", (req: RequestWithMetrics, _, next) => {
		const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;
		req.startTime = new Date(new Date().getTime());
		req.startDate = startDate;
		logger.info(`Requested from IP: ${ip}`);
		next();
	});

	app.use("/", v1Router);
	app.use("/v2", v2Router);
	app.use(errorHandler);

	return app;
};

export const app = initializeAppExpress();
