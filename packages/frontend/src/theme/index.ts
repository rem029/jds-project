import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Shadows } from "@mui/material/styles/shadows";
import type {} from "@mui/x-data-grid/themeAugmentation";

export const themePalette = {
	action: {
		active: "#C1BEF9",
		focus: "rgba(55, 65, 81, 0.12)",
		hover: "#EFEEFF",
		selected: "#EFEEFF",
		disabledBackground: "rgba(55, 65, 81, 0.12)",
		disabled: "rgba(55, 65, 81, 0.26)",
	},
	background: {
		default: "#FBFBFB",
		paper: "#FFFFFF",
	},
	divider: "#E6E8F0",
	primary: {
		main: "#5048E5",
		light: "#8782EE",
		dark: "#3832A0",
		contrastText: "#FFFFFF",
	},
	secondary: {
		main: "#10B981",
		light: "#3FC79A",
		dark: "#0B815A",
		contrastText: "#FFFFFF",
	},
	success: {
		main: "#14B8A6",
		light: "#43C6B7",
		dark: "#0E8074",
		contrastText: "#FFFFFF",
	},
	info: {
		main: "#8D8D8D",
		light: "#CBCBCB",
		dark: "#656565",
		contrastText: "#FFFFFF",
	},
	warning: {
		main: "#FFB020",
		light: "#FFBF4C",
		dark: "#B27B16",
		contrastText: "#FFFFFF",
	},
	error: {
		main: "#D14343",
		light: "#DA6868",
		dark: "#922E2E",
		contrastText: "#FFFFFF",
	},
	text: {
		primary: "#001E47",
		secondary: "#65748B",
		disabled: "rgba(55, 65, 81, 0.48)",
	},
};

export const themeShadows: Shadows = [
	"none",
	"0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
	"0px 1px 2px rgba(100, 116, 139, 0.12)",
	"0px 1px 4px rgba(100, 116, 139, 0.12)",
	"0px 1px 5px rgba(100, 116, 139, 0.12)",
	"0px 1px 6px rgba(100, 116, 139, 0.12)",
	"0px 2px 6px rgba(100, 116, 139, 0.12)",
	"0px 3px 6px rgba(100, 116, 139, 0.12)",
	"0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
	"0px 5px 12px rgba(100, 116, 139, 0.12)",
	"0px 5px 14px rgba(100, 116, 139, 0.12)",
	"0px 5px 15px rgba(100, 116, 139, 0.12)",
	"0px 6px 15px rgba(100, 116, 139, 0.12)",
	"0px 7px 15px rgba(100, 116, 139, 0.12)",
	"0px 8px 15px rgba(100, 116, 139, 0.12)",
	"0px 9px 15px rgba(100, 116, 139, 0.12)",
	"0px 10px 15px rgba(100, 116, 139, 0.12)",
	"0px 12px 22px -8px rgba(100, 116, 139, 0.25)",
	"0px 13px 22px -8px rgba(100, 116, 139, 0.25)",
	"0px 14px 24px -8px rgba(100, 116, 139, 0.25)",
	"0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
	"0px 25px 50px rgba(100, 116, 139, 0.25)",
	"0px 25px 50px rgba(100, 116, 139, 0.25)",
	"0px 25px 50px rgba(100, 116, 139, 0.25)",
	"0px 25px 50px rgba(100, 116, 139, 0.25)",
];

