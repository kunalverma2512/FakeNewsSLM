import pandas as pd
from datasets import Dataset
from transformers import AutoTokenizer
import os

def prepare_data():
    print("Loading raw CSV files...")
    true_df = pd.read_csv("data/True.csv")
    fake_df = pd.read_csv("data/Fake.csv")

    print("Assigning labels and combining...")
    true_df['label'] = 1
    fake_df['label'] = 0

    combined_df = pd.concat([true_df, fake_df], ignore_index=True)

    # Clean duplicates as observed in the original notebook
    combined_df.drop_duplicates(inplace=True)

    # Combine title and text for rich context
    combined_df['content'] = combined_df['title'].fillna('') + " " + combined_df['text'].fillna('')
    
    # We only need the content and label for training
    df_clean = combined_df[['content', 'label']].copy()
    
    # Shuffle the dataset
    df_clean = df_clean.sample(frac=1, random_state=42).reset_index(drop=True)

    print("Converting to Hugging Face Dataset format...")
    hf_dataset = Dataset.from_pandas(df_clean)

    print("Loading Microsoft DeBERTa Tokenizer...")
    # DeBERTa v3 uses a specialized tokenizer to convert words into mathematical vectors
    tokenizer = AutoTokenizer.from_pretrained("microsoft/deberta-v3-small")

    def tokenize_function(examples):
        # Truncate to 256 tokens to keep training fast on the Mac GPU
        return tokenizer(examples["content"], padding="max_length", truncation=True, max_length=256)

    print("Tokenizing the entire dataset. This might take a minute...")
    tokenized_dataset = hf_dataset.map(tokenize_function, batched=True)

    print("Splitting into Training and Testing sets...")
    # 80 percent training, 20 percent testing
    split_dataset = tokenized_dataset.train_test_split(test_size=0.2, seed=42)

    print("Saving processed datasets to disk...")
    split_dataset.save_to_disk("data/processed_dataset")
    print("Data Engineering pipeline complete!")

if __name__ == "__main__":
    prepare_data()
