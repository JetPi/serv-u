const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || "",
			user_id: 0,
			username: "",
			email: "",
			role: "",
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
				try {
					let response = await fetch(`http://localhost:3001/api/signup`, {
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

			// Checks if login data is valid
			loginValidityChecker: (user) => {
				if (user.email.trim() != "" && user.password.trim() != "") {
					return true
				}
			},

			//Check if the user has a token?


			//Get current users info
			getUserInfo: async () => {
				let store = getStore()
				try {
					let response = await fetch(`http://172.16.0.7:3001/api/users/${store.user_id}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					})
					if (response.ok) {
						let data = await response.json()
						setStore({
							username: data.username,
							email: data.email,
							role: data.role,
						})
						console.log(store.username, store.email, store.role)
					}
				} catch (error) {
					console.log(`Error: ${error}`)
				}
			},

			//Get user services
			getServices: async () => {
				let store = getStore()
				try {
					let response = await fetch(`http://172.16.0.7:3001/api/services`, {
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
						console.log(store.services)
					}
				} catch (error) {
					console.log(`Error: ${error}`)
				}
			},

			//Recieves a user object and logs them in, generating a token for future authentication
			loginUser: async (user) => {
				try {
					let response = await fetch(`http://172.16.0.7:3001/api/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(user),
					})
					if (response.ok) {
						let data = await response.json()
						setStore({
							token: data.token,
							user_id: data.user_id,
						})
						localStorage.setItem("token", data.token)
						return true
					} else {
						return false
					}
				} catch (error) {
					console.log(`Error: ${error}`)
				}
			},

			addService: async (serviceData) => {
				try {
				  let response = await fetch(`http://localhost:3001/api/services`, {
					method: "POST",
					headers: {
					  "Content-Type": "application/json"
					},
					body: JSON.stringify(serviceData),
				  });
				  if (response.ok) {
					return true;
					
				  }else{
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
