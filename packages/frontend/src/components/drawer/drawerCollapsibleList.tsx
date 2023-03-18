import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
	Collapse,
	List,
	ListItemButton,
} from "@mui/material";
import { theme } from "../../theme";

interface DrawerCollapsibleListInterface {
	linkText: string;
	linkTextIcon: JSX.Element;
	subList?: { label: string; url: string; icon: JSX.Element }[];
	disabled?: boolean;
	colorLabel?: string;
	subMenuCollapsed: Record<string, boolean>;
	handleSubMenuOpen: (linkText: string) => void; // eslint-disable-line no-unused-vars
	handleChangePage: (link: string) => void; // eslint-disable-line no-unused-vars
}

export const DrawerCollapsibleList = ({
	linkText,
	linkTextIcon,
	disabled,
	subList,
	colorLabel = theme.palette.primary.main,
	subMenuCollapsed,
	handleSubMenuOpen,
	handleChangePage,
}: DrawerCollapsibleListInterface): JSX.Element => {
	const hasSublist: boolean = subList ? subList.length > 0 : false;

	return (
		<>
			<ListItem
				sx={{ pt: 2, pb: 2 }}
				button
				key={linkText}
				disabled={disabled}
				onClick={
					hasSublist
						? () => handleSubMenuOpen(linkText)
						: () => handleChangePage(linkText)
				}
			>
				<ListItemIcon>{linkTextIcon}</ListItemIcon>
				<ListItemText
					primary={
						<Typography color="primary.main" variant="body1">
							{linkText}
						</Typography>
					}
				/>
				{hasSublist && (
					<>
						{subMenuCollapsed[linkText] ? (
							<ExpandLess sx={{ color: (theme) => theme.palette.info.light }} />
						) : (
							<ExpandMore sx={{ color: (theme) => theme.palette.info.light }} />
						)}
					</>
				)}
			</ListItem>
			<Collapse in={subMenuCollapsed[linkText]} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{subList &&
						subList.map((item, index) => (
							<ListItemButton
								key={index + item.label}
								sx={{ pl: 3, color: colorLabel }}
								onClick={() => handleChangePage(item.url)}
							>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText
									primary={
										<Typography color="primary.light" variant="body2">
											{item.label}
										</Typography>
									}
								/>
							</ListItemButton>
						))}
				</List>
			</Collapse>
		</>
	);
};
