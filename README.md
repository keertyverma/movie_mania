# movie_mania

This API is used to maintain movies information

### To start local server

- Install node modules -> `npm install`
- To start server -> `npm start`
- To run testcase -> `npm test`

---

### List of available APIs

**Endpoint** → _http://localhost:3000/moviemania/api/_

[Public Documentation has been made available](https://documenter.getpostman.com/view/5352730/2s93CKNECV). Here is a [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5352730-823f5352-b793-4b96-ae30-9353564719b0?action=collection%2Ffork&collection-url=entityId%3D5352730-823f5352-b793-4b96-ae30-9353564719b0%26entityType%3Dcollection%26workspaceId%3D9cff2155-1c03-4762-a0ef-661eae33eab5) button to import the same and test.

### Register User

| HTTP method | Route           | Description      |
| ----------- | --------------- | ---------------- |
| post        | /users/register | To register user |

### Authenticate User

| HTTP method | Route | Description          |
| ----------- | ----- | -------------------- |
| post        | /auth | To authenticate user |

### Movie

| HTTP method | Route       | Description              |
| ----------- | ----------- | ------------------------ |
| get         | /movies     | get all movies           |
| get         | /movies/:id | get specific movie by id |
| post        | /movies     | add new movie            |
| patch       | /movies/:id | update movie by id       |
| delete      | /movies/:id | delete a movie by id     |

### Genre

| HTTP method | Route       | Description              |
| ----------- | ----------- | ------------------------ |
| get         | /genres     | get all genres           |
| get         | /genres/:id | get specific genre by id |
| post        | /genres     | add new genre            |
| patch       | /genres/:id | update genre by id       |
| delete      | /genres/:id | delete a genre by id     |
