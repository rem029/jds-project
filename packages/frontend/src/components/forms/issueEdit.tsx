import { IssueInfo, UserInfo } from "@jds-project/common";
import { Article, Person } from "@mui/icons-material";
import { Grid, Typography, Box, Divider } from "@mui/material";
import { AutoCompleteInputOptions } from "components/utilities/autoCompleteInput";
import { dateFormatNative } from "helpers/dateHelper";
import { useAxios } from "hooks/useAxios";
import { useSnackbar } from "notistack";

import { useEffect, useMemo } from "react";
import { NOTISTACK_AUTO_HIDE_MS, URL_USERS } from "utils/constants";
import { MENU_ITEM_STATUS } from "utils/menuItems";
import { getToken } from "utils/storage";
import { AutoCompleteInput } from "..";

interface IssueFormEditInterface {
	fields: IssueInfo;
	setFields: React.Dispatch<React.SetStateAction<IssueInfo>>;
	disableFields?: boolean;
}

export const IssueFormEdit = ({
	fields,
	setFields,
	disableFields = false,
}: IssueFormEditInterface): JSX.Element => {
	const { enqueueSnackbar } = useSnackbar();

	const {
		data: usersData,
		loading: usersLoading,
		success: usersSuccess,
		error: usersError,
	} = useAxios<UserInfo[]>(URL_USERS, {
		method: "GET",
		headers: {
			Authorization: `Token ${getToken()}`,
		},
		dontLogoutOnAuthError: false,
	});

	useEffect(() => {
		if (usersError) {
			enqueueSnackbar(usersError.message, {
				variant: "error",
				autoHideDuration: NOTISTACK_AUTO_HIDE_MS,
			});
		}
	}, [usersData, usersLoading, usersSuccess, usersError]);

	const menuItemStatus = useMemo(() => {
		return MENU_ITEM_STATUS.map((item) => ({
			id: item.value,
			name: item.label,
		}));
	}, []);

	const menuAssignedUsers = useMemo(() => {
		const defaultItems = [
			{
				id: fields.assigned_user_id,
				name: fields.assigned_user_email,
			},
			{
				id: "-1",
				name: "Unassigned",
			},
		];

		return usersData
			? [
					...usersData.map((user) => ({
						id: user.id ? user.id.toString() : "-1",
						name: user.email,
					})),
					{
						id: "-1",
						name: "Unassigned",
					},
			  ]
			: [...defaultItems];
	}, [usersData]);

	const handleAutoCompleteChange: (
		// eslint-disable-next-line no-unused-vars
		name: string,
		// eslint-disable-next-line no-unused-vars
		value: AutoCompleteInputOptions | null
	) => void = (name, value) => {
		setFields((prevState) => ({ ...prevState, [name]: value?.id }));

		if (name === "assigned_user_id")
			setFields((prevState) => ({
				...prevState,
				assigned_user_email: menuAssignedUsers.find((user) => user.id === value?.id || -1)
					?.name as string,
			}));
	};

	return (
		<>
			<Grid item xs={2}>
				<Article color="info" />
			</Grid>
			<Grid item xs={2}>
				<Typography variant="caption">Description</Typography>
			</Grid>
			<Grid item xs={8} />
			<Grid item xs={12}>
				<Typography variant="subtitle2">{fields?.description}</Typography>
			</Grid>
			<Grid component={Box} item xs={12}>
				<Divider />
			</Grid>

			<Grid item xs={2} />
			<Grid item xs={12}>
				<AutoCompleteInput
					required
					name="status"
					label="Please select status"
					options={menuItemStatus}
					value={menuItemStatus.find((item) => item.id === fields.status)}
					handleChange={handleAutoCompleteChange}
					disabled={disableFields}
				/>
			</Grid>

			<Grid component={Box} item xs={12}>
				<Divider />
			</Grid>

			<Grid item xs={2}>
				<Person color="info" />
			</Grid>
			<Grid item xs={10}>
				<Typography variant="caption">Assigned User</Typography>
			</Grid>

			<Grid item xs={12}>
				<AutoCompleteInput
					required
					name="assigned_user_id"
					label="Please select user to assign"
					options={menuAssignedUsers}
					value={
						fields.assigned_user_id
							? menuAssignedUsers.find((item) => {
									return item.id.toString() === fields.assigned_user_id.toString();
							  })
							: { id: "-1", name: "Unassigned" }
					}
					loading={usersLoading}
					handleChange={handleAutoCompleteChange}
					disabled={disableFields}
				/>
			</Grid>
			<Grid component={Box} item xs={12}>
				<Divider />
			</Grid>

			<Grid item xs={12}>
				<Typography variant="caption">Created at</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="subtitle2">
					{dateFormatNative(new Date(fields?.created_at || new Date()), "Asia/Qatar")}
				</Typography>
			</Grid>

			<Grid item xs={12}>
				<Typography variant="caption">Updated at</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="subtitle2">
					{dateFormatNative(new Date(fields?.updated_at || new Date()), "Asia/Qatar")}
				</Typography>
			</Grid>
		</>
	);
};
