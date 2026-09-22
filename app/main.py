from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(
    title="Fake News Detection API",
    description="A production web server hosting a fine tuned Microsoft DeBERTa model."
)

app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Fake News Detection API"}
