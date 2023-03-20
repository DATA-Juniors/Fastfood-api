# Faveo

Faveo is a food delivery service app for a restaurant.

## Faveo API

Version 1 (v1) of the Faveo API is hosted on neowise.uz at and has the following endpoints.

### Users Endpoints

| Endpoint                 | Request Method | Parameters  |
| ------------------------ |:--------------:| :----------:|
| /api/v1/users            | GET            |             |
| /api/v1/users/:id/details| PUT            | :id         |
| /api/v1/users/:id/access | PUT            | :id         |
| /api/v1/users/:id        | DEL            | :id         |


### Category Endpoints

| Endpoint                 | Request Method | Parameters  |
| ------------------------ |:--------------:| :----------:|
| /api/v1/category         | GET            |             |
| /api/v1/category         | POST           |             |
| /api/v1/category/:id     | PUT            | :id         |
| /api/v1/category/:id     | DEL            | :id         |


### Products Endpoints

| Endpoint             | Request Method | Parameters  |
| -------------------- |:--------------:| :----------:|
| /api/v1/products     | GET            |             |
| /api/v1/products/:id | GET            | :id         |
| /api/v1/products?category_id=1        | Get            |             |
| /api/v1/products     | POST           |             |
| /api/v1/products/:id | DEL            |    :id      |
| /api/v1/products/:id | PUT            |    :id      |