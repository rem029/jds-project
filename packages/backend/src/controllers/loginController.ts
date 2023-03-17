import { knexPostgres } from "services/database";
import { logger } from "utilities/logger";
import { Token, UserInfo } from "@jds-project/common";
import { generateAccessToken } from "middlewares/authToken";

export const loginController = async (body: { email: string; password?: string | undefined }): Promise<Token> => {
	const { email, password } = body;
	logger.info("@loginControllers", email);

	const results = await knexPostgres.raw(
		`
			SELECT 
				*
			FROM 
				common.users
			WHERE
				email=? AND password=?;`,
		[email, password ? password : ""]
	);

	if (!results.rows.length) throw new Error("No user found");

	const returnUser = { ...results.rows[0] } as UserInfo;
	const returnToken = generateAccessToken(returnUser);
	return returnToken;
};
