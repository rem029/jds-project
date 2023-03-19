import { IssueInfo, UserInfo } from "@jds-project/common";
import {
	Grid,
	FormControlLabel,
	Switch,
	Typography,
	Paper,
	Box,
	Chip,
} from "@mui/material";
import {
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridToolbarQuickFilter,
	DataGrid,
	GridLinkOperator,
} from "@mui/x-data-grid";
import { statusColor } from "helpers/colorHelper";
import { dateFormatNative } from "helpers/dateHelper";
import { theme } from "../../theme";
import { useAxios } from "hooks/useAxios";
import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { URL_ISSUES, URL_USER_INFO, NOTISTACK_AUTO_HIDE_MS } from "utils/constants";
import { getToken } from "utils/storage";
import { IssueForm } from "..";

interface DataGridCustomToolbarInterface {
	showOnlyAssignedToMe: boolean;
	setShowOnlyAssignedToMe: React.Dispatch<React.SetStateAction<boolean>>;
	quickFilter: string;
	setQuickFilter: React.Dispatch<React.SetStateAction<string>>;
}

const DataGridCustomToolbar = ({
	setShowOnlyAssignedToMe,
	showOnlyAssignedToMe,
	quickFilter,
	setQuickFilter,
}: DataGridCustomToolbarInterface): JSX.Element => {
	return (
		<GridToolbarContainer>
			<Grid container spacing={2}>
				<Grid item md={4} sm={12} xs={12}>
					<GridToolbarColumnsButton />
					<GridToolbarFilterButton />
					<GridToolbarDensitySelector />
					<GridToolbarExport />
				</Grid>
				<Grid item md={6} sm={12} xs={6}>
					<GridToolbarQuickFilter
						sx={{ width: "100%" }}
						onChange={(e) => setQuickFilter(e.target.value)}
						value={quickFilter}
						debounceMs={200}
					/>
				</Grid>
				<Grid item md={2} sm={12} xs={6}>
					<FormControlLabel
						control={
							<Switch
								checked={showOnlyAssignedToMe}
								onClick={() => setShowOnlyAssignedToMe((prevState) => !prevState)}
							/>
						}
						label={
							<Typography variant="subtitle2" color="primary.main">
								Assigned to me
							</Typography>
						}
					/>
				</Grid>
			</Grid>
		</GridToolbarContainer>
	);
};

