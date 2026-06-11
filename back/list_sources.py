import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("WATCHMODE_API_KEY")

url = f'https://api.watchmode.com/v1/sources/?apiKey={API_KEY}'
response = requests.get(url)


for platform in response.json():
    print(platform['name'], platform['id'])
