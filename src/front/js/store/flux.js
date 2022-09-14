const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || "",
			user: {
				email: ""
			},
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
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
				  return false;
				} catch (error) {
				  console.log(`Error: ${error}`);
				}
			  },

			// Checks if login data is valid
			loginValidityChecker: (user) => {
				if (user.email.trim() != "" && user.password.trim() != ""){
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
