import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { deleteToken } from "utils/storage";
import { useSnackbar, VariantType } from "notistack";
import { NOTISTACK_AUTO_HIDE_MS } from "utils/constants";

type NotifyType = { message: string; variant?: VariantType };
interface UserContextInterface {
	logout: () => void;
	// eslint-disable-next-line no-unused-vars
	notify: (params: NotifyType) => void;
}

const userContext = createContext({} as UserContextInterface);

const { Provider } = userContext;

export const getUserContext = (): UserContextInterface => useContext(userContext);

export const UserProvider = (props: { children: JSX.Element }): JSX.Element => {
	const { children } = props;
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const notify = (params: NotifyType): void => {
		const { message, variant } = params;

		enqueueSnackbar(message, {
			autoHideDuration: NOTISTACK_AUTO_HIDE_MS,
			preventDuplicate: true,
			variant: variant,
		});
	};

	const logout = (): void => {
		deleteToken();
		navigate("/login");
		notify({ message: "Logout successful" });
	};

	return <Provider value={{ logout: logout, notify: notify }}>{children}</Provider>;
};
