from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel  # Crea una entidad, nos evita crear el constructor
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import jwt
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from datetime import datetime, timedelta

ALGORITHM = "HS256"
ACCESS_TOKEN_DURATION = 1
SECRET = "975fd54c58795df25761aeadd7e29df7a8edda7e96c2e7bdb0f14882025b7acb"

router = APIRouter(
    prefix="/jwt_auth", tags=["JWT_auth"], responses={404: {"message": "Not Found"}}
)
Oauth2 = OAuth2PasswordBearer(tokenUrl="login")

crypt = CryptContext(schemes=["bcrypt"])


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
        "password": "$2a$12$Uh27YkD0CPuGNG6Jh85K9e4ftiiR.SjKJYLBFu6sl3497KgAboPaG",
    },
    "mouredev2": {
        "username": "mouredev2",
        "name": "asdsa",
        "email": "asdas2@gmail.com",
        "disabled": True,
        "password": "$2a$12$Uh27YkD0CPuGNG6Jh85K9e4ftiiR.SjKJYLBFu6sl3497KgAboPaG",
    },
}


def search_user_db(username: str):
    if username in users_db:
        return UserDB(**users_db[username])


def search_user(username: str):
    if username in users_db:
        return User(**users_db[username])


async def auth_user(token: str = Depends(Oauth2)):
    exception_unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="UNAUTHORIZED",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        username = jwt.decode(token, SECRET, algorithms=[ALGORITHM]).get("sub")
        if username is None:
            raise exception_unauthorized

    except InvalidTokenError:
        raise exception_unauthorized
    return search_user(username)


async def current_user(user: User = Depends(auth_user)):
    if user.disabled:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Disabled User"
        )
    return user


@router.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user_db = users_db.get(form.username)
    if not user_db:
        raise HTTPException(status_code=400, detail="User Incorrect")
    user = search_user_db(form.username)

    crypt.verify(form.password, user.password)

    if not crypt.verify(form.password, user.password):
        raise HTTPException(status_code=400, detail="Password Incorrect")

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_DURATION)

    access_token = {"sub": user.username, "exp": expire}

    return {
        "acces_token": jwt.encode(access_token, SECRET, algorithm=ALGORITHM),
        "token_type": "bearer",
    }


@router.get("/users/me")
async def me(user: User = Depends(current_user)):
    return user
