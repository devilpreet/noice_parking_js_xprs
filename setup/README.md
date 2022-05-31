# Database 

## A. Create via Docker-compose
```sh
docker-compose -f ./setup/docker-compose-db-only.yml up
```

## B. Manual creation via docker commands

### 1. Installing/Starting Postgres Docker Container

```sh
docker run --name postgresql -e POSTGRES_USER=myusername -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres
```

## [Optional] Installing/Starting PG Adming Docker Container for Database Operations  

1. Pull latest docker image
```sh 
docker pull dpage/pgadmin4:latest
```

2. Start the PG Admin Container  
Change the email and password accordingly  
```sh
docker run --name my-pgadmin -p 82:80 -e 'PGADMIN_DEFAULT_EMAIL=admin@admin.com' -e 'PGADMIN_DEFAULT_PASSWORD=root' -d dpage/pgadmin4
```
3. Admin Console can be accessed at: http://localhost:82

## 2. Creating Sample DB
Run [createDB](./createDB.sql) script to create database, schema and tables.


## 3. Adding Sample Records
Run [sampleRecords](./sampleRecords.sql) script to add initial records


