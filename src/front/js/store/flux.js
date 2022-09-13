const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
			user: {
				email: ""
			},
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			// Checks if login data is valid
			loginValidityChecker: (user) => {
				let email = user.email
				let password = user.password
				if (email.trim() == "" && password.trim() == ""){
					return true
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
						setStore({token: data.token})
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
