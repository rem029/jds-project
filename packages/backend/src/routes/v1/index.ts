import { Router } from "express";

import { loginRoute } from "./loginRoutes";
import { userRoutes } from "./usersRoutes";
import { issuesRoutes } from "./issuesRoutes";
import { miscRoutes } from "./miscRoutes";

const initializeIndexRouter = (): Router => {
	const router = Router();
	router.use("/", miscRoutes);
	router.use("/login", loginRoute);
	router.use("/users", userRoutes);
	router.use("/issues", issuesRoutes);

	return router;
};

export const v1Router = initializeIndexRouter();
