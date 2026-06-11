# JustFetch 🎬🌍

> **Find which country's Netflix has the movie you want to watch — then set your VPN accordingly.**

---

## What is JustFetch?

JustFetch is a personal web app that solves a simple problem: you want to watch a movie on Netflix, but it's not available in your country. JustFetch tells you exactly which country's Netflix library has it, so you know where to point your VPN.

---

## How it works

JustFetch is built around a clean separation of two independent flows:

```
[Watchmode API]
      ↓
  fetcher.py          ← runs periodically (cron job)
      ↓
 justfetch.db         ← SQLite database (~16,000 entries)
      ↓
   api.py             ← FastAPI backend
      ↓
  Frontend            ← HTML / CSS / JS
      ↓
   [User]
```

1. **Fetcher** — a Python script that calls the Watchmode API and stores Netflix availability data for multiple countries into a local SQLite database.
2. **Database** — a SQLite database with two tables: `titles` (movie metadata) and `availability` (which platform, in which country).
3. **API** — a FastAPI backend that reads from the database and exposes a search endpoint.
4. **Frontend** — a plain HTML/CSS/JS interface where users can search for a movie and see results.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Python |
| Backend framework | FastAPI |
| Database | SQLite |
| Frontend | HTML / CSS / JavaScript |
| Server | Ubuntu |
| Data source | [Watchmode API](https://api.watchmode.com/) |

---

## Project Structure

```
JustFetch/
├── .env                  # API key (excluded from GitHub)
├── .gitignore
├── requirements.txt
├── fetcher.py            # Fetches Netflix catalogue → writes to DB
├── api.py                # FastAPI app → reads from DB, exposes /search endpoint
├── justfetch.db          # SQLite database (excluded from GitHub)
└── index.html            # Frontend (HTML/CSS/JS)
```

---

## Database Schema

```sql
CREATE TABLE titles (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    title    TEXT    NOT NULL,
    year     INTEGER NOT NULL,
    type     TEXT    NOT NULL,
    imdb_id  TEXT    NOT NULL UNIQUE
);

CREATE TABLE availability (
    title_id  INTEGER NOT NULL,
    platform  TEXT    NOT NULL,
    country   TEXT    NOT NULL
);
```

---

## API

### `GET /search?movie={title}`

Returns the list of countries where the movie is available on Netflix.

**Example request:**
```
GET /search?movie=Inception
```

**Example response:**
```json
[
  { "title": "Inception", "year": 2010, "platform": "Netflix", "country": "AU" },
  { "title": "Inception", "year": 2010, "platform": "Netflix", "country": "GB" }
]
```

---

## Countries Covered (current)

| Code | Country |
|---|---|
| IS | Iceland |
| AU | Australia |
| GB | Great Britain |

> Coverage is limited to 3 countries on the free Watchmode API plan. More countries can be added with a paid plan.
> You will have to add those 3 countries when signing in Watchmode 

---

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/Valentinguego/justfetch.git
cd justfetch
```

### 2. Create and activate a virtual environment
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Set up your API key
Create a `.env` file at the root of the project:
```
WATCHMODE_API_KEY=your_api_key_here
```
Get your free API key at [watchmode.com](https://api.watchmode.com/).

### 5. Populate the database
```bash
python fetcher.py
```

### 6. Start the API
```bash
uvicorn api:app --reload --host 0.0.0.0
```

---

## Status

This project is actively under development. Current progress:

- [x] Fetcher script
- [x] SQLite database
- [x] FastAPI backend with `/search` endpoint
- [ ] Frontend HTML structure
- [x] Frontend JavaScript (connecting UI to API)
- [ ] Frontend CSS 
- [ ] Deployment

---

## About

Built as a personal learning project to develop practical skills in Python, SQL, REST APIs, and full-stack web development — from backend data pipelines to frontend interfaces.
