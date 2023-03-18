import { Grid } from "@mui/material";
import { ViewContainer } from "components";
import { IssueDataGrid } from "components/tables/issue";

export const Issues = (): JSX.Element => {
	return (
		<>
			<ViewContainer title={"Issues"}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<IssueDataGrid />
					</Grid>
				</Grid>
			</ViewContainer>
		</>
	);
};
