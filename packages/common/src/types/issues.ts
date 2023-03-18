export interface IssueInfo {
	__typename?: "IssueInfo";
	id: number;
	title: string;
	description: string;
	status: string;
	assigned_user_id: string;
	assigned_user_email: string;
	created_at: Date;
	updated_at: Date;
}
