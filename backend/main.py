from json import loads
from typing import Dict, List

import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel, ValidationError
from starlette.middleware.cors import CORSMiddleware

from jsondb.db import Database

db = Database("data.db")

product_name="Pokedex"


app = FastAPI(
    title="{} APIs".format(product_name.title()),
    description="All business logic for web interaction resides here",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CategoryData(BaseModel):
  categories: List[Dict[str, List[int]]]

@app.get('/pokemons')
def get_pokemons():
  return {"success": True, "data": {"pokemons": db['pokemons']}}

@app.get('/')
def get_data():
  return {"success": True, "data": {"categories": db['categories'] or []}}


@app.post('/')
def set_category_data(category_data: CategoryData):
  request_data = category_data.dict()
  db['categories'] = request_data['categories']
  return {"success": True, "categories": db['categories']}



if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8081, debug=True, reload=True)
