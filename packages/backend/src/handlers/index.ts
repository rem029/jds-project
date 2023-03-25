import { ErrorRequestHandler, NextFunction, Response, Request } from "express";
import { logger } from "../utilities/logger";
import { ResponseInterface, RequestAuthInterface, ErrorServer } from "../types";

const handleServerLogs = <T>(
	type: "info" | "error",
	res: Response,
	req: RequestAuthInterface,
	code: number,
	payload: ResponseInterface<T>
): void => {
	const endTime = new Date();
	const startTime = req.startTime ? req.startTime.getTime() : 0;
	logger[type](`Route: ${req.url}`);
	// logger[type](`Start time: ${req.startTime}`);
	// logger[type](`End Time: ${endTime}`);
	logger[type](`responseTime(ms): ${endTime.getTime() - startTime}`);
	if (type === "error") logger.error(`@handleError ${code} payload: ${JSON.stringify(payload)}`);
};

export const handleServerResponse = <T>(
	res: Response,
	req: RequestAuthInterface,
	code: number,
	payload: ResponseInterface<T>
): void => {
	handleServerLogs("info", res, req, code, payload);
	res.status(code).json(payload);
};

export const handleServerError = <T>(
	res: Response,
	req: RequestAuthInterface,
	code: number,
	payload: ResponseInterface<T>
): void => {
	code = code ? code : 500;
	handleServerLogs("info", res, req, code, payload);
	res.status(code).json(payload);
};

export const errorHandler: ErrorRequestHandler = (
	err: ErrorServer,
	req: RequestAuthInterface,
	res: Response,
	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	next: NextFunction
): void => {
	handleServerError(res, req, err.statusCode, { success: false, message: err.message });
};

// eslint-disable-next-line no-unused-vars
export type RouterWrapperController = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const routerWrapper =
	(name: string, controller: RouterWrapperController) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			logger.info(`@${name}`);
			await controller(req, res, next);
		} catch (error) {
			logger.error(`@${name} error ${(error as ErrorServer).message}`);
			next(error);
		}
	};
