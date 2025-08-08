from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel  # Crea una entidad, nos evita crear el constructor
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

router = APIRouter(prefix="/basic_auth"



, tags=["basic_auth"],

 responses={404: {"message": "Not Found"}
            })
Oauth2 = OAuth2PasswordBearer(tokenUrl="login")


async def current_user(token: str = Depends(Oauth2)):
    user = search_user(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="UNAUTHORIZED",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if user.disabled:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Disabled User"
        )
    return user


class User(BaseModel):
    username: str
    name: str
    email: str
    disabled: bool


class UserDB(User):
    password: str


users_db = {
    "lalo": {
        "username": "lalo",
        "name": "asdsa",
        "email": "asdas@gmail.com",
        "disabled": False,
        "password": "123",
    },
    "mouredev2": {
        "username": "mouredev2",
        "name": "asdsa",
        "email": "asdas2@gmail.com",
        "disabled": True,
        "password": "123",
    },
}


@router.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user_db = users_db.get(form.username)
    if not user_db:
        raise HTTPException(status_code=400, detail="User Incorrect")
    user = search_user_db(form.username)
    if not form.password == user.password:
        raise HTTPException(status_code=400, detail="Password Incorrect")
    return {"acces_token": user.username, "token_type": "bearer"}


@router.get("/users/me")
async def me(user: User = Depends(current_user)):
    return user


def search_user(username: str):
    if username in users_db:
        return User(**users_db[username])  # Indico que son varios parametros


def search_user_db(username: str):
    if username in users_db:
        return UserDB(**users_db[username])  # Indico que son varios parametros
