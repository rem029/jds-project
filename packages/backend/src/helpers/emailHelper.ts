import { IssueInfo } from "@jds-project/common";
import formData from "form-data";
import Mailgun from "mailgun.js";
import { ErrorServer } from "types";

export const sendMail = async (issueInfo: IssueInfo): Promise<void> => {
	try {
		const recipient = "jds.project.info@gmail.com";
		const sender = process.env.API_MAIL_SENDER?.trim() || "";

		console.log("process.env.API_MAIL_SENDER", process.env.API_MAIL_SENDER);
		console.log("process.env.API_MAIL_KEY", process.env.API_MAIL_KEY);
		console.log("process.env.API_MAIL_DOMAIN", process.env.API_MAIL_DOMAIN);

		const mailgun = new Mailgun(formData);

		const mg = mailgun.client({
			username: "api",
			key: process.env.API_MAIL_KEY?.trim() || "",
		});

		await mg.messages.create(process.env.API_MAIL_DOMAIN?.trim() || "", {
			from: sender,
			to: [recipient],
			template: "jds-issue-update",
			subject: "JDS Job update on id#" + issueInfo.id,
			"h:X-Mailgun-Variables": JSON.stringify({
				id: issueInfo.id,
				title: issueInfo.title,
				status: issueInfo.status,
				assigned_user_email: issueInfo.assigned_user_email ? issueInfo.assigned_user_email : "Unassigned",
			}),
		});
	} catch (error) {
		throw new ErrorServer(500, "Error while sending mail: " + (error as ErrorServer).message);
	}
};
