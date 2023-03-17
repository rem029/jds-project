import { Request } from "express";

export interface RequestWithMetrics extends Request {
	startTime?: Date;
	endTime?: Date;
}
export interface RequestAuthInterface extends RequestWithMetrics {
	user?: { email: string; password?: string };
}

export interface ResponseInterface<T> {
	success: boolean;
	message: string;
	__typename?: string;
	data?: T;
	errorMessage?: string;
}
