import sqlite3

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from contextlib import asynccontextmanager
from database import init_db


@asynccontextmanager
async def lifespan(app : FastAPI):
    init_db()
    yield

app = FastAPI(lifespan=lifespan)

class Task(BaseModel):
    title:str
    completed: bool=False


@app.get("/")
def home():
    return {"HOME PAGE"}
#post method

@app.post("/tasks")
def create_task(task:Task):
    conn=sqlite3.connect("tasks.db")

    try:
        cursor=conn.execute("INSERT INTO tasks (title,completed) VALUES (?,?)",(task.title,task.completed))
        conn.commit()
        task_id=cursor.lastrowid
        
    finally:
        conn.close()

    return{
        "id": task_id,
        "title" :task.title,
        "completed": task.completed
    }

#get

@app.get("/tasks")
def get_all():
    conn=sqlite3.connect("tasks.db")
    conn.row_factory=sqlite3.Row

    try:

        rows=conn.execute("SELECT * FROM tasks").fetchall()

        return[
            {
                "id": row["id"],
                "title" :row["title"],
                "completed": bool(row["completed"])
            }
            for row in rows
        ]

    finally:
        conn.close()

#getbyid
@app.get("/tasks/{task_id}")
def get_by_id(task_id:int):
    conn=sqlite3.connect("tasks.db")
    conn.row_factory=sqlite3.Row

    try:

        row=conn.execute("SELECT * FROM tasks WHERE id=?",(task_id,)).fetchone()

        if row is None:
            raise HTTPException(
                status_code=404,
                detail="Task not found"
            )
        
        return{
                "id": row["id"],
                "title" :row["title"],
                "completed": bool(row["completed"])
                }
            

    finally:
        conn.close()
    


@app.delete("/tasks/{task_id}")
def delete_task(task_id:int):
    conn=sqlite3.connect("tasks.db")
    conn.row_factory=sqlite3.Row

    try:

        cursor=conn.execute("DELETE FROM tasks WHERE id=?",(task_id,))

        conn.commit()
        
        if cursor.rowcount==0:
            raise HTTPException(
                status_code=404,
                detail="Task not found"
            )
        
        return{"Task deleted successfully"}
            

    finally:
        conn.close()

@app.patch("/tasks/{task_id}")
def update_task(title:str,task_id:int):
    conn=sqlite3.connect("tasks.db")

    try:
        cursor=conn.execute("UPDATE tasks SET title=? WHERE id=?",(title,task_id))
        conn.commit()

        if cursor.rowcount == 0:
            raise HTTPException(
                status_code=404,
                detail="Task not found"
            )
        
    finally:
        conn.close()

    return{
        "id": task_id,
        "title" :title
    }

@app.put("/tasks/{task_id}")
def replace_task(task_id: int, task: Task):
    conn = sqlite3.connect("tasks.db")

    try:
        cursor = conn.execute(
            "UPDATE tasks SET title=?, completed=? WHERE id=?",
            (task.title, task.completed, task_id)
        )
        conn.commit()

        if cursor.rowcount == 0:
            raise HTTPException(
                status_code=404,
                detail="Task not found"
            )

    finally:
        conn.close()

    return {
        "id": task_id,
        "title": task.title,
        "completed": task.completed
    }
    