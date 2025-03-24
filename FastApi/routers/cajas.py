from fastapi import APIRouter, HTTPException
from pydantic import BaseModel  # Crea una entidad, nos evita crear el constructor

router = APIRouter(
    prefix="/cajas", tags=["cajas"], responses={404: {"message": "Not Found"}}
)


@router.get("/")
async def cajas():
    return {"cajas": "cajitas"}
