from fastapi import FastAPI
from pydantic import BaseModel  # Crea una entidad, nos evita crear el constructor

app = FastAPI()


class User(BaseModel):
    id: int
    name: str
    surname: str
    age: int


users_list = [
    User(id=1, name="lalo", surname="bordon", age=21),
    User(id=2, name="Pablo", surname="Gomez", age=21),
]


@app.get("/users")
async def users():
    return users_list


@app.get("/user/{id}")
async def user(id: int):
    users = filter(lambda user: user.id == id, users_list)
    return list(users)[0]
