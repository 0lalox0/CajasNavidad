from fastapi import FastAPI
from routers import cajas, users, basic_auth
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# routers
app.include_router(cajas.router)
app.include_router(users.router)
app.include_router(basic_auth.router)
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
async def root():
    return {"msg": "Hello"}
