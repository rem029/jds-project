import { IssueInfo } from "@jds-project/common";
import { Close, Edit, Save } from "@mui/icons-material";
import {
	Box,
	Typography,
	Grid,
	Divider,
	IconButton,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	Button,
	CircularProgress,
} from "@mui/material";
import { useAxios } from "hooks/useAxios";
import { useEffect, useState } from "react";
import { getUserContext } from "store/userProvider";
import { URL_ISSUES } from "utils/constants";
import { getToken } from "utils/storage";
import { IssueFormEdit } from "./issueEdit";
import { IssueFormSkeleton } from "./issueSkeleton";
import { IssueFormView } from "./issueView";

type FormType = "edit" | "view";

interface IssueFormInterface {
	issueId: number;
	handleClose: () => void;
	formTypeParam?: FormType;
}

export const IssueForm = ({
	issueId,
	handleClose,
	formTypeParam = "view",
}: IssueFormInterface): JSX.Element => {
	const { notify } = getUserContext();
	const [formType, setFormType] = useState<FormType>(formTypeParam);
	const [fields, setFields] = useState<IssueInfo | undefined>();

	const {
		data: issuesData,
		loading: issuesLoading,
		success: issuesSuccess,
		error: issuesError,
		fetch: issueFetch,
	} = useAxios<IssueInfo>(URL_ISSUES + "/" + issueId, {
		method: "GET",
		headers: {
			Authorization: `Token ${getToken()}`,
		},
		dontLogoutOnAuthError: true,
	});

	const {
		fetch: updateIssuePost,
		loading: updateIssueLoading,
		error: updateIssueError,
	} = useAxios<boolean>(URL_ISSUES + "/" + issueId);

	useEffect(() => {
		if (issuesError) notify({ message: issuesError.message, variant: "error" });
		if (updateIssueError) notify({ message: updateIssueError.message, variant: "error" });
	}, [issuesError, updateIssueError]);

	useEffect(() => {
		if (issuesData && !issuesLoading && issuesSuccess) setFields(issuesData);
	}, [issuesData, issuesLoading, issuesSuccess]);

	const handleFormEditClick = (): void => {
		setFormType("edit");
	};

	const handleFormSubmitClick = (): void => {
		console.log("@handleFormSubmitClick", fields);

		updateIssuePost({
			method: "PATCH",
			headers: {
				Authorization: `Token ${getToken()}`,
				Accept: "application/json",
				"Content-type": "application/json",
				data: JSON.stringify({ ...fields }),
			},
		})
			.then((response) => {
				const { message, success } = response;

				if (success) notify({ message: message, variant: "success" });

				setFormType("view");
				issueFetch();
			})
			.catch((error) => {
				notify({ message: error.message, variant: "error" });
			});
	};

	return (
		<Dialog open onClose={handleClose} maxWidth="sm">
			<DialogTitle>
				<IconButton
					size="small"
					color="error"
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
					}}
					onClick={() => handleClose()}
				>
					<Close />
				</IconButton>
			</DialogTitle>

			<DialogTitle>
				<Typography variant="h6" color="primary.main">
					{fields?.title}
				</Typography>
			</DialogTitle>

			<DialogContent>
				<Grid container component="form" spacing={2}>
					<Grid component={Box} item xs={12}>
						<Divider />
					</Grid>

					{issuesLoading && <IssueFormSkeleton />}
					{!issuesLoading && (
						<>
							{formType === "view" && <IssueFormView fields={fields as IssueInfo} />}

							{formType === "edit" && (
								<IssueFormEdit
									fields={fields as IssueInfo}
									setFields={setFields as React.Dispatch<React.SetStateAction<IssueInfo>>}
									disableFields={updateIssueLoading}
								/>
							)}
						</>
					)}
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button
					disabled={updateIssueLoading}
					variant="contained"
					color="info"
					fullWidth
					onClick={() => (formType === "view" ? handleClose() : setFormType("view"))}
				>
					{formType === "view" && <>Close</>}
					{formType === "edit" && <>Cancel</>}
				</Button>

				{formType === "view" && (
					<Button
						variant="contained"
						color="primary"
						fullWidth
						onClick={() => handleFormEditClick()}
						endIcon={
							issuesLoading ? <CircularProgress color="info" size={24} /> : <Edit />
						}
						disabled={issuesLoading || fields?.status === "done"}
					>
						Edit
					</Button>
				)}

				{formType === "edit" && (
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						onClick={() => handleFormSubmitClick()}
						endIcon={
							issuesLoading || updateIssueLoading ? (
								<CircularProgress color="info" size={24} />
							) : (
								<Save />
							)
						}
						disabled={issuesLoading || updateIssueLoading}
					>
						{updateIssueLoading ? <>Saving...</> : <>Save</>}
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};
