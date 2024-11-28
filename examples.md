# School Management API Examples

## Add School

### Request
```http
POST http://localhost:3000/api/addSchool
Content-Type: application/json

{
    "name": "Central High School",
    "address": "123 Education Street",
    "latitude": 40.7128,
    "longitude": -74.0060
}
```

### Success Response
```json
{
    "message": "School added successfully",
    "schoolId": 1
}
```

### Validation Error Response
```json
{
    "error": "\"name\" is required"
}
```

## List Schools

### Request
```http
GET http://localhost:3000/api/listSchools?latitude=40.7128&longitude=-74.0060
```

### Success Response
```json
[
    {
        "id": 1,
        "name": "Central High School",
        "address": "123 Education Street",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "distance": 0
    },
    {
        "id": 2,
        "name": "North High School",
        "address": "456 Learning Avenue",
        "latitude": 40.7300,
        "longitude": -74.0200,
        "distance": 2.5
    }
]
```

### Validation Error Response
```json
{
    "error": "\"latitude\" is required"
}
```