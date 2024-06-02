from flask import Flask
from movies import get_movies, add_movie
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route('/movies', methods=['GET'])
def movies():
    return get_movies()

@app.route('/movies', methods=['POST'])
def new_movie():
    return add(self)ovie()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=os.getenv('PORT', 5000))