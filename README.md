# Reservation

simple reservation invoice maker

## Rate Calculation Logic

When calculating the total rental cost:

1. We first calculate the cost using the weekly rate.

2. We then calculate the cost using the daily rate for the remaining days, ensuring that if multiple days exceed the weekly rate, we charge the weekly rate.

3. For the remaining hours, we compare the total hourly cost with the daily rate and choose the lesser amount.

4. This ensures the customer is always charged the lesser of the hourly rate for up to a day or the daily rate.

### Example
- If a customer rents a Tesla for six hours:

  - Hourly cost: 6 hours * $10 = $60

  - Daily cost: $50
 
  - Since $60 > $50, the system will charge $50.


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