export const IssueDataGrid = (): JSX.Element => {
	const [showOnlyAssignedToMe, setShowOnlyAssignedToMe] = useState(false);
	const [quickFilter, setQuickFilter] = useState("");
	const [userId, setUserId] = useState("");

	const { enqueueSnackbar } = useSnackbar();
	const { id: selectedIssueId } = useParams();
	const navigate = useNavigate();

	const {
		data: issuesData,
		loading: issuesLoading,
		success: issuesSuccess,
		error: issuesError,
		fetch: issueFetch,
	} = useAxios<IssueInfo[]>(URL_ISSUES, {
		method: "GET",
		headers: {
			Authorization: `Token ${getToken()}`,
		},
		dontLogoutOnAuthError: true,
	});

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
	});

	useEffect(() => {
		if (userError)
			enqueueSnackbar(userError.message, {
				variant: "error",
				autoHideDuration: NOTISTACK_AUTO_HIDE_MS,
			});

		if (!userLoading && userSuccess && userData) {
			setUserId(userData.email);
		}
	}, [userData, userLoading, userSuccess, userError]);

	useEffect(() => {
		if (issuesError) {
			enqueueSnackbar(issuesError.message, {
				variant: "error",
				autoHideDuration: NOTISTACK_AUTO_HIDE_MS,
			});
		}
	}, [issuesData, issuesLoading, issuesSuccess, issuesError]);

	useEffect(() => {
		issueFetch();
	}, [selectedIssueId]);

	const handleIssueFormClose = (): void => {
		navigate("/issues/");
	};

	const handleOnClickDataGrid = (id: number, source: "edit" | "delete"): void => {
		if (source === "edit") navigate("/issues/" + id);
	};

	return (
		<Paper
			sx={{
				[theme.breakpoints.down("md")]: { p: 0.5 },
				[theme.breakpoints.up("md")]: {
					p: 2,
				},
			}}
		>
			{selectedIssueId && (
				<IssueForm issueId={Number(selectedIssueId)} handleClose={handleIssueFormClose} />
			)}
			<DataGrid
				filterModel={{
					items: showOnlyAssignedToMe
						? [
								{
									columnField: "assigned_user_email",
									operatorValue: "equals",
									value: userId as unknown as string,
								},
						  ]
						: [],
					quickFilterLogicOperator: GridLinkOperator.Or,
					quickFilterValues: quickFilter
						.split(",")
						.map((value) => value.trim())
						.filter((value) => value !== ""),
				}}
				components={{
					Toolbar: DataGridCustomToolbar,
				}}
				componentsProps={{
					toolbar: {
						setShowOnlyAssignedToMe,
						showOnlyAssignedToMe,
						quickFilter,
						setQuickFilter,
					},
				}}
				hideFooterSelectedRowCount
				autoHeight
				headerHeight={80}
				rowHeight={96}
				pageSize={10}
				rowsPerPageOptions={[10, 50, 100]}
				loading={issuesLoading}
				getRowId={(row) => row.id}
				rows={issuesData ? (issuesData as readonly IssueInfo[]) : []}
				columns={[
					// {
					// 	field: "action",
					// 	headerName: "Action",
					// 	headerAlign: "center",
					// 	sortable: false,
					// 	hideable: false,
					// 	filterable: false,
					// 	align: "center",
					// 	renderCell: (params) => (
					// 		<>
					// 			<IconButton
					// 				onClick={() => handleOnClickDataGrid(Number(params.id), "edit")}
					// 				size="small"
					// 				color="primary"
					// 			>
					// 				<Edit />
					// 			</IconButton>
					// 		</>
					// 	),
					// },
					{
						field: "id",
						headerName: "ID",
						headerAlign: "center",
						hideable: true,
						maxWidth: 56,
						align: "center",
						renderCell: (params) => (
							<Typography variant="caption">{params.value}</Typography>
						),
					},
					{
						field: "title",
						headerName: "Title",
						headerAlign: "center",
						minWidth: 120,
						flex: 1,
						renderCell: (params) => (
							<Box
								p={1}
								width="100%"
								height="100%"
								display="flex"
								flexDirection="column"
								justifyContent="flex-start"
								alignItems="flex-start"
								gap={1}
							>
								<Typography
									variant="subtitle2"
									sx={{ fontWeight: 600, cursor: "pointer" }}
									color="primary.dark"
									onClick={() => handleOnClickDataGrid(Number(params.id), "edit")}
								>
									{params.value}
								</Typography>
								<Typography
									component="p"
									variant="caption"
									whiteSpace="pre-wrap"
									textOverflow="ellipsis"
								>
									{issuesData?.find((issue) => issue.id === params.id)?.description}
								</Typography>
							</Box>
						),
					},
					{
						field: "status",
						headerName: "Status",
						headerAlign: "center",
						minWidth: 120,
						align: "center",
						renderCell: (params) => (
							<Chip
								label={params.value}
								color={statusColor[params.value]}
								variant="filled"
							/>
						),
					},
					{
						field: "assigned_user_email",
						headerName: "Assigned user",
						headerAlign: "center",
						minWidth: 240,
						align: "center",
						renderCell: (params) => (
							<Typography
								variant="caption"
								color={params.value ? "inherit" : "info.main"}
							>
								{params.value ? params.value : "Unassigned"}
							</Typography>
						),
					},
					{
						field: "created_at",
						headerName: "created At",
						headerAlign: "center",
						minWidth: 240,
						align: "center",
						renderCell: (params) => (
							<Typography variant="caption">
								{dateFormatNative(new Date(params.value), "Asia/Qatar")}
							</Typography>
						),
					},
					{
						field: "updated_at",
						headerName: "Updated At",
						headerAlign: "center",
						minWidth: 240,
						align: "center",
						renderCell: (params) => (
							<Typography variant="caption">
								{dateFormatNative(new Date(params.value), "Asia/Qatar")}
							</Typography>
						),
					},
				]}
			/>
		</Paper>
	);
};
