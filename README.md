# PredictCare
A breast cancer detection website which classifies a tumour as benign or malignant and works on image classifcation with the help of CNNs.
# 🩺 PredictCare – Breast Tumor Classification System

**PredictCare** is a machine learning-powered web application designed to classify breast tumors as **benign** or **malignant**. The project has been implemented using two approaches:  
1. **Feature Extraction** using traditional ML models (Logistic Regression, SVC)  
2. **Image Processing** using Deep Learning (CNN, ResNet50 with Transfer Learning)

The app allows medical professionals to upload tumor-related data or mammogram images for quick and reliable classification.

> 🔗 **Live Demo:** [Visit PredictCare on Vercel](https://vercel.com/shreys-projects-b5d58e34/v0-firebase-integration-with-flask-8q/9vGHFcVLVQEFD9VceMVv94NdhLot)

---

## 🚀 Features

- Classifies tumors as **Benign** or **Malignant**
- Supports both **numerical feature input** and **image upload**
- Trained on ~8,000 labeled medical images
- Integrated with **ResNet50** for high-accuracy image-based classification
- Real-time predictions on a sleek UI
- Secure login & registration system for healthcare professionals

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python, Flask
- **Machine Learning:** 
  - Logistic Regression, Support Vector Classifier (feature-based)
  - CNN, ResNet50 (image-based)
- **Libraries/Tools:** scikit-learn, TensorFlow, Keras, NumPy, OpenCV
- **Deployment:** Vercel (Frontend), Flask server (locally or with Render/Heroku)

---

## 📊 Model Details

| Approach            | Model Used         | Accuracy |
|---------------------|--------------------|----------|
| Feature Extraction  | Logistic Regression, SVC | ~94%     |
| Image Processing    | CNN + ResNet50 (TL) | ~97%     |

---

## 📂 Folder Structure
PredictCare/
│
├── frontend/ # HTML/CSS/JS files for UI
├── backend/ # Python Flask server
├── models/ # Saved ML models (.pkl, .h5)
├── static/uploads/ # Uploaded images
├── templates/ # Jinja2 templates for Flask
├── README.md
└── requirements.txt

---

## 🧪 Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/PredictCare.git
cd PredictCare
pip install -r requirements.txt
cd backend
python app.py
If deployed on Vercel (frontend only), make sure the backend server is also running or hosted.
