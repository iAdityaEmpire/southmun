import axios from "axios";
import React from "react";
import useFirebase from "../../auth/useFirebase";
import AdminLayout from "../../components/layout/AdminLayout";
import AuthContext from "../../context/AuthContext";
export default function AboutPage(): React.ReactElement {
	const [target, setTarget] = React.useState("");
	const [admin, setAdmin] = React.useState("same");
	const [verified, setVerified] = React.useState("same");
	const firebase = useFirebase();
	const {
		user,
		loading,
		verified: userVerified,
		admin: userAdmin,
	} = React.useContext(AuthContext);
	return (
		<AdminLayout title={"Members"}>
			<>
				<p>
					Your details: verified: {userVerified + ""} admin:{" "}
					{userAdmin + ""}
				</p>
				<div className="block">
					<b>UID or email to modify</b>
					<input
						type="text"
						className="form-input"
						value={target}
						onChange={(e) => setTarget(e.target.value)}
					/>
				</div>
				<div className="block">
					<b>Admin? (yes/no/same)</b>
					<input
						type="text"
						className="form-input"
						value={admin}
						onChange={(e) => setAdmin(e.target.value)}
					/>
				</div>
				<div className="block">
					<b>Verified? (yes/no/same)</b>
					<input
						type="text"
						className="form-input"
						value={verified}
						onChange={(e) => setVerified(e.target.value)}
					/>
				</div>
				<div className="block">
					<b>New Permissions Object:</b>
					<p>
						{(() => {
							const newPermissions: any = {};
							if (["yes", "no"].includes(admin)) {
								newPermissions.admin = admin === "yes";
							} else if (admin !== "same") {
								return "invalid";
							}
							if (["yes", "no"].includes(verified)) {
								newPermissions.verified = verified === "yes";
							} else if (verified !== "same") {
								return "invalid";
							}
							return JSON.stringify(newPermissions);
						})()}
					</p>
				</div>
				<button
					onClick={async () => {
						if (!firebase) return;
						const newPermissions: any = {};
						if (["yes", "no"].includes(admin)) {
							newPermissions.admin = admin === "yes";
						} else if (admin !== "same") {
							alert("admin is invalid");
						}
						if (["yes", "no"].includes(verified)) {
							newPermissions.verified = verified === "yes";
						} else if (verified !== "same") {
							alert("verified is invalid");
						}

						try {
							const token = await firebase
								.auth()
								.currentUser?.getIdToken(true);
							console.log({
								newPermissions,
								target,
								token,
							});
							const data = await axios.post(
								"/.netlify/functions/set-user-permissions",
								{
									newPermissions,
									target,
									token,
								}
							);
							console.log(data);
							const newToken = await firebase
								.auth()
								.currentUser?.getIdToken(true);
							console.log(newToken);
						} catch (error) {
							console.log(error);
							console.log({ ...error });
							if (error.response) {
								console.log(error.response.data);
								console.log(error.response.status);
								console.log(error.response.headers);
							}
						}
					}}
					className={
						"p-3 rounded-md bg-blue-300 hover:bg-blue-500 active:bg-blue-700"
					}
				>
					submit
				</button>
				<button
					onClick={async () => {
						if (!firebase) return;
						const token = await firebase
							.auth()
							.currentUser?.getIdTokenResult();
						console.log(token);
					}}
					className={
						"p-3 rounded-md bg-blue-300 hover:bg-blue-500 active:bg-blue-700"
					}
				>
					print claims
				</button>
				<button
					onClick={async () => {
						if (!firebase) return;
						const token = await firebase
							.auth()
							.currentUser?.getIdTokenResult(true);
						console.log(token);
					}}
					className={
						"p-3 rounded-md bg-blue-300 hover:bg-blue-500 active:bg-blue-700"
					}
				>
					print claims after refresh
				</button>
				<nav className="hidden sm:flex items-center text-sm leading-5 font-medium mt-2 mb-4">
					<a
						href="/"
						className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
					>
						Jobs
					</a>
					<svg
						className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clipRule="evenodd"
						/>
					</svg>
					<a
						href="/"
						className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
					>
						Engineering
					</a>
					<svg
						className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clipRule="evenodd"
						/>
					</svg>
					<a
						href="/"
						className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
					>
						Back End Developer
					</a>
				</nav>
				<h1
					className={
						"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-6"
					}
				>
					Members
				</h1>
				<div className="flex flex-col">
					<div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
						<div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
							<table className="min-w-full">
								<thead>
									<tr>
										<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
											Name
										</th>
										<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
											BMUN
										</th>
										<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
											Status
										</th>
										<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
											Role
										</th>
										<th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
									</tr>
								</thead>
								<tbody className="bg-white">
									<tr>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											<div>
												<div className="text-sm leading-5 font-medium text-gray-900">
													Bernard Lane, 10th Grade
												</div>
												<div className="text-sm leading-5 text-gray-500">
													bernardlane@example.com
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											<div className="text-sm leading-5 text-yellow-800">
												Registered, Not Paid
											</div>
											<div className="text-sm leading-5 text-gray-500">
												ECOSOC w/ Partner Name
											</div>
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
												Active
											</span>
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
											Owner
										</td>
										<td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
											<a
												href="/"
												className="text-indigo-600 hover:text-indigo-900"
											>
												More
											</a>
										</td>
									</tr>
									<tr>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											<div className="flex items-center">
												<div className="flex-shrink-0 h-10 w-10">
													<img
														className="h-10 w-10 rounded-full"
														src="https://images.unsplash.com/photo-1532910404247-7ee9488d7292?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</div>
												<div className="ml-4">
													<div className="text-sm leading-5 font-medium text-gray-900">
														Not Registered
													</div>
													<div className="text-sm leading-5 text-gray-500">
														bernardlane@example.com
													</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											<div className="text-sm leading-5 text-gray-900">
												Not Registered
											</div>
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
												Active
											</span>
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
											Owner
										</td>
										<td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
											<a
												href="/"
												className="text-indigo-600 hover:text-indigo-900"
											>
												Edit
											</a>
										</td>
									</tr>
									<tr>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											<div className="flex items-center">
												<div className="flex-shrink-0 h-10 w-10">
													<img
														className="h-10 w-10 rounded-full"
														src="https://images.unsplash.com/photo-1505503693641-1926193e8d57?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</div>
												<div className="ml-4">
													<div className="text-sm leading-5 font-medium text-gray-900">
														Bernard Lane
													</div>
													<div className="text-sm leading-5 text-gray-500">
														bernardlane@example.com
													</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											<div className="text-sm leading-5 text-gray-900">
												Director
											</div>
											<div className="text-sm leading-5 text-gray-500">
												Human Resources
											</div>
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
												Inactive
											</span>
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
											Owner
										</td>
										<td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
											<a
												href="/"
												className="text-indigo-600 hover:text-indigo-900"
											>
												Edit
											</a>
										</td>
									</tr>
									<tr>
										<td className="px-6 py-4 whitespace-no-wrap">
											<div className="flex items-center">
												<div className="flex-shrink-0 h-10 w-10">
													<img
														className="h-10 w-10 rounded-full"
														src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</div>
												<div className="ml-4">
													<div className="text-sm leading-5 font-medium text-gray-900">
														Bernard Lane
													</div>
													<div className="text-sm leading-5 text-gray-500">
														bernardlane@example.com
													</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-no-wrap">
											<div className="text-sm leading-5 text-gray-900">
												Director
											</div>
											<div className="text-sm leading-5 text-gray-500">
												Human Resources
											</div>
										</td>
										<td className="px-6 py-4 whitespace-no-wrap">
											<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
												Inactive
											</span>
										</td>
										<td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
											Owner
										</td>
										<td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
											<a
												href="/"
												className="text-indigo-600 hover:text-indigo-900"
											>
												Edit
											</a>
										</td>
									</tr>
								</tbody>
							</table>
							<div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
								<div className="flex-1 flex justify-between sm:hidden">
									<a
										href="/"
										className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
									>
										Previous
									</a>
									<a
										href="/"
										className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
									>
										Next
									</a>
								</div>
								<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
									<div>
										<p className="text-sm leading-5 text-gray-700">
											Showing{" "}
											<span className="font-medium">
												1
											</span>{" "}
											to{" "}
											<span className="font-medium">
												10
											</span>{" "}
											of{" "}
											<span className="font-medium">
												97
											</span>{" "}
											results
										</p>
									</div>
									<div>
										<nav className="relative z-0 inline-flex shadow-sm">
											<a
												href="/"
												className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
												aria-label="Previous"
											>
												<svg
													className="h-5 w-5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											</a>
											<a
												href="/"
												className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
											>
												1
											</a>
											<a
												href="/"
												className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
											>
												2
											</a>
											<a
												href="/"
												className="hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
											>
												3
											</a>
											<span className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
												...
											</span>
											<a
												href="/"
												className="hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
											>
												8
											</a>
											<a
												href="/"
												className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
											>
												9
											</a>
											<a
												href="/"
												className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
											>
												10
											</a>
											<a
												href="/"
												className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
												aria-label="Next"
											>
												<svg
													className="h-5 w-5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											</a>
										</nav>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		</AdminLayout>
	);
}
