from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import os

# We unzipped the model directly into backend/model/
# We use an absolute path or a path relative to the backend execution folder
model_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "model")

tokenizer = None
model = None

def load_model():
    global tokenizer, model
    print(f"Loading tokenizer and trained RoBERTa model into memory from {model_path}...")
    
    # Load completely locally from the folder
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForSequenceClassification.from_pretrained(model_path)
    model.eval()

def predict_fake_news(text: str):
    if tokenizer is None or model is None:
        load_model()
    
    # Convert words to mathematics
    # Using 512 as we decided it during our data engineering phase
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    
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
