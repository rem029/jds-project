import { ErrorServer } from "../types";

export const parseBody = <T>(name: string, body: any, headers: any): T => {
	try {
		if (body[name]) return body[name] as T;
		else return JSON.parse(headers["data"] as string) as T;
	} catch (error) {
		throw new ErrorServer(500, (error as Error).message);
	}
};
