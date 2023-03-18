import * as React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import { NOTISTACK_AUTO_HIDE_MS, URL_USER_INFO } from "utils/constants";
import { UserInfo } from "@jds-project/common";
import { useAxios } from "hooks/useAxios";
import { getToken } from "utils/storage";
import { dateHelperFormatProper } from "helpers/dateHelper";

import logo from "../assets/jds-logo.png";
import { useSnackbar } from "notistack";

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	width: number;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open, width }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${width}px)`,
		marginLeft: `${width}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export const Header = ({ open, setOpen, width }: AppBarProps): JSX.Element => {
	const { enqueueSnackbar } = useSnackbar();
	const handleDrawerOpen = (): void => {
		if (setOpen) setOpen(true);
	};

	const [userName, setUserName] = React.useState("");

	const {
		data: userData,
		loading: userLoading,
		success: userSuccess,
		error: userError,
	} = useAxios<UserInfo>(URL_USER_INFO, {
		method: "GET",
		headers: {
			Authorization: `Token ${getToken()}`,
		},
		// dontLogoutOnAuthError: true,
	});

	React.useEffect(() => {
		if (userError) {
			setUserName("Error");
			enqueueSnackbar(userError.message, {
				variant: "warning",
				autoHideDuration: NOTISTACK_AUTO_HIDE_MS,
			});
		}

		if (!userLoading && userSuccess && userData) {
			setUserName(userData.email);
		}
	}, [userData, userLoading, userSuccess, userError]);

	return (
		<AppBar
			position="fixed"
			open={open}
			width={width}
			sx={{
				backgroundColor: (theme) => theme.palette.background.default,
				color: (theme) => theme.palette.primary.main,
			}}
		>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					sx={{ ...(open && { display: "none" }) }}
				>
					<MenuOutlined />
				</IconButton>
				<Box sx={{ flexGrow: 1 }}>
					<Typography variant="body1" noWrap>
						Job Dispatch System
					</Typography>
				</Box>

				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						alignItems: "center",
					}}
				>
					<Typography
						variant="caption"
						paddingLeft={2}
						paddingRight={3}
						align="right"
						sx={{
							display: {
								xs: "none",
								sm: "none",
								md: "none",
								lg: "block",
								xl: "block",
							},
						}}
					>
						Hello {userName}, Today is {dateHelperFormatProper(new Date())}
					</Typography>

					<Box component="img" src={logo} sx={{ width: 36 }} />
				</Box>
			</Toolbar>
		</AppBar>
	);
};
