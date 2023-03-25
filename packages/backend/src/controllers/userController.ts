import { knexPostgres } from "services/database";
import { UserInfo } from "@jds-project/common";
import { logger } from "utilities/logger";
import { ErrorServer } from "types";

export const getUserMeInfoController = async (body: { email: string }): Promise<UserInfo> => {
	const { email } = body;
	logger.info("@getUserInfoController");

	const results = await knexPostgres.raw(
		`
			SELECT 
				*
			FROM 
				common.users
			WHERE
				email=?;`,
		[email]
	);

	if (!results.rows.length) throw new ErrorServer(400, "No user found");

	const response = { ...results.rows[0] } as UserInfo;
	return response;
};

export const getUserInfoController = async (): Promise<UserInfo[]> => {
	logger.info("@getUserInfoController");

	const results = await knexPostgres.raw(
		`
			SELECT 
				*
			FROM 
				common.users
			ORDER BY
				created_at DESC`,
		[]
	);

	const response = results.rows as UserInfo[];
	return response;
};
