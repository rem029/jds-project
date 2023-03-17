import { Grid, Typography } from "@mui/material";

import { PageContainer } from "./utilities/pageContainer";

export const Dashboard = (): JSX.Element => {
	return (
		<PageContainer title={"Dashboard"}>
			<Grid
				container
				spacing={1}
				justifyContent="center"
				sx={{ p: 1 }}
				flexDirection="column"
			>
				<Typography>Testing</Typography>
			</Grid>
		</PageContainer>
	);
};
