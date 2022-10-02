const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || "",
			username: "",
			email: "",
			role: "",

			// backendUrl: "https://serv-u.herokuapp.com",
			backendUrl: process.env.BACKEND_URL,
			userInfo: {},
			users: [],
			orders: [],
			services: [],
			errorCode: 0,
			comments: [],
			servicesResults: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			//Change order status
			// It's empty for some reason
			changeOrder: () => {
				let store = getStore()

			},

			//Clears user login data
			userLogout: () => {
				localStorage.removeItem("token"),
					setStore({ token: "" })
			},

			//Checks if the fields of signup are valid
			signupValidityChecker: (user) => {
				if (user.email.trim() !== "" &&
					user.username.trim() !== "" &&
					user.password.trim() !== "" &&
					(user.email.includes("@gmail.com") || user.email.includes("@outlook.com") || user.email.includes("@hotmail.com")) &&
					user.password.length >= 8) {
					return true;
				}
				else {
					alert("Error: Datos no válidos");
					return false;
				}
			},

			//Signs up a user to the database
			userSignup: async (user) => {
				let store = getStore()
				try {
					let response = await fetch(`${store.backendUrl}/api/signup`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(user),
						headers: { 'Content-type': 'application/json' }
					});

					if (response.ok) {
						return true;
					}
				} catch (error) {
					console.log(`Error: ${error}`);
				}
			},

			//Get current users info
			getUserInfo: async () => {
				let store = getStore()
				try {

					let response = await fetch(`${store.backendUrl}/api/users/single_user`, {

						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`
						},
					})
					if (response.ok) {
						let data = await response.json()
						setStore({
							...store,
							userInfo: data
						})
					} else {
						setStore({
							...store,
							userInfo: "undefined"
						})
					}
				} catch (error) {
					console.log(`Error: ${error}`)
				}
			},

			//Recieves a user object and logs them in, generating a token for future authentication
			loginUser: async (user) => {
				let store = getStore()
				try {
					let response = await fetch(`${store.backendUrl}/api/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(user),
					})
					if (response.ok) {
						let data = await response.json()
						let actions = getActions()
						setStore({
							token: data.token,
						})
						localStorage.setItem("token", data.token)
						actions.getUserInfo()
						return true
					} else {
						return false
					}
				} catch (error) {
					console.log(`Error: ${error}`)
				}
			},


			// Checks if login data is valid
			loginValidityChecker: (user) => {
				if (user.email.trim() != "" && user.password.trim() != "") {
					return true
				}
			},

			//Get user services
			getServices: async () => {
				let store = getStore()
				try {
					let response = await fetch(`${store.backendUrl}/api/services`, {
						method: "GET"
					})
					if (response.ok) {
						let data = await response.json()
						setStore({
							...store, services: data
						})
					}
				} catch (error) {
					console.log(`Error: ${error}`)
				}
			},


			addService: async (serviceData) => {
				let store = getStore()
				let actions = getActions()

				try {

					let response = await fetch(`${store.backendUrl}/api/services`, {
						method: 'POST',
						headers: {
							"Authorization": "Bearer " + store.token
						},
						body: serviceData

					});
					if (response.ok) {
						return true;
					} else {
						return false;
					}
				} catch (error) {
					console.log(`Error: ${error}`);
				}
			},

			//Active Orders
			getOrders: async () => {
				let store = getStore()
				try {
					let response = await fetch(`${store.backendUrl}/api/orders`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + store.token
						},
					})
					if (response.ok) {
						let data = await response.json()
						setStore({
							orders: data
						})
					}
				} catch (error) {
					console.log(`Error: ${error}`)
				}
			},

			// Updates the status of the order
			updateOrder: async (orderId) => {
				let store = getStore()
				try {
					let response = await fetch(`${store.backendUrl}/api/orders/${orderId}`, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							status: "culminado"
						}),
					});
					if (response.ok) {
						let ordersCopy = [...store.orders]
						let index = ordersCopy.findIndex((order) => order.id === orderId)
						if (index > -1) {
							ordersCopy[index] = { ...ordersCopy[index], status: "culminado" }
							setStore({
								...store, orders: ordersCopy
							})
							return true;
						}
					}
				} catch (error) {
					console.log(`Error: ${error}`);
					return false;
				}
			},

			// Sends a comment to the backend
			sendComment: async (comment) => {
				let store = getStore()
				try {
					let response = await fetch(`${store.backendUrl}/api/user/comments`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + store.token
						},
						body: JSON.stringify(comment),
					});
					if (response.ok) {
						getActions().getComment()
						return true;
					}
				} catch (error) {
					console.log(`Error: ${error}`);
				}
			},

			// Get all(?) comments
			getComment: async () => {
				let store = getStore()
				try {
					let response = await fetch(`${store.backendUrl}/api/comments`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						},
					})
					if (response.ok) {
						let data = await response.json()
						setStore({
							comments: data
						})
						console.log(data)
					}
				} catch (error) {
					console.log(`Error: ${error}`)
				}
			},


			// Gets all(?) users
			getUserStatus: async () => {
				let store = getStore()
				try {
					let response = await fetch(`${store.backendUrl}/api/users`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						},
					})
					if (response.ok) {
						let data = await response.json()
						setStore({
							users: data
						})
					}
				} catch (error) {
					console.log(`Error: ${error}`)
				}
			},

			// Change the status of a user
			updateUserStatus: async (userId) => {
				let store = getStore()
				try {
					let response = await fetch(`${store.backendUrl}/api/user/${userId}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + store.token
						},
					})
					if (response.ok) {
						getActions().getUserStatus()
					}
				} catch (error) {
					console.log(`Error: ${error}`)
				}
			},

			searchService: (results) => {
				setStore({
					servicesResults: results
				})
			},


			// Uploads and changes the profile image of the user
			uploadProfileImg: async (product) => {
				const store = getStore();
				for (var p of product) {
					console.log(p);
				}
				try {
					const response = await fetch(`${store.backendUrl}/api/profile/single_user/profile`, {
						method: "PATCH",
						headers: {
							// "Content-Type": "multipart/form-data",
							"Authorization": `Bearer ${store.token}`,
						},
						body: product,
					});
					if (response.ok) {
						getActions().getUserInfo()
					}
				} catch (error) {
					console.log("uploadProfileImg Error", error);
				}
			},

			// Uploads and changes the banner image of the user
			uploadBannerImg: async (product) => {
				const store = getStore();
				for (var p of product) {
					console.log(p);
				}
				try {
					const response = await fetch(`${store.backendUrl}/api/profile/single_user/banner`, {
						method: "PATCH",
						headers: {
							// "Content-Type": "multipart/form-data",
							"Authorization": `Bearer ${store.token}`,
						},
						body: product,
					});
					if (response.ok) {
						getActions().getUserInfo()
					}
				} catch (error) {
					console.log("uploadBannerImg Error", error);
				}

			},
		}
	};
};

export default getState;

