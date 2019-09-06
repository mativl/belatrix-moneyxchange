# belatrix-moneyxchange
Prueba técnica FullStack Rutas API
=========================== 
#### Es necesario registrarse primero (signup) y luego autenticarse (login) para acceder a las demas rutas.

### `users/signup`(POST)
```
  localhost:5000/api/v1/users/signup
```

### `users/login`(POST)
```
  localhost:5000/api/v1/users/login
```

#### Siguientes rutas con autenticacion necesaria. 

> En Headers de Request (Ejemplo) --> Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMyIsInVzZXJJZCI6IjVkNzE4NzRkZjUzOTcyMzc4NGQ0MWIyYSIsImlhdCI6MTU2NzcyMTMxMCwiZXhwIjoxNTY3NzI0OTEwfQ.BlNCy1HdVeIsXY72lHuosru6UC6IRnWqmsJpMaeLn3Y

------------------------------------------------------------------------------------------------------------------------------------
## Informacion sobre ***Usuarios***

### `users` (GET)
```
  localhost:5000/api/v1/users
```
> Se puede especificar limit, offset y fields a obtener ejemplo
> localhost:5000/api/v1/users?limit=2&offset=4&fields=email
> Va a devolver solo DOS elementos a partir del 5 elemento que encuentre (4 no incluido) y solo traera los emails

### `users/:userId` (GET)
```
  localhost:5000/api/v1/users/5d714cfb4bbbbe18d85a00d5
```

### `users/:userId` (PUT)
```
  localhost:5000/api/v1/users/5d714cfb4bbbbe18d85a00d5
```

### `users/:userId` (DELETE)
```
  localhost:5000/api/v1/users/5d714cfb4bbbbe18d85a00d5
```
> SOFT DELETE
------------------------------------------------------------------------------------------------------------------------------------
## Informacion sobre ***Exchanges***

### `exchanges` (GET)
```
  localhost:5000/api/v1/exchanges
```

### `exchanges/:base` (GET)
```
  localhost:5000/api/v1/exchanges/USD
```
