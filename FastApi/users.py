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
    try:
        return list(users)[0]
    except:
        return {"message": "User not found"}

@app.get("/userquery/")
async def userquery(id: int):
    users = filter(lambda user: user.id == id, users_list)
    try:
        return list(users)[0]
    except:
        return {"message": "User not found"}
    
@app.post("/user")
async def create_user(user: User):
    if type(search_user(user.id)) == User:
        return {"message": "User already exists"}
    else:
        users_list.append(user)
    return user

@app.put("/user")
async def update_user(user: User):
    for index,saved_user in enumerate(users_list):
        if saved_user.id == user.id:
            users_list[index] = user
            return user
    return {"message": "User not found"}

@app.delete("/user/{id}")
async def delete_user(id:int):
    for index,saved_user in enumerate(users_list):
        if saved_user.id == id:
            del users_list[index]
            return {"message" : "User succesfully deleted"}
    return {"message": "User not found"}

def search_user(id: int):
    users = filter(lambda user: user.id == id, users_list)
    try:
        return list(users)[0]
    except:
        return {"message": "User not found"}