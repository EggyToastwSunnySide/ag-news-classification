# modules/

All pipeline code for this project (data loading, preprocessing, feature extraction, models and evaluation) currently lives in [`assignment.ipynb`](../assignment.ipynb). It is **not** split into separate Python modules, so this folder holds only this README.

The table maps each pipeline stage to the notebook sections that implement it. Section titles are copied from the notebook headings.

| Stage | Notebook sections |
| --- | --- |
| Setup | Library Installation and Imports |
| Data loading | Dataset Loading |
| Exploratory data analysis | 1. Exploratory Data Analysis (1.1–1.6) |
| Preprocessing | 2. Text Preprocessing (Configuration A — Traditional ML Cleaning, Configuration B — Deep Learning / Transformer Cleaning, Preprocessing Unit Checks) |
| Data splits | 3. Training, Validation, and Test Preparation (3.1–3.3) |
| Features: sparse | 4. Traditional Text Feature Extraction (4.1–4.4) |
| Models: traditional | 5. Traditional Machine Learning Models (5.1–5.8) |
| Features: pretrained | 6. Pretrained Text Representations (6.1 GloVe, 6.2 Frozen DistilBERT, 6.3–6.4) |
| Models: pretrained embeddings | 7. Classification Using Pretrained Embeddings (7.1–7.5) |
| Models: deep learning | 8. BiLSTM Text Classification (8.1–8.7); 9. Fine-tuning DistilBERT (9.1–9.5) |
| Evaluation | 10. Final Model Evaluation and Comparison (10.1–10.2); 11. Error Analysis (11.1–11.5) |
