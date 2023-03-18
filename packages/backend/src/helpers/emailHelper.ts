import { IssueInfo } from "@jds-project/common";
import formData from "form-data";
import Mailgun from "mailgun.js";

export const sendMail = async (issueInfo: IssueInfo): Promise<void> => {
	try {
		const recipient = "jds.project.info@gmail.com";
		const sender = process.env.API_MAIL_SENDER || "";

		const mailgun = new Mailgun(formData);

		const mg = mailgun.client({
			username: "api",
			key: process.env.API_MAIL_KEY || "",
		});

		await mg.messages.create(process.env.API_MAIL_DOMAIN || "", {
			from: sender,
			to: [recipient],
			template: "jds-issue-update",
			subject: "JDS Job update on id#" + issueInfo.id,
			"h:X-Mailgun-Variables": JSON.stringify({
				id: issueInfo.id,
				title: issueInfo.title,
				status: issueInfo.status,
				assigned_user_email: issueInfo.assigned_user_email,
			}),
		});
	} catch (error) {
		throw new Error("Error while sending mail: " + (error as Error).message);
	}
};