export const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 1000,
			lg: 1200,
			xl: 1920,
		},
	},
	components: {
		MuiBreadcrumbs: {
			styleOverrides: {
				root: {
					color: grey[500],
				},
			},
		},
		MuiGrid: {
			styleOverrides: {
				root: {
					paddingLeft: 0,
				},
			},
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
			styleOverrides: {
				root: {
					textTransform: "none",
				},
				sizeSmall: {
					padding: "6px 16px",
				},
				sizeMedium: {
					padding: "8px 20px",
				},
				sizeLarge: {
					padding: "11px 24px",
				},
				textSizeSmall: {
					padding: "7px 12px",
				},
				textSizeMedium: {
					padding: "9px 16px",
				},
				textSizeLarge: {
					padding: "12px 16px",
				},
			},
		},
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: "32px 24px",
					"&:last-child": {
						paddingBottom: "32px",
					},
				},
			},
		},
		MuiCardHeader: {
			defaultProps: {
				titleTypographyProps: {
					variant: "h6",
				},
				subheaderTypographyProps: {
					variant: "body2",
				},
			},
			styleOverrides: {
				root: {
					padding: "32px 24px",
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				"*": {
					boxSizing: "border-box",
					margin: 0,
					padding: 0,
				},
				html: {
					MozOsxFontSmoothing: "grayscale",
					WebkitFontSmoothing: "antialiased",
					display: "flex",
					flexDirection: "column",
					minHeight: "100%",
					width: "100%",
					margin: 0,
				},
				":root": {
					overflowX: "hidden",
				},
				body: {
					display: "flex",
					flex: "1 1 auto",
					flexDirection: "column",
					minHeight: "100%",
					width: "100%",
					margin: "0",
				},
				"#__next": {
					display: "flex",
					flex: "1 1 auto",
					flexDirection: "column",
					height: "100%",
					width: "100%",
					margin: "0",
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				notchedOutline: {
					borderColor: "#E6E8F0",
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					backgroundColor: themePalette.primary.main,
					".MuiTableCell-root": {
						color: themePalette.primary.main,
					},
					"& .MuiTableCell-root": {
						borderBottom: "2px solid",
						borderColor: themePalette.primary.main,
						fontSize: "12px",
						fontWeight: 600,
						lineHeight: 1,
						letterSpacing: 0.5,
						textTransform: "uppercase",
					},
					"& .MuiTableCell-paddingCheckbox": {
						paddingTop: 4,
						paddingBottom: 4,
					},
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					borderBottom: "2px solid",
					borderColor: themePalette.primary.main,
				},
			},
		},
		MuiDataGrid: {
			styleOverrides: {
				root: {
					backgroundColor: themePalette.background.paper,
				},
				columnHeader: {
					backgroundColor: themePalette.primary.main,
					color: themePalette.primary.contrastText,
					boxShadow: themeShadows[10] + " !important",
				},
				row: {
					backgroundColor: themePalette.background.default,
					color: themePalette.text.primary,
				},
				cell: {
					borderColor: themePalette.divider,
				},
			},
		},
	},
	palette: themePalette,
	shape: {
		borderRadius: 8,
	},
	shadows: themeShadows,
	typography: {
		button: {
			fontWeight: 600,
		},
		fontFamily: "Poppins",
		body1: {
			fontSize: "1rem",
			fontWeight: 400,
			lineHeight: 1.5,
		},
		body2: {
			fontSize: "0.875rem",
			fontWeight: 400,
			lineHeight: 1.57,
		},
		subtitle1: {
			fontSize: "1rem",
			fontWeight: 500,
			lineHeight: 1.75,
		},
		subtitle2: {
			fontSize: "0.875rem",
			fontWeight: 500,
			lineHeight: 1.57,
		},
		overline: {
			fontSize: "0.75rem",
			fontWeight: 600,
			letterSpacing: "0.5px",
			lineHeight: 2.5,
			textTransform: "uppercase",
		},
		caption: {
			fontSize: "0.75rem",
			fontWeight: 400,
			lineHeight: 1.66,
		},
		h1: {
			fontWeight: 700,
			fontSize: "3.5rem",
			lineHeight: 1.375,
		},
		h2: {
			fontWeight: 700,
			fontSize: "3rem",
			lineHeight: 1.375,
		},
		h3: {
			fontWeight: 700,
			fontSize: "2.25rem",
			lineHeight: 1.375,
		},
		h4: {
			fontWeight: 700,
			fontSize: "2rem",
			lineHeight: 1.375,
		},
		h5: {
			fontWeight: 600,
			fontSize: "1.5rem",
			lineHeight: 1.375,
		},
		h6: {
			fontWeight: 600,
			fontSize: "1.125rem",
			lineHeight: 1.375,
		},
	},
});
