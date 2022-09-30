

## Description

[Nest](https://github.com/nestjs/nest) API Customer .

## Installation

```bash
$ npm install

$ npm run build
```

## Running the app in production

```bash
$ npm run start:prod
```

## Test

Auth

```bash
POST http://localhost:3000/customers
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
client_id=customers
client_secret=453000f7-47a0-4489-bc47-891c742650e2
username=<seu_email>
password=<base64_de_seu_email>
scope=openid
```
Customer

GET
```bash
GET http://localhost:3000/customers/1
Content-Type: application/json; charset=utf-8
Authorization: Bearer <TOKEN>


Response
{
  "id": "customer:<uuid>",
  "name": string,
  "document": number,
  "_links": [
      {
        "rel": "update_customer",
        "href": "http://localhost:3000/customers/1", "method": "PUT"
      }
   ]
}
```

POST
```bash
POST http://localhost:3000/customers
Content-Type: application/json; charset=utf-8
Authorization: Bearer <TOKEN>

{
    "name": "John",
    "document": 1234567,
}

Response
{
  "id": "customer:<uuid>",
  "name": string,
  "document": number,
  "_links": [
      {
        "rel": "find_customer",
        "href": "http://localhost:3000/customers/1", "method": "GET"
      },
      {
        "rel": "update_customer",
        "href": "http://localhost:3000/customers/1", "method": "PUT"
      } 
   ]
}
```
PUT
```bash
PUT http://localhost:3000/customers/1
Content-Type: application/json; charset=utf-8
Authorization: Bearer <TOKEN>

{
    "name": "John",
    "document": 1234567
}

Response
{
  "id": "customer:<uuid>",
  "name": string,
  "document": number,
  "_links": [
      {
        "rel": "find_customer",
        "href": "http://localhost:3000/customers/1", "method": "GET"
      }
   ]
}
```

