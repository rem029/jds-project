import { IssueInfo } from "@jds-project/common";
import { Article, Person } from "@mui/icons-material";
import { Grid, Typography, Box, Divider, Chip } from "@mui/material";
import { statusColor } from "helpers/colorHelper";
import { dateFormatNative } from "helpers/dateHelper";

export const IssueFormView = ({ fields }: { fields: IssueInfo }): JSX.Element => {
	return (
		<>
			<Grid item xs={2}>
				<Article color="info" />
			</Grid>
			<Grid item xs={2}>
				<Typography variant="caption">Description</Typography>
			</Grid>
			<Grid item xs={8} />
			<Grid item xs={12}>
				<Typography variant="subtitle2">{fields?.description}</Typography>
			</Grid>
			<Grid component={Box} item xs={12}>
				<Divider />
			</Grid>

			<Grid item xs={2} />
			<Grid item xs={12}>
				<Chip
					label={fields?.status}
					color={statusColor[fields?.status || ""]}
					variant="filled"
				/>
			</Grid>

			<Grid component={Box} item xs={12}>
				<Divider />
			</Grid>

			<Grid item xs={2}>
				<Person color="info" />
			</Grid>
			<Grid item xs={10}>
				<Typography variant="caption">Assigned User</Typography>
			</Grid>

			<Grid item xs={12}>
				<Typography variant="subtitle2">
					{fields?.assigned_user_email ? fields?.assigned_user_email : "Unassigned"}
				</Typography>
			</Grid>
			<Grid component={Box} item xs={12}>
				<Divider />
			</Grid>

			<Grid item xs={12}>
				<Typography variant="caption">Created at</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="subtitle2">
					{dateFormatNative(new Date(fields?.created_at || new Date()), "Asia/Qatar")}
				</Typography>
			</Grid>

			<Grid item xs={12}>
				<Typography variant="caption">Updated at</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="subtitle2">
					{dateFormatNative(new Date(fields?.updated_at || new Date()), "Asia/Qatar")}
				</Typography>
			</Grid>
		</>
	);
};
