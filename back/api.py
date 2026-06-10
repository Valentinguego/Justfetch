from fastapi import FastAPI
import sqlite3
from fastapi.staticfiles import StaticFiles

app = FastAPI()

@app.get("/search")
def search(movie: str):
    conn = sqlite3.connect("justfetch.db")
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id FROM titles WHERE LOWER(title) LIKE LOWER(?)",
        (f"%{movie}%",)
    )
    result = cursor.fetchone()
    
    if result is None:
        return {"message": "Movie not found"}
    
    title_id = result[0]
    
    cursor.execute(
        "SELECT country, platform FROM availability WHERE title_id = ?",
        (title_id,)
    )
    availability = cursor.fetchall()
    availability = [{"country": row[0], "platform": row[1]} for row in availability]
    
    return {"movie": movie, "availability": availability}

app.mount("/", StaticFiles(directory="../Front", html=True), name="static")
