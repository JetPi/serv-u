const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || "",
			backendUrl: "https://serv-u.herokuapp.com",
			username: "",
			email: "",
			role: "",
			orders: [],
			services: [],

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			//Clears user login data
			userLogout: () => {
				localStorage.removeItem("token"),
					setStore({ token: "" })
				alert("Succesfully logged out")
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
							username: data.username,
							email: data.email,
							role: data.role,
						})
						return true
					} else {
						return false
					}
				} catch (error) {
					console.log(`Error: ${error}`)
				}
			},

			//Recieves a user object and logs them in, generating a token for future authentication
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
						method: "GET",

						headers: {
							"Content-Type": "application/json",
						},
					})
					if (response.ok) {
						let data = await response.json()
						setStore({
							services: data
						})
					}
				} catch (error) {
					console.log(`Error: ${error}`)
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


			addService: async (serviceData) => {
				let store = getStore()
				try {
					let response = await fetch(`${store.backendUrl}/api/services`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(serviceData),
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

		}
	};
};

export default getState;