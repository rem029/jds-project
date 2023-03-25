import { useEffect, useMemo, useState } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getUserContext } from "store/userProvider";

export interface AxiosRequestCustomConfig extends AxiosRequestConfig {
	dontLogoutOnAuthError?: boolean;
}

export interface FetchResponse<T> {
	data: T | undefined;
	message: string;
	error: AxiosError | undefined;
	success: boolean;
}

export const useAxios = <T>(
	url: string,
	config?: AxiosRequestCustomConfig
): {
	data: T | undefined;
	error: AxiosError | undefined;
	message: string;
	success: boolean;
	loading: boolean;
	config: AxiosRequestCustomConfig | undefined;
	// eslint-disable-next-line no-unused-vars
	fetch: (config?: AxiosRequestCustomConfig) => Promise<FetchResponse<T>>;
	fetchCancel: () => void;
} => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<T | undefined>(undefined);
	const [message, setMessage] = useState("");
	const [error, setError] = useState<AxiosError | undefined>(undefined);
	const [success, setSuccess] = useState(false);

	const axiosConfig = useMemo(() => {
		return config;
	}, [config]);

	const [axiosController, setAxiosController] = useState<AbortController>();
	const { logout, notify } = getUserContext();

	useEffect(() => {
		if ((axiosConfig && axiosConfig?.method === "get") || axiosConfig?.method === "GET") {
			fetch();
		}
	}, []);

	const resetState = (): void => {
		setLoading(false);
		setData(undefined);
		setSuccess(false);
		setMessage("");
		setError(undefined);
	};

	const fetchCancel = (): void => {
		if (axiosController) axiosController.abort();
	};

	const fetch = async <T>(
		config?: AxiosRequestCustomConfig
	): Promise<FetchResponse<T>> => {
		const controller = new AbortController();
		const configMerged = {
			...axiosConfig,
			...config,
			signal: controller.signal,
		} as AxiosRequestCustomConfig;
		setAxiosController(controller);
		const request = axios.create(configMerged);

		try {
			resetState();
			setLoading(true);

			const response = await request(url);
			setLoading(false);
			setData(response.data.data ? response.data.data : response.data);
			setMessage(response.data.message ? response.data.message : response.statusText);
			setSuccess(true);

			return {
				data: response.data.data ? response.data.data : response.data,
				message: response.data.message ? response.data.message : response.statusText,
				error: undefined,
				success: true,
			};
		} catch (error) {
			const axiosError: AxiosError = error as AxiosError;

			if (axiosError) {
				notify({ message: axiosError.response?.data.message, variant: "error" });

				if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
					notify({ message: "Unauthorized request.", variant: "error" });
					if (!configMerged.dontLogoutOnAuthError) {
						logout();
					}
					resetState();
				}
				setData(axiosError.response?.data?.data || undefined);
				setSuccess(false);
				setMessage(axiosError.response?.data.message || axiosError.message);
				setError(axiosError);
				setLoading(false);

				return {
					data: undefined,
					message: axiosError.response?.data.message || axiosError.message,
					error: axiosError,
					success: false,
				};
			}
		}
		return {
			data: data as T | undefined,
			message: message,
			error: error as AxiosError,
			success: success,
		};
	};

	return {
		success,
		loading,
		data,
		error,
		message,
		config: axiosConfig,
		fetch,
		fetchCancel,
	};
};
