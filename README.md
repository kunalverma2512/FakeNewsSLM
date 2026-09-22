# TruthLens: Misinformation Detection

**Repository:** [https://github.com/kunalverma2512/FakeNewsSLM](https://github.com/kunalverma2512/FakeNewsSLM)

## Project Scope and Limitations

This project is a sophisticated demonstration of Small Language Model classification. It was explicitly trained on the ISOT Fake News dataset. 

**Important Notice:** This artificial intelligence model analyzes the *stylistic and grammatical patterns* of the input text. It does not connect to the internet to perform live fact checking. 

Because of the dataset it was trained on, the model excels at detecting:
* Highly emotional language
* Sensationalist conspiracy theories
* Poorly written, biased internet blogs (often flagged as Fake News)
* Dry, professional, neutral journalism (often flagged as True News)

If a user inputs a completely fabricated story but writes it using perfect professional journalism grammar, the model will likely classify it as True News because it strictly analyzes the grammatical pattern. This project is a demonstration of stylistic machine learning, not an absolute arbiter of global truth.

## Architecture

* **Backend:** Python FastAPI server running a fine tuned RoBERTa model entirely locally.
* **Frontend:** React and Vite application with a beautiful dual pane interface.

## Creator

Built by Kunal Verma. 
* [Read my blog on Hashnode](https://diariesofkunal.hashnode.dev/)
