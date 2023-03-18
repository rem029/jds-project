import { Grid, Typography } from "@mui/material";
import { ViewContainer } from "components";

export const Users = (): JSX.Element => {
	return (
		<ViewContainer title={"Users"}>
			<Grid container spacing={1} sx={{ p: 1 }}>
				<Grid item xs={12}>
					<Typography>Testing</Typography>
				</Grid>
			</Grid>
		</ViewContainer>
	);
};
