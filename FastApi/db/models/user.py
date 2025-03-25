from pydantic import BaseModel


class User(BaseModel):
    id: str | None = None  # Lo hago opcional
    username: str
    email: str
