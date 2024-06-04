from flask import Flask, jsonify, request
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

movies = []

API_KEY = os.getenv('MOVIE_API_KEY')
BASE_URL = "http://www.omdbapi.com/"

def fetch_movie_data(title):
    response = requests.get(f"{BASE_URL}?t={title}&apikey={API_KEY}")
    return response.json()

def add_movie(movie_data):
    movies.append(movie_data)

def get_movie(title):
    for movie in movies:
        if movie['Title'].lower() == title.lower():
            return movie
    return None

@app.route('/movie/fetch', methods=['POST'])
def api_fetch_movie():
    request_data = request.get_json()
    title = request_data.get('title')
    if not title:
        return jsonify({'error': 'Title is required'}), 400
    movie_data = fetch_movie_data(title)
    if movie_data.get("Response") == "False":
        return jsonify({'error': 'Movie not found'}), 404
    add_movie(movie_data)
    return jsonify(movie_data), 200

@app.route('/movie/add', methods=['POST'])
def api_add_movie():
    movie_data = request.get_json()
    add_movie(movie_data)
    return jsonify(movie_data), 201

@app.route('/movie/<title>', methods=['GET'])
def api_get_movie(title):
    movie = get_movie(title)
    if movie:
        return jsonify(movie), 200
    else:
        return jsonify({'error': 'Movie not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)