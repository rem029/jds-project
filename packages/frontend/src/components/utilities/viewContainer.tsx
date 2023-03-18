import { Container, Typography } from "@mui/material";
import { theme } from "../../theme";
interface PageContainerInterface {
	title: string;
	children: JSX.Element;
}
export const ViewContainer = ({
	title,
	children,
}: PageContainerInterface): JSX.Element => {
	return (
		<Container
			maxWidth="xl"
			sx={{
				[theme.breakpoints.down("md")]: {
					flexGrow: 1,
					padding: 0,
					mt: 0,
				},
				[theme.breakpoints.up("md")]: {
					flexGrow: 1,
					padding: 1,
					mt: 0.5,
				},
			}}
		>
			<Typography color="primary" variant="h5" component="div" paddingBottom={1}>
				{title}
			</Typography>
			{children}
		</Container>
	);
};
