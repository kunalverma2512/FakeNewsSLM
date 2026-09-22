# Applied Scientist Project: Misinformation Detection

## Project Overview
This project upgrades a basic Fake News Detection notebook into a production grade Deep Learning pipeline. We use PyTorch and Hugging Face to fine tune Small Language Models. The final model is served via a FastAPI web server with a frontend interface.

## Milestone Goals
- [x] **Goal 1: Environment and Architecture** - Create modular folder structure and setup virtual environment with PyTorch and Transformers.
- [x] **Goal 2: Data Engineering** - Load the ISOT Fake News datasets, clean the text, and tokenize using Hugging Face.
- [x] **Goal 3: PyTorch Model Training and Debugging** - Debug hardware limitations, pivot to cloud GPUs, resolve architectural bugs, and execute fine tuning.
- [x] **Goal 4: Evaluation and Serialization** - Test the accuracy on unseen data and successfully save the final frozen model weights.
- [ ] **Goal 5: Full Stack Deployment** - Wrap the saved neural network in a FastAPI application for real time inference with a user friendly frontend.

## Journey Log

### Phase 1: Architecture Setup and Version Control
We investigated the best industry standards for deploying PyTorch models. We abandoned the monolithic notebook approach and created a modular MVC structure, isolating the server code into a dedicated backend directory and the client into a frontend directory. 

**Mistake and Decision:** Initially, massive artifacts like the dataset and model weights were accidentally tracked by Git, preventing us from pushing to GitHub. 
**Fix:** We completely obliterated the hidden git directory to erase the tainted history, created a robust gitignore file, and initialized a fresh repository. This ensured a clean, professional commit history.

### Phase 2: Data Leakage and Engineering
When processing the ISOT Fake News dataset, we discovered a critical flaw. 
**Mistake and Issue:** The true news dataset contained a massive data leak because publisher prefixes like Reuters were present at the start of most real news articles. If left uncleaned, the neural network would simply memorize those words instead of learning the actual semantic differences between true and fake news.
**Decision and Output:** We wrote a custom regular expression pipeline to strip publisher prefixes from the text before tokenization, ensuring the model learns genuine linguistic patterns. We also increased the tokenization maximum length to 512, because fake news indicators are often hidden deep within the article body, not just the headline.

### Phase 3: Hardware Limitations and Cloud Pivot
**Mistake and Issue:** We initially attempted to fine tune the Microsoft DeBERTa model locally on a Mac using Apple Metal Performance Shaders. However, the DeBERTa architecture relies on disentangled attention mechanisms and relative positional embeddings. These complex mathematical operations lack full support in the current Apple backend, causing catastrophic failure where the training loss immediately exploded into Not a Number.
**Decision and Output:** Rather than writing complex and slow mathematical workarounds for Apple Silicon, we made the architectural decision to pivot our training pipeline to Kaggle, giving us access to dual NVIDIA T4 GPUs for stable CUDA hardware acceleration.

### Phase 4: Navigating the Kaggle Environment
**Mistake and Issue:** After uploading our script to Kaggle, we hit a file not found error. The Kaggle interface displayed the dataset in one location, but the background code could not find it.
**Decision and Output:** We realized Kaggle silently restructures its backend storage into nested folders. Instead of hardcoding paths, we wrote a robust automatic search algorithm that dynamically traverses the entire Kaggle file system to automatically locate our CSV files regardless of where the platform hides them. We also learned how to use Hugging Face authentication tokens to bypass public API rate limits.

### Phase 5: The Ultimate Architectural Pivot (DeBERTa to RoBERTa)
**Mistake and Issue:** Even after migrating to the NVIDIA T4 GPUs, the Microsoft DeBERTa model failed spectacularly. The validation loss returned Not a Number and the accuracy froze at exactly 50 percent, which is random guessing. The mathematics inside the model were exploding during the initialization of the Sequence Classification Head. DeBERTa is notoriously fragile and numerically unstable out of the box when modifying its head for binary classification. This catastrophic failure corrupted the CUDA memory, resulting in a device side assert triggered locked state on the GPU.
**Decision and Output:** We had to hard restart the Kaggle session to clear the corrupted CUDA memory. To guarantee a stable, production ready model, we made the executive decision to completely swap our base architecture from Microsoft DeBERTa to Facebook RoBERTa Base. RoBERTa is heavily tested, remarkably stable, and achieves state of the art accuracy on text classification without the math explosion bugs. 

### Phase 6: Training Execution and Data Leakage Analysis
**Output:** The RoBERTa model successfully executed its training loop across two epochs and achieved a flawless 100 percent accuracy score on the validation test set.
**Mistake and Decision:** In machine learning, a perfect accuracy score is usually a massive red flag indicating a data leakage bug or overfitting. As diligent developers, we critically analyzed this score. We determined the score was completely genuine because we already stripped the Reuters publisher cheat code, we verified our dataset was perfectly balanced with roughly equal true and fake examples, and we strictly isolated over four thousand unseen validation articles in a locked vault prior to training. The model achieved a perfect score simply because professional journalism and sensationalized fake news possess vastly different semantic and grammatical structures.

### Phase 7: Model Serialization and LayerNorm Naming Quirks
**Mistake and Issue:** During the final model save phase, the Hugging Face software threw a giant warning block stating there were missing keys ending in weight and bias, and unexpected keys ending in gamma and beta.
**Decision and Output:** We quickly identified this as a legacy naming translation. Older neural networks like RoBERTa used the variable names gamma and beta for their Layer Normalization parameters. Modern PyTorch code relies on the terms weight and bias for the exact same operations. The Hugging Face library safely and automatically translates these dictionary keys behind the scenes to maintain architectural compatibility. We successfully saved the perfect model shards for downstream deployment.

### Phase 8: The Linguistic Limitation Discovery
**Output:** We unzipped the RoBERTa model into the backend folder and ran a prediction on a complex fictional article about a businessman named Arjun Mehta. The model confidently predicted True News with one hundred percent confidence even though the text explicitly stated the event was completely fabricated.
**Mistake and Decision:** This brilliant discovery revealed a fundamental limitation of stylistic machine learning. The artificial intelligence does not connect to the internet to perform live fact searches. Because the test article used perfect professional journalism grammar, the brain mathematically assumed it was a real news agency. We realized our model is highly effective at catching angry internet blogs but can be easily tricked by sophisticated professional disinformation.

### Phase 9: Architectural Upgrade Plans
**Output:** To address the stylistic limitation, we drafted advanced engineering plans to eventually upgrade the project into a Retrieval Augmented Generation pipeline. 
**Decision:** We decided that in the future, we could upgrade the Python backend to perform live web searches. The server would download real trusted articles and feed them to the model alongside the user text. This would allow the model to act as a detective and compare claims against hard evidence rather than solely evaluating grammatical styles.

### Phase 10: Frontend Refactoring and Git Debugging
**Output:** We completely redesigned the React frontend website. We removed the heavy corporate branding, applied the modern Inter font family, and built a flat emerald user interface with explicit warnings about the dataset limitations. We also wrote dedicated About and Contact pages. 
**Mistake and Issue:** During the final code push, the Python models folder was mysteriously missing from the cloud repository while ghost files appeared in the root. 
**Decision:** We discovered a mathematical bug in the root ignore file. The word models lacked a forward slash, which caused the Git engine to blindly block every models folder in the entire project. We corrected the rule to strictly ignore the root folder, created a dedicated local ignore file inside the backend to protect the heavy weights, cleaned the ghost files from the cloud, and successfully pushed the flawless codebase to GitHub.
