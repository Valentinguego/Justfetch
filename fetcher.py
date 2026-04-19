import requests
import os
from dotenv import load_dotenv
import sqlite3

load_dotenv()

API_KEY = os.getenv("WATCHMODE_API_KEY")
conn = sqlite3.connect("justfetch.db")
cursor = conn.cursor()

netflix_id = 203
pays = ["IS", "AU", "GB"]

for region in pays:
    page = 1
    while True:
        url = f"https://api.watchmode.com/v1/list-titles/?apiKey={API_KEY}&source_ids={netflix_id}&regions={region}&page={page}"
        response = requests.get(url)
        data = response.json()
        if page <= data["total_pages"]:
            page += 1
            for title in data["titles"]:
                print(title["title"])
                print(title["year"])
                print(title["type"])
                print(region)
        else:
            break