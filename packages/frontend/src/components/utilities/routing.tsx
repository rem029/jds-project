import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "components";
import { PageContainer } from "pages/container";
import { NotFound } from "pages/notFound";
import { StoreProvider } from "store";
import { Issues } from "pages/issues";
import { Login } from "pages/login";
import { Dashboard } from "pages/dashboard";
// import { Users } from "pages/users";

export const Routing = (): JSX.Element => {
	return (
		<BrowserRouter>
			<StoreProvider maxNotification={3}>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<PageContainer />
							</ProtectedRoute>
						}
					>
						<Route path="/" element={<Dashboard />} />
						<Route path={"dashboard"} element={<Dashboard />} />

						<Route path={"issues/:id"} element={<Issues />} />
						<Route path={"issues"} element={<Issues />} />

						{/* <Route path={"users"} element={<Users />} /> */}
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</StoreProvider>
		</BrowserRouter>
	);
};
