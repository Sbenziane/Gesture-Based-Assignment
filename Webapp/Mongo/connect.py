from flask import Flask, request, json, jsonify, render_template, abort
from flask_pymongo import PyMongo
import pymongo, os
from pymongo import MongoClient
from bson.json_util import dumps, loads
from functools import wraps

app = Flask(__name__, static_url_path='/static')

production = os.environ.get('IS_HEROKU', None)

if production:
    MONGO_URI = os.environ.get('MONGODB_URI')
else:
    MONGO_URI = "mongodb://localhost:27017/"

app.config['MONGO_URI'] = MONGO_URI

mongo = PyMongo(app)

# Adapted from: https://stackoverflow.com/questions/1265665/how-can-i-check-if-a-string-represents-an-int-without-using-try-except
def intOverZero(s):
    try: 
        i = int(s)
        if i <= 0:
            return False
        return True
    except ValueError:
        return False

# Adapted from: https://docs.python.org/2/library/functools.html
def my_decorator(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        print('Calling decorated function')
        if request.is_json:
            name = request.json["username"]
            score = request.json["score"]
            if (len(score) >= 3) and (intOverZero(score)):
                if(len(name.strip()) < 1):
                    request.json["username"] = "Anon"
                if(len(name) > 20):
                    request.json["username"] = name[:20]
                return f(*args, **kwds)
            else:
                abort(400)
        abort(400)
    return wrapper

@app.route('/')
def index():
    return render_template('index.html') # Just displaying the index file

@app.route('/getScoreList', methods=['GET'])
def getScoreList():
    scores = mongo.db.scores
    cursor = scores.find()
    topten = cursor.sort([('score', pymongo.ASCENDING)]).limit(10) # Sort the returned documents based on score (ascending - lower score(quicker time) is better), limit results to 10 (only need top 10). Adapted from - https://api.mongodb.com/python/current/api/pymongo/cursor.html?highlight=sort#pymongo.cursor.Cursor.sort
    topscores = dumps(topten) # adapted from https://stackoverflow.com/a/30400268/7232648
    return topscores

@app.route('/save', methods=['GET', 'POST'])
@my_decorator
def save():
    print("Reached save backend")
    scoreData = request.json
    print("score data: " + str(scoreData))
    scores = mongo.db.scores
    _id = scores.insert(scoreData)
    if scores.find_one({'_id': _id}): # check if exists - https://stackoverflow.com/questions/25163658/mongodb-return-true-if-document-exists
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 
    return json.dumps({'error':True}), 500, {'ContentType':'application/json'} 

if not production:
    if __name__ == '__main__':
        app.run(debug=True)