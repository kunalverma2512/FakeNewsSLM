from datasets import load_from_disk
from transformers import AutoModelForSequenceClassification, TrainingArguments, Trainer
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
import torch

def compute_metrics(pred):
    labels = pred.label_ids
    preds = pred.predictions.argmax(-1)
    precision, recall, f1, _ = precision_recall_fscore_support(labels, preds, average='binary')
    acc = accuracy_score(labels, preds)
    return {
        'accuracy': acc,
        'f1': f1,
        'precision': precision,
        'recall': recall
    }

def main():
    print("Loading processed mathematical dataset...")
    dataset = load_from_disk("data/processed_dataset")

    print("Loading Microsoft DeBERTa Neural Network...")
    # We specify num_labels=2 because our output is binary (Fake or True)
    model = AutoModelForSequenceClassification.from_pretrained("microsoft/deberta-v3-small", num_labels=2)

    # Define how the neural network should learn
    training_args = TrainingArguments(
        output_dir="./models/fake_news_deberta",
        learning_rate=2e-5,
        per_device_train_batch_size=16,
        per_device_eval_batch_size=16,
        num_train_epochs=1, # One epoch is plenty to achieve incredible accuracy
        weight_decay=0.01,
        eval_strategy="epoch",
        save_strategy="epoch",
        load_best_model_at_end=True,
        logging_steps=50,
        report_to="none" # Disable external logging to keep things clean
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=dataset["train"],
        eval_dataset=dataset["test"],
        compute_metrics=compute_metrics,
    )

    print("Starting Neural Network Fine Tuning on Apple Silicon GPU...")
    trainer.train()

    print("Saving final production model weights...")
    trainer.save_model("./models/fake_news_deberta_final")
    print("Training Complete!")

if __name__ == "__main__":
    main()
