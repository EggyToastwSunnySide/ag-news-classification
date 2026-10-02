/* Current recorded results from results/metrics/final_model_test_comparison.csv. */
window.GAZETTE_RESULTS = [
  {
    "name": "Fine-tuned DistilBERT",
    "shortName": "Fine-tuned DistilBERT",
    "accuracy": 0.9442105263157895,
    "f1": 0.9442995008084135,
    "validationF1": 0.946880238509704,
    "trainingTime": 680.3467549999477,
    "inferenceTime": 4.823254800052382,
    "timingScope": "Transformer fine-tuning",
    "inferenceScope": "Dynamic tokenization and neural forward passes"
  },
  {
    "name": "Linear SVM + TF-IDF",
    "shortName": "TF-IDF + Linear SVM",
    "accuracy": 0.9214473684210527,
    "f1": 0.9213045770538542,
    "validationF1": 0.9229905449163166,
    "trainingTime": 6.263177699991502,
    "inferenceTime": 0.014455000055022538,
    "timingScope": "Classifier fitting only",
    "inferenceScope": "Classifier prediction on precomputed features"
  },
  {
    "name": "Logistic Regression + frozen DistilBERT",
    "shortName": "Frozen DistilBERT + LR",
    "accuracy": 0.9096052631578947,
    "f1": 0.909527336980783,
    "validationF1": 0.9156730784798548,
    "trainingTime": 75.95538589998614,
    "inferenceTime": 0.06494780001230538,
    "timingScope": "Classifier fitting only",
    "inferenceScope": "Classifier prediction on precomputed embeddings"
  },
  {
    "name": "BiLSTM",
    "shortName": "BiLSTM",
    "accuracy": 0.9086842105263158,
    "f1": 0.9085503444287034,
    "validationF1": 0.9080361152821856,
    "trainingTime": 84.12156439991668,
    "inferenceTime": 0.2721365001052618,
    "timingScope": "End-to-end model training",
    "inferenceScope": "Padded batches and neural forward passes"
  },
  {
    "name": "Linear SVM + GloVe",
    "shortName": "GloVe + Linear SVM",
    "accuracy": 0.8869736842105264,
    "f1": 0.8867429178978379,
    "validationF1": 0.892107701899601,
    "trainingTime": 5.458242999971844,
    "inferenceTime": 0.014692199998535216,
    "timingScope": "Classifier fitting only",
    "inferenceScope": "Classifier prediction on precomputed embeddings"
  }
];
