from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/analyze', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image = request.files['image']
    filename = image.filename.lower()

    # Simulate prediction based on filename
    if 'benign' in filename:
        result = 'Benign'
    elif 'malignant' in filename:
        result = 'Malignant'
    else:
        result = 'Could not determine (name should include "benign" or "malignant")'

    return jsonify({'result': result})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
