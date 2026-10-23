
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# Temporary in-memory database
tasks = []

# Define the structure of a task
class Task(BaseModel):
    title: str
    completed: bool = False


# 1. Home endpoint
@app.get("/")
def home():
    return {"message": "Welcome to my first FastAPI backend!"}


# 2. Get all tasks
@app.get("/tasks")
def get_tasks():
    return tasks


# 3. Create a task
@app.post("/tasks")
def create_task(task: Task):
    new_task = {
        "id": tasks[-1]["id"] + 1 if tasks else 1,
        "title": task.title,
        "completed": task.completed
    }

    tasks.append(new_task)
    return new_task

@app.get("/tasks/completed")
def get_completedtask():
    completed_tasks= [task for task in tasks if task["completed"]]
    
    if not completed_tasks:
        raise HTTPException(status_code=404,detail="completed task not found")
    return completed_tasks

# 4. Get task by ID
@app.get("/tasks/{task_id}")
def get_task(task_id: int):
    for task in tasks:
        if task["id"] == task_id:
            return task

    raise HTTPException(status_code=404, detail="Task not found")

@app.get("/tasks/completed")
def get_completedtask():
    completed_tasks= [task for task in tasks if task["completed"]]
    
    if not completed_tasks:
        raise HTTPException(status_code=404,detail="completed task not found")
    return completed_tasks

# 5. Delete a task
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    for task in tasks:
        if task["id"] == task_id:
            tasks.remove(task)
            return {"message": "Task deleted successfully", "task": task}

    raise HTTPException(status_code=404, detail="Task not found")


@app.put("/tasks/{task_id}")
def update_task(task_id:int,updated_task:Task):
    for task in tasks:
        if task["id"]==task_id:

            task["title"]=updated_task.title
            task["completed"]=updated_task.completed
            return task

    raise HTTPException(status_code=404, detail="Task not found")


@app.patch("/tasks/{task_id}")
def patch_task(task_id:int,updated_completed:bool):
    for task in tasks:
       if task["id"]==task_id:
           task["completed"]=updated_completed
           return task

    raise HTTPException(status_code=404,detail="task not found")   