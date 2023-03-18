import { Box, Grid } from "@mui/material";
import { HistogramChart, IssueDataGrid, LineChart, ViewContainer } from "components";

export const Dashboard = (): JSX.Element => {
	return (
		<ViewContainer title={"Dashboard"}>
			<Grid container spacing={1} justifyContent="center">
				<Grid item component={Box} xs={12} sm={12} md={12} lg={6} xl={6}>
					<LineChart />
				</Grid>

				<Grid item component={Box} xs={12} sm={12} md={12} lg={6} xl={6}>
					<HistogramChart />
				</Grid>

				<Grid item xs={12}>
					<IssueDataGrid />
				</Grid>
			</Grid>
		</ViewContainer>
	);
};
