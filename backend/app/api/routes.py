from fastapi import APIRouter
from app.models.schema import NewsRequest, NewsResponse
from app.services.inference import predict_fake_news

router = APIRouter()

@router.get("/ping")
def ping_server():
    return {"status": "awake and ready"}

@router.post("/predict", response_model=NewsResponse)
def predict(request: NewsRequest):
    result = predict_fake_news(request.text)
    return NewsResponse(
        prediction=result["prediction"],
        confidence=result["confidence"]
    )
