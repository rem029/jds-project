import { Request } from "express";

export interface RequestWithMetrics extends Request {
	startDate?: Date;
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

export class ErrorServer extends Error {
	public statusCode;
	constructor(code: number, message: string) {
		super(message);
		this.statusCode = code;
		// 👇️ because we are extending a built-in class
		Object.setPrototypeOf(this, ErrorServer.prototype);
	}
}
