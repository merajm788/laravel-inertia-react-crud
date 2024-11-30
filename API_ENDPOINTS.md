API Endpoints:- 

1. Get All Tasks
Method: GET
URL: /
Description: Retrieve a paginated list of tasks with optional filters and search.
Query Parameters:
search (optional) – Search term.
status (optional) – Filter by task status (e.g., 1 for active, 0 for inactive).
Response Example:
{
  "success": true,
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "title": "Sample Task",
        "description": "Task description",
        "due_date": "2024-12-01",
        "status": 1
      }
    ]
  }
}



2. Create a New Task
Method: POST
URL: /
Description: Create a new task.
Request Body (JSON):
{
  "title": "New Task",
  "description": "Task description",
  "due_date": "2024-12-15"
}
Response Example:
{
  "success": true,
  "message": "Task created successfully.",
  "data": {
    "id": 1,
    "title": "New Task",
    "description": "Task description",
    "due_date": "2024-12-15",
    "status": 1
  }
}



3. Get Task by ID
Method: GET
URL: /{id}
Description: Retrieve a specific task by ID.
Response Example:
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Sample Task",
    "description": "Task description",
    "due_date": "2024-12-01",
    "status": 1
  }
}



4. Update Task
Method: PUT
URL: /{id}
Description: Update an existing task by ID.
Request Body (JSON):
{
  "title": "Updated Task",
  "description": "Updated description",
  "due_date": "2024-12-20"
}
Response Example:
{
  "success": true,
  "message": "Task updated successfully.",
  "data": {
    "id": 1,
    "title": "Updated Task",
    "description": "Updated description",
    "due_date": "2024-12-20"
  }
}



5. Soft Delete Task
Method: DELETE
URL: /{id}
Description: Soft delete a task by ID.
Response Example:
{
  "success": true,
  "message": "Task deleted successfully."
}
6. Restore a Soft-Deleted Task
Method: POST
URL: /{id}/restore
Description: Restore a soft-deleted task by ID.
Response Example:
{
  "success": true,
  "message": "Task restored successfully.",
  "data": {
    "id": 1,
    "title": "Restored Task",
    "description": "Restored description"
  }
}



7. Permanently Delete Task
Method: POST
URL: /{id}/force-delete
Description: Permanently delete a soft-deleted task by ID.
Response Example:
{
  "success": true,
  "message": "Task permanently deleted."
}
8. Update Task Status
Method: PATCH
URL: /{id}/status
Description: Toggle a task’s status (1 = active, 0 = inactive).
Response Example:
{
  "success": true,
  "message": "Task status updated successfully.",
  "data": {
    "id": 1,
    "status": 0
  }
}



9. Empty Trash
Method: POST
URL: /empty-trash
Description: Permanently deletes all soft-deleted tasks.
Response Example:
{
  "success": true,
  "message": "Trash cleared successfully!"
}
