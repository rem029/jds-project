import { Router } from "express";

const initializeIndexRouter = (): Router => {
	const router = Router();

	router.get("/", (req, res) => {
		res.json({ message: "from v2" });
	});

	return router;
};

export const v2Router = initializeIndexRouter();
