from flask import Flask, request, json, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'gamescores'
app.config['MONGO_URI'] = 'mongodb://gestureproj:gest@ds121309.mlab.com:21309/gamescores'

mongo = PyMongo(app)

@app.route('/')
def index():
    return app.send_static_file('game.html')

def add():
    user = mongo.db.users
    user.insert({ "username": "ay", "score": "410" })
    user.insert({ "username": "yes", "score": "210" })
    user.insert({ "username": "john", "score": "401" })
    user.insert({ "username": "ay", "score": "5332" })

    return 'Added user'

def find():
    user = mongo.db.users
    john = user.find_one({'username': 'john'})

    return 'You found ' + john['username'] + ', score: '  + john['score']

def update():
    user = mongo.db.users
    john = user.find_one({'username': 'john'})
    newscore = 421
    oldscore = 401
    if newscore > oldscore:
        john['score'] = str(newscore)
        user.save(john)
        return "updated score"

    return "not updated"

def delete():
    user = mongo.db.users
    ay = user.find_one({'username': 'ay'})
    user.remove(ay)
    return "removed"

@app.route('/save', methods=['POST'])
def save():
    print("Reached save backend")
    scoreData = request.json
    print("score data: " + str(scoreData))
    user = mongo.db.users
    user.insert(scoreData)

    allscores = user.find()

    return allscores


if __name__ == '__main__':
    app.run(debug=True)