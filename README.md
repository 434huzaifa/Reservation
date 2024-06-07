# Reservation

simple reservation invoice maker

## To Run locally

```
git pull https://github.com/434huzaifa/Reservation
```

```
cd Reservation
```

>If You have docker

```
docker build -t reservation
```

```
docker run -d -p 5000:5000 reservation
```

NB: If you use the live link of the backend then change that from Dockerfile `VITE_BACKEND` variable.

> No docker I got you convert

```
npm i
```

create a `.env.local` file. then add

```
VITE_BACKEND=http://localhost:3030
```

NB: If you use the live link of the backend then change live to live link.


```
npm run dev
```

### NB: To run locally make sure to download the Backend Repo and Follow the instruction. [Backend Repo](https://github.com/434huzaifa/Reservation-server)

backend live: [https://reservation-server-gzs9.onrender.com](https://reservation-server-gzs9.onrender.com)

REST API Swagger Doc:  [https://reservation-server-gzs9.onrender.com/docs](https://reservation-server-gzs9.onrender.com/docs)
