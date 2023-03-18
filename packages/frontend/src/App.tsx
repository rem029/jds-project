import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { Routing } from "./components";
import { CssBaseline } from "@mui/material";

const App = (): JSX.Element => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Routing />
		</ThemeProvider>
	);
};

export default App;
