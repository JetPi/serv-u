const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || "",
			user_id: 0,
			username: "",
			email: "",
			role: "",
			your_services: {},
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			// Checks if login data is valid
			loginValidityChecker: (user) => {
				if (user.email.trim() != "" && user.password.trim() != ""){
					return true
				}
			},

			//Check if the user has a token?


			//Get logged in user info
			getUserInfo: async () =>{
				let store = getStore()
				try {
					let response = await fetch(`http://172.16.0.7:3001/api/users/${store.user_id}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					})
					if (response.ok){
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

			//Recieves a user object and logs them in, generating a token for future authentication
			loginUser: async (user) =>{
				try {
					let response = await fetch(`http://172.16.0.7:3001/api/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(user),
					})
					if (response.ok){
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
		}
	};
};

export default getState;
