from fastapi import APIRouter,HTTPException
from pydantic import BaseModel  # Crea una entidad, nos evita crear el constructor

router = APIRouter()


class User(BaseModel):
    id: int
    name: str
    surname: str
    age: int


users_list = [
    User(id=1, name="lalo", surname="bordon", age=21),
    User(id=2, name="Pablo", surname="Gomez", age=21),
]


@router.get("/users")
async def users():
    return users_list


@router.get("/user/{id}")
async def user(id: int):
    users = filter(lambda user: user.id == id, users_list)
    try:
        return list(users)[0]
    except:
        return {"message": "User not found"}

@router.get("/userquery/")
async def userquery(id: int):
    users = filter(lambda user: user.id == id, users_list)
    try:
        return list(users)[0]
    except:
        return {"message": "User not found"}
    
@router.post("/user",response_model=User, status_code=201)
async def create_user(user: User):
    if type(search_user(user.id)) == User:
        raise HTTPException(status_code=404,detail="User Already Exist")
    else:
        users_list.append(user)
    return user

@router.put("/user")
async def update_user(user: User):
    for index,saved_user in enumerate(users_list):
        if saved_user.id == user.id:
            users_list[index] = user
            return user
    return {"message": "User not found"}

@router.delete("/user/{id}")
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