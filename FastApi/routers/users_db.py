from fastapi import APIRouter, HTTPException, status
from db.models.user import User
from db.client import db_client
from db.schemas.user import user_schema, users_schema
from bson import ObjectId

router = APIRouter(
    prefix="/userdb",
    tags=["userdb"],
    responses={status.HTTP_404_NOT_FOUND: {"message": "Not Found"}},
)


users_list = []


@router.get("/", response_model=list[User])
async def users():
    return users_schema(db_client.users.find())


@router.get("/{id}")
async def user(id: str):
    return search_user("_id", ObjectId(id))


@router.get("/query/")
async def userquery(id: str):
    return search_user("_id", ObjectId(id))


@router.post("/", response_model=User, status_code=201)
async def create_user(user: User):
    if type(search_user_by_email(user.email)) == User:
        raise HTTPException(status_code=404, detail="User Already Exist")
    user_dict = dict(user)
    del user_dict["id"]
    id = db_client.users.insert_one(user_dict).inserted_id

    new_user = user_schema(
        db_client.users.find_one({"_id": id})
    )  # mongdb crea de manera automatica _id
    return User(**new_user)


@router.put("/", response_model=User)
async def update_user(user: User):
    user_dict = dict(user)
    del user_dict["id"]
    try:
        db_client.users.find_one_and_replace({"_id": ObjectId(user.id)}, user_dict)
    except:
        return {"Error": "The user hasen't been updated"}
    return search_user("_id", ObjectId(user.id))


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(id: str):
    user = db_client.users.find_one_and_delete({"_id": ObjectId(id)})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")


def search_user(field: str, key):
    try:
        user = user_schema(db_client.users.find_one({field: key}))
        return User(**user)
    except:
        return {"message": "User not found"}


def search_user_by_email(email: str):

    try:
        user = user_schema(db_client.users.find_one({"email": email}))
        return User(**user)
    except:
        return {"message": "User not found"}
