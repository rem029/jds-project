export const parseBody = <T>(name: string, body: any, headers: any): T => {
	if (body[name]) return body[name] as T;
	else return JSON.parse(headers["data"] as string) as T;
};
