from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mtg_ai import find_synergies
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Request(BaseModel):
    commander: str

@app.post("/synergies")
def synergies(req: Request):
    return find_synergies(req.commander)
