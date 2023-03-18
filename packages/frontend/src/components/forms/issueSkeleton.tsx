import { Article, Person } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { Grid, Box, Typography, Divider } from "@mui/material";

export const IssueFormSkeleton = (): JSX.Element => {
	return (
		<>
			<Grid item xs={2}>
				<Article color="info" />
			</Grid>
			<Grid item xs={2}>
				<Skeleton width="100%" />
			</Grid>
			<Grid item xs={8} />
			<Grid item xs={12}>
				<Skeleton width="100%" />
			</Grid>
			<Grid component={Box} item xs={12}>
				<Divider />
			</Grid>
			<Grid item xs={2} />
			<Grid item xs={12}>
				<Skeleton width="100%" />
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
				<Skeleton width="100%" />
			</Grid>
			<Grid component={Box} item xs={12}>
				<Divider />
			</Grid>
			<Grid item xs={12}>
				<Typography variant="caption">Created at</Typography>
			</Grid>
			<Grid item xs={12}>
				<Skeleton width="100%" />
			</Grid>
			<Grid item xs={12}>
				<Typography variant="caption">Updated at</Typography>
			</Grid>
			<Grid item xs={12}>
				<Skeleton width="100%" />
			</Grid>
			<Grid item xs={12}>
				<Skeleton width="100%" />
			</Grid>
		</>
	);
};
