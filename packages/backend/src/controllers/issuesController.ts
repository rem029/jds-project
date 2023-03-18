import { knexPostgres } from "services/database";
import { logger } from "../utilities/logger";
import { IssueInfo } from "@jds-project/common";

export const getIssuesController = async (): Promise<IssueInfo[]> => {
	logger.info("@getIssuesController");

	const results = await knexPostgres.raw(
		`		
		SELECT 
			common.issues.id,title,
			description,
			assigned_user_id,
			email as assigned_user_email,
			status,
			common.issues.created_at,
			common.issues.updated_at
		FROM 
			common.issues
		LEFT JOIN
			common.users
		ON
			assigned_user_id = common.users.id
		ORDER BY
			common.issues.created_at DESC;	
        `
	);

	const response = results.rows as IssueInfo[];

	return response;
};

export const getIssueController = async (id: number): Promise<IssueInfo> => {
	logger.info("@getIssueController", id);

	const results = await knexPostgres.raw(
		`
		SELECT 
			common.issues.id,title,
			description,
			assigned_user_id,
			email as assigned_user_email,
			status,
			common.issues.created_at,
			common.issues.updated_at
		FROM 
			common.issues
		LEFT JOIN
			common.users
		ON
			assigned_user_id = common.users.id
		WHERE
			common.issues.id = ?
		ORDER BY
			common.issues.created_at DESC;	
        `,
		[id]
	);

	if (!results.rows.length) throw new Error("No issue found");
	const response = { ...results.rows[0] } as IssueInfo;

	return response;
};

export const updateIssueController = async (
	issueId: number,
	assignedUserId: number,
	status: string
): Promise<boolean> => {
	logger.info("@updateIssueController " + assignedUserId);

	await knexPostgres.raw(
		`
		UPDATE
			common.issues
		SET
			assigned_user_id = ?,
			status = ?,
			updated_at = current_timestamp
		WHERE
			id = ?;
        `,
		[assignedUserId <= 0 ? null : assignedUserId, status.toLowerCase(), issueId]
	);

	return true;
};
