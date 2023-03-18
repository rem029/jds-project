import { Grid, Box } from "@mui/material";
import { HistogramChart, IssueDataGrid, LineChart, ViewContainer } from "components";

export const Dashboard = (): JSX.Element => {
	return (
		<ViewContainer title={"Dashboard"}>
			<Grid container spacing={1} justifyContent="center" flexDirection="column">
				<Grid component={Box} item xl={6} sm={12}>
					<LineChart />
				</Grid>
				<Grid component={Box} item xl={6} sm={12}>
					<HistogramChart />
				</Grid>

				<Grid item xs={12}>
					<IssueDataGrid />
				</Grid>
			</Grid>
		</ViewContainer>
	);
};
