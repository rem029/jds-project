export const statusColor: Record<
	string,
	| "error"
	| "success"
	| "warning"
	| "default"
	| "primary"
	| "secondary"
	| "info"
	| undefined
> = {
	todo: "error",
	"in-review": "warning",
	done: "success",
};
