# TecNM Blog API 
![](https://celaya.tecnm.mx/wp-content/uploads/2021/02/tecnm-header-1.png)

# Project Initialization

1.- Run the command **npm init**
2.- Create .env file with the variables of the DB you would create oin the container.
    - SRV is abreviation for service (the postgresql/index.js server)
3.- Run docker-compose up -d to pull the initialize the container
4.- Run this command on the docker bash to create the DB 'psql -U your_env_user -d your_db_env -f 2023-12-27_blogs' 
3.- Start the API by running **node api/index.js** 
4.- Start the PostgreSQL API by running **node postgresql/index.js** 

Know you must be able to use the API endpoints.

You can see the endpoints documentation by accesing to the [http:your_api_project_host:3000/api-docs]

### Dependencies installed
* npm i joi
* npm i express
* npm i hapi/boom
* npm i dotenv
* npm i swaugger-ui-express
* npm i axios
* npm i pg