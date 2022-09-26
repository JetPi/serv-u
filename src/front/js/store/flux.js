const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || "",

			username: "",
			email: "",
			role: "",

			// backendUrl: "https://serv-u.herokuapp.com",
			// backendUrl: process.env.BACKEND_URL,
			backendUrl: "http://localhost:3001",
			userInfo: {},
			orders: [],
			services: [],
			errorCode: 0,
			comments: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			//Change order status
			changeOrder: () => {
				let store = getStore()

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
						headers: {'Content-type': 'application/json'}
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
						return true
					}
				} catch (error) {
					console.log(`Error: ${error}`)
				}
			},

			// uploadImg: async (serviceData) => {
			// 	const store = getStore();
			// 	const actions = getActions()
			// 	try {
			// 	  const response = await fetch(`${store.backendUrl}/services`, {
			// 		method: "POST",
			// 		mode: "no-cors",					
			// 		body: serviceData
			// 	  });
			// 	  actions.getServices()
			// 	  if (response.ok) {
			// 			let data = await response.json()
			// 				setStore({
			// 				services: data
			// 			})
			// 			return true
			// 		}
			// 		else {
			// 			console.log("error al subir img_service")
			// 			return false;
			// 		}
			// 	}catch (error) {
			// 	  console.log("Error to upload the image", error);
			// 	}
			//   },

			addService: async (serviceData) => {
				let store = getStore()
				let actions = getActions()
				
				try {
					
					let response = await fetch(`${store.backendUrl}/api/services`, {
						method: 'POST',     					
      					// headers: {"Content-Type": "application/json"},
						body: serviceData,
						mode:"no-cors"
					});
					

					if (response.ok) {
						actions.getServices()
						console.log(serviceData)
						console.log("add service ok")
						return true;

					} else {
						console.log(serviceData)
						console.log("mal add service")
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
			getComment: async () => {
				let store = getStore()
				try {
					let response = await fetch(`${store.backendUrl}/api/user/comments`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + store.token
						},
					})
					if (response.ok) {
						let data = await response.json()
						setStore({
							comments: data
						})
					}
				} catch (error) {
					console.log(`Error: ${error}`)
				}
			},
		}
	};
};

export default getState;


// //how I use cloudinary frontednd?*
// const uploadImage = (base64EncodedImage) => {
//   console.log(base64EncodedImage);
//   fetch('/api/upload', {
//       method: 'POST',
//       body: JSON.stringify({data: base64EncodedImage}),
//       headers: {'Content-type': 'application/json'}
//     })
//     .then(doWhateverYouWant)
//     .catch((error) => console.error(error))
// }

// const doWhateverYouWant = async (res) => {
// // you can use res.url
// }


