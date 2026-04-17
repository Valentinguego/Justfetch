import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("WATCHMODE_API_KEY")

netflix_id = 203
pays = ["IS", "AU", "GB"]

for region in pays:
    url = f"https://api.watchmode.com/v1/list-titles/?apiKey={API_KEY}&source_ids={netflix_id}&regions={region}"
    response = requests.get(url)
    data = response.json()
    print(data)