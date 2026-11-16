# AG News Topic Classification — Group 8

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/fufu3105/ag-news-classification/blob/main/assignment.ipynb)

Machine Learning (CO3117) course assignment, Task 2 (Text Data): four-class news topic classification on AG News.

- **Final report (PDF):** [reports/final_report.pdf](https://github.com/fufu3105/ag-news-classification/blob/main/reports/final_report.pdf)
- **Colab notebook:** [assignment.ipynb on Colab](https://colab.research.google.com/github/fufu3105/ag-news-classification/blob/main/assignment.ipynb)
- **GitHub Pages:** [fufu3105.github.io/ag-news-classification](https://fufu3105.github.io/ag-news-classification/)
- **Repository:** [fufu3105/ag-news-classification](https://github.com/fufu3105/ag-news-classification)

---

## Course Information

- **Course:** Machine Learning
- **Course code:** CO3117
- **Semester:** Semester I (261), Academic Year 2026–2027
- **Faculty:** Faculty of Computer Science and Engineering, Ho Chi Minh City University of Technology (HCMUT)
- **Lecturer:** Dr. Trương Vĩnh Lân
- **Group:** Group 8

## Team Members

| Name | Student ID | Email |
| --- | --- | --- |
| Trương Hoàng Phú | 2352924 | [phu.truonghoang@hcmut.edu.vn](mailto:phu.truonghoang@hcmut.edu.vn) |
| Nguyễn Tấn Khoa | 2352576 | [khoa.nguyen2352576@hcmut.edu.vn](mailto:khoa.nguyen2352576@hcmut.edu.vn) |
| Nguyễn Đức Thịnh | 2353140 | [thinh.nguyenthinh2503@hcmut.edu.vn](mailto:thinh.nguyenthinh2503@hcmut.edu.vn) |
| Lương Thế Kiệt | 2352649 | [kiet.luong1360@hcmut.edu.vn](mailto:kiet.luong1360@hcmut.edu.vn) |

---

## Objective

Classify English news articles from the [AG News dataset](https://huggingface.co/datasets/fancyzhx/ag_news) into four topics: World, Sports, Business and Sci/Tech. The notebook compares three families of approaches under one experimental setup:

- **Traditional pipelines:** Bag-of-Words, TF-IDF and TF-IDF unigram + bigram features with Multinomial Naive Bayes, Logistic Regression, Linear SVM and Random Forest.
- **Pretrained embeddings:** mean-pooled GloVe vectors and frozen DistilBERT embeddings (attention-mask mean pooling), each classified with Logistic Regression and Linear SVM.
- **Deep models:** a BiLSTM with learned word embeddings and a fine-tuned DistilBERT sequence classifier.

The notebook also covers exploratory data analysis, leakage-free train/validation/test preparation, preprocessing ablation, n-gram and hyperparameter sensitivity, runtime, confusion patterns and error analysis. Model selection uses validation Macro F1; the official test set is used once, for the final comparison.

## Results

Test-set Macro F1 of the model selected from each family, copied from [`results/metrics/final_model_test_comparison.csv`](results/metrics/final_model_test_comparison.csv) (rounded to 4 decimals):

| Rank | Model | Test Macro F1 |
| --- | --- | --- |
| 1 | Fine-tuned DistilBERT | 0.9443 |
| 2 | Linear SVM + TF-IDF (unigram + bigram) | 0.9213 |
| 3 | Logistic Regression + frozen DistilBERT | 0.9095 |
| 4 | BiLSTM | 0.9086 |
| 5 | Linear SVM + GloVe | 0.8867 |

Data split: 107,973 train / 11,987 validation / 7,600 test. The validation set is split from the official training data. 40 official training records whose normalized text overlaps a test input were removed from the training data.

---

## How to Run

### 1. Google Colab

Open the notebook with the badge above or this link: [assignment.ipynb on Colab](https://colab.research.google.com/github/fufu3105/ag-news-classification/blob/main/assignment.ipynb).

### 2. Local

```bash
# Clone repository
git clone https://github.com/fufu3105/ag-news-classification.git
cd ag-news-classification

# Optional: create a virtual environment
python -m venv venv
venv\Scripts\activate             # Windows
# source venv/bin/activate        # Linux / macOS

# Install dependencies
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

# Start Jupyter Notebook
jupyter notebook assignment.ipynb
```

Libraries are listed in [`requirements.txt`](requirements.txt) (NumPy, pandas, Matplotlib, seaborn, WordCloud, NLTK, scikit-learn, SciPy, Hugging Face Datasets and Transformers, Gensim ≥ 4.4.0, PyTorch, Jupyter).

**Recorded run:** the committed outputs were produced on Windows 11, Python 3.14.2, an NVIDIA GeForce RTX 5050 Laptop GPU, with `SEED = 42`. This is the environment of the recorded run, not a requirement.

### Data and Pretrained Models

No manual download is needed. The notebook downloads everything on first run and caches it under `data/` (git-ignored):

| Resource | How the notebook loads it | Cache path |
| --- | --- | --- |
| AG News dataset | `datasets.load_dataset("fancyzhx/ag_news")` | `data/raw/ag_news/` |
| GloVe vectors | `gensim.downloader.load("glove-wiki-gigaword-100")` | `data/pretrained/gensim/` |
| DistilBERT | `transformers` `from_pretrained("distilbert-base-uncased")` | `data/pretrained/huggingface/` |
| NLTK WordNet | `nltk.download("wordnet")` | `data/nltk_data/` |

### Generated Artifacts

Running the notebook writes these files. They are git-ignored and not stored in the repository:

- `features/traditional/` — sparse feature matrices (`.npz`) and split labels (`.npy`).
- `features/pretrained/` — dense GloVe and frozen DistilBERT embeddings (`.npy`, about 422 MiB in total).
- `models/bilstm/best_validation_model.pt` — best-validation BiLSTM checkpoint.
- `models/distilbert_finetuned/best_validation_model/` — best-validation fine-tuned DistilBERT model and tokenizer.

Metrics, tables and figures are written to `results/` and are committed.

#### Download features

Google Drive link: [ag-news-features](https://drive.google.com/drive/folders/1oCFBaANxYipA5F7bYCYpBbyhf1Jzn59b) (public, view only)

Download the `pretrained/` and `traditional/` folders into `features/`. SHA-256 checksums of all 18 files are in `features/SHA256SUMS.txt` of the course submission zip.

---

## Repository Structure

```text
ag-news-classification/
├── assignment.ipynb        # Full pipeline: EDA, preprocessing, features, models, evaluation
├── README.md
├── requirements.txt
├── .gitignore
├── data/                   # Download caches (git-ignored contents)
│   ├── raw/
│   └── processed/
├── docs/                   # GitHub Pages site
│   ├── index.html
│   └── assets/
├── features/               # Generated feature files (git-ignored contents)
├── models/                 # Generated model checkpoints (git-ignored contents)
├── modules/                # Placeholder; see modules/README.md
│   └── README.md
├── reports/                # Final report
│   └── final_report.pdf
└── results/                # Experiment outputs
    ├── figures/
    ├── metrics/
    └── tables/
```

All code is in `assignment.ipynb`; [`modules/README.md`](modules/README.md) maps each pipeline stage to its notebook section.

## Submission Note

The course submission zip uses the folders `notebooks/`, `modules/`, `reports/` and `features/`. It is assembled from this repository separately; this repository keeps the notebook at the root.

---

## References

- [AG News dataset on Hugging Face](https://huggingface.co/datasets/fancyzhx/ag_news)
- [Scikit-learn text feature extraction](https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction)
- [Gensim Downloader API](https://radimrehurek.com/gensim/downloader.html)
- [GloVe: Global Vectors for Word Representation](https://nlp.stanford.edu/projects/glove/)
- [DistilBERT documentation](https://huggingface.co/docs/transformers/model_doc/distilbert)
- [DistilBERT paper](https://arxiv.org/abs/1910.01108)
- [PyTorch LSTM documentation](https://docs.pytorch.org/docs/stable/generated/torch.nn.LSTM.html)
