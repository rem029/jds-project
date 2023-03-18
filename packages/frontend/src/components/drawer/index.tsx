import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Button, Drawer as DrawerMUI } from "@mui/material";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { CircularProgress } from "@mui/material";
import { ExitToApp, Dashboard, ViewList } from "@mui/icons-material";
import { useAxios } from "hooks/useAxios";
import { UserInfo } from "@jds-project/common";
import { useNavigate } from "react-router-dom";
import { URL_USER_INFO } from "utils/constants";
import { getToken } from "utils/storage";
import { getUserContext } from "store/userProvider";
import { dateHelperFormatProper } from "helpers/dateHelper";
import { DrawerCollapsibleList } from "./drawerCollapsibleList";

interface AppDrawerProps extends MuiAppBarProps {
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	width: number;
}

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

export const Drawer = ({ open, setOpen, width }: AppDrawerProps): JSX.Element => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [userName, setUserName] = useState("");
	const [subMenuCollapsed, setSubMenuCollapsed] = useState<Record<string, boolean>>({});
	const { logout } = getUserContext();
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

	useEffect(() => {
		if (userError) setUserName("Error");

		if (!userLoading && userSuccess && userData) {
			setUserName(userData.email);
		}
	}, [userData, userLoading, userSuccess, userError]);

	const colorIcon = theme.palette.primary.light;
	const colorLabel = theme.palette.primary.main;

	const handleDrawerClose = (): void => {
		if (setOpen) setOpen(false);
	};

	const handleLogout = (): void => {
		logout();
	};

	const handleChangePage = (link: string): void => {
		if (setOpen) setOpen(false);
		navigate("/" + link.toLowerCase());
	};

	const handleSubMenuOpen = (linkText: string): void => {
		setSubMenuCollapsed((currentValue) => ({
			...currentValue,
			[linkText]: !currentValue[linkText],
		}));
	};

	return (
		<DrawerMUI
			sx={{
				width: width,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: width,
					boxSizing: "border-box",
				},
			}}
			variant="persistent"
			anchor="left"
			open={open}
		>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List
				sx={{
					display: {
						xs: "block",
						sm: "block",
						md: "block",
						lg: "none",
						xl: "none",
					},
				}}
			>
				<ListItem>
					<ListItemText>
						<Typography variant="caption" noWrap letterSpacing={1}>
							{userLoading ? <CircularProgress size={24} /> : `Hello, ${userName}`}
						</Typography>
					</ListItemText>
				</ListItem>

				<ListItem>
					<Typography variant="caption" noWrap letterSpacing={1}>
						{dateHelperFormatProper(new Date())}
					</Typography>
				</ListItem>
			</List>

			<Divider
				sx={{
					display: {
						xs: "block",
						sm: "block",
						md: "block",
						lg: "none",
						xl: "none",
					},
				}}
			/>

			<List>
				<DrawerCollapsibleList
					handleChangePage={handleChangePage}
					handleSubMenuOpen={handleSubMenuOpen}
					linkText="Dashboard"
					linkTextIcon={<Dashboard htmlColor={colorIcon} />}
					subMenuCollapsed={subMenuCollapsed}
					colorLabel={colorLabel}
				/>

				<DrawerCollapsibleList
					handleChangePage={handleChangePage}
					handleSubMenuOpen={handleSubMenuOpen}
					linkText="Issues"
					linkTextIcon={<ViewList htmlColor={colorIcon} />}
					subMenuCollapsed={subMenuCollapsed}
					colorLabel={colorLabel}
				/>

				{/* <DrawerCollapsibleList
					handleChangePage={handleChangePage}
					handleSubMenuOpen={handleSubMenuOpen}
					linkText="Users"
					linkTextIcon={<People htmlColor={colorIcon} />}
					subMenuCollapsed={subMenuCollapsed}
					colorLabel={colorLabel}
				/> */}
			</List>
			<Divider />
			<List
				sx={{
					display: "flex",
					justifyContent: "flex-start",
					alignItems: "flex-end",
					p: 1,
				}}
			>
				<Button
					fullWidth
					variant="outlined"
					onClick={handleLogout}
					startIcon={<ExitToApp />}
					color="info"
				>
					Logout
				</Button>
			</List>
		</DrawerMUI>
	);
};
