import { knexPostgres } from "services/database";
import { logger } from "../utilities/logger";
import { IssueInfo } from "@jds-project/common";
import { sendMail } from "../helpers/emailHelper";

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

export const updateIssueController = async (issue: IssueInfo): Promise<boolean> => {
	logger.info("@updateIssueController " + issue.assigned_user_id);

	const { status, id, assigned_user_id } = issue;
	const assignedUserId = Number(assigned_user_id) <= 0 || !assigned_user_id ? null : assigned_user_id;

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
		[assignedUserId, status.toLowerCase(), id]
	);

	await sendMail(issue);
	return true;
};

export const addIssueController = async (issue: IssueInfo): Promise<boolean> => {
	logger.info("@addIssueController");

	const { title, description, status } = issue;

	await knexPostgres.raw(
		`
		INSERT INTO common.issues(
			title, description, status, created_at, updated_at)
		VALUES (?, ?, ?, current_timestamp, current_timestamp);
        `,
		[title, description, status]
	);

	return true;
};
