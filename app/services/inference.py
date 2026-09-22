from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

model_path = "./models/fake_news_deberta_final"
tokenizer = None
model = None

def load_model():
    global tokenizer, model
    print("Loading tokenizer and trained model into memory...")
    tokenizer = AutoTokenizer.from_pretrained("microsoft/deberta-v3-small")
    model = AutoModelForSequenceClassification.from_pretrained(model_path)
    model.eval()

def predict_fake_news(text: str):
    if tokenizer is None or model is None:
        load_model()
    
    # Convert words to mathematics
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=256)
    
    with torch.no_grad():
        outputs = model(**inputs)
        probabilities = torch.softmax(outputs.logits, dim=1)
        
    confidence, predicted_class = torch.max(probabilities, dim=1)
    
    # Based on our data pipeline, 0 is Fake and 1 is True
    result = "True" if predicted_class.item() == 1 else "Fake"
    
    return {
        "prediction": result,
        "confidence": round(confidence.item() * 100, 2)
    }
