import { ErrorRequestHandler, NextFunction, Response } from "express";
import { logger } from "utilities/logger";
import { ResponseInterface, RequestAuthInterface, ErrorServer } from "../types";

export const handleServerResponse = <T>(
	res: Response,
	req: RequestAuthInterface,
	code: number,
	payload: ResponseInterface<T>
): void => {
	const endTime = new Date();
	const startTime = req.startTime ? req.startTime.getTime() : 0;
	logger.info(`Route: ${req.url}`);
	logger.info(`Start time: ${req.startTime}`);
	logger.info(`End Time: ${endTime}`);
	logger.info(`responseTime(ms): ${endTime.getTime() - startTime}`);
	logger.info(`responseTime(ms): ${endTime.getTime() - startTime}`);
	res.status(code).json(payload);
};

export const handleServerError = <T>(
	res: Response,
	req: RequestAuthInterface,
	code: number,
	payload: ResponseInterface<T>
): void => {
	code = code ? code : 500;
	const endTime = new Date();
	const startTime = req.startTime ? req.startTime.getTime() : 0;
	logger.error(`Route: ${req.url}`);
	logger.error(`Start time: ${req.startTime}`);
	logger.error(`End Time: ${endTime}`);
	logger.error(`responseTime(ms): ${endTime.getTime() - startTime}`);
	logger.error(`@handleError ${code} payload: ${JSON.stringify(payload)}`);
	res.status(code).json(payload);
};

export const errorHandler: ErrorRequestHandler = (
	err: ErrorServer,
	req: RequestAuthInterface,
	res: Response,
	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	next: NextFunction
): void => {
	handleServerError(res, req, err.statusCode, { success: false, message: "error handler FN " + err.message });
};
