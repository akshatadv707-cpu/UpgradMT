import sqlite3

def init_db():
    conn=sqlite3.connect("tasks.db")

    conn.execute("""
    create table if not exists tasks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
    )
    """)

    conn.commit
    conn.close