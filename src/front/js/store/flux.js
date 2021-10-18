const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromLocalStore: () => {
				//esta funcion obtendrá el token del localStore y lo pondrá en el store (con el setStore)
				const token = localStorage.getItem("token"); //pero siempre y cuando se cumplan estas condiciones del if
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			logout: () => {
				localStorage.removeItem("token"); //borro el token del localStorage
				console.log("Login out");
				setStore({ token: null }); //y establezco el token del store vacío
			},

			login: async (email, password) => {
				//lo hacemos asíncrono para que sea más fácil de administrar
				const options = {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};

				try {
					const resp = await fetch(
						"https://3001-purple-impala-p24iuy49.ws-eu17.gitpod.io/api/token",
						options
					);
					if (resp.status !== 200) {
						alert("There was been some error");
						return false;
					}
					const data = await resp.json();
					console.log("This came from the backend", data);
					localStorage.setItem("token", data.access_token); //access_token es lo que me respondió el token en Postman (es decir, lo que me llega desde el backend)
					setStore({ token: data.access_token });
					return true;
				} catch (error) {
					console.log("There has been an error login in");
				}
			},

			getMessage: () => {
				const store = getStore(); //con esto accedo al store, que es de donde obtengo el token que voy a utilizar
				const options = {
					headers: {
						Authorization: "Bearer " + store.token
					}
				};

				// fetching data from the backend
				fetch("https://3001-purple-impala-p24iuy49.ws-eu17.gitpod.io/api/hello", options)
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message })) //message es lo que me respondió el token en Postman (es decir, lo que me llega desde el backend)
					.catch(error => console.log("Error loading message from backend", error));
			},

			// Esta función no me sirve (venía de ejemplo):
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
