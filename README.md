This folder contains the Backend folder (connex-server) and the Frontend Folder(connex-frontend)

To start the Node server,

	a. Cd into the connex-server folder 

	b. install the node_modules using yarn 

	c. The PORT used is currently set to 8080 in the .env file. you can change this from the .env or by setting it directly from the app.ts file. Changing the PORT from 8080 would also require you to change it from the frontend
	
	d. start the server using yarn start-dev


To run the React application,

 	a. Cd into the connex-frontend folder 
	
	b. install the node_modules using yarn 
	
 	c. The port to connect to the backend is currently set to 8080. if you wish to use a different port please update it from the package.json under proxy, and also from src/services/helpers.ts
	
	d. run the application using yarn start
	
	e. The application only has one snapshot test due to time constraint and it can be ran using 'Yarn test'
	

**Eslint was also configured for typescript error checking**
