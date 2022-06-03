# Nodejs-api-crud-prisma-sql
## Recursos
* https://www.prisma.io/express
## Adaptacion para mysql
* npm install prisma --save-dev
* crear un .env file en el directorio root del proyecto
* en la carpeta prisma/schema.prisma cambiamos
```
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```
* en el archivo .env
```
DATABASE_URL="mysql://tu_nombre_usuario:tu_password@localhost:3306/tu_base_de_datos"
```
* Eliminamos la carpeta migrations.
* ejecutamos:

```
npx prisma migrate dev --name init
```
* ejecutamos:

```
npx prisma generate
```
* Cada cambio que hagamos en el esquema tendremos que volver a ejecutar "npx prisma genrerate"
