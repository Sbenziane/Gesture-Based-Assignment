# Gesture-Based UI Project (60%) 2018
*A JavaScript Buzz Wire game with a gesture controlled UI, using a Myo armband and a Python backend. Developed as part of Fourth Year Software Development module Gesture Based UI.*

### Project Requirements
Develop an application with a Natural User Interface(NUI), i.e. controlled by natural means - body movements, vocal commands, etc.
+ The minimum expectations for this NUI app would be a locally run implementation.
+ Any programming language can be used.
+ Each project should be developed by teams of two.
+ This task is worth 60% of the overall grade and is to be completed, in teams of two, by the 9th of April. 

*Team Members: [Rebecca Kane](https://github.com/rebeccabernie)&npsb;&npsb;/&npsb;&npsb;[Tara O'Kelly](https://github.com/taraokelly)*

## Introduction
Upon hearing the specifications of the project, we quickly formulated an idea to build a buzz wire game. This childhood game, very familiar to most, seemed like a ideal application to be controlled by gestures, as opposed to a feigned, impractical buzz wire game controlled by keyboard or mouse controls. With a broad idea as to what the end result of this project should be, we began brainstorming the actual implementation.

We considered two possible hardware solutions for our project -  
+ Motion tracking using a camera and coloured finger tips, using [trackingjs](https://trackingjs.com/)  
+ Electromyographic sensor based gesture recognition, using a [Myo](https://www.myo.com) armband  

After deliberating over the two technologies we decided to go with the Myo armband. We chose the Myo for a number of reasons, which we outline in the *[Hardware Used in Creating the Application](#hardware-used-in-creating-the-application)* section. We also had to consider the software options for our project and decided on a single page JavaScript web application hosted on [Heroku](https://www.heroku.com/), as this option would allow the user to access the game through any browser - arguably more accessible than a traditional native app for the [Myo Market](https://market.myo.com/).  

## Purpose of the Application  
While there are a number of digital versions of the classic Buzz Wire game available online, we failed to find any that used gesture based controls over the impractical keyboard and mouse method. The fact that there was no existing online game playable in a similar fashion to the original reassured us that our application would be unique and useful, while also meeting the requirements for this assignment.  
### Application Design  
When designing our web application we felt a simple approach would be best, regarding both the look of the application ands how it works.  

The rules of any buzz wire game are the same - move the loop from the starting point to the finish, without touching the wire. Rather than a start button, we took advantage of one of the Myo's in-built commands, further explained in *[Gestures Identified as Appropriate for this Application](#gestures-identified-as-appropriate-for-this-application)* section. We also wanted to incorporate a scoring system and agreed that a time based score (quicker being better) would suit best. We then decided that due to the app's online nature, it should have a real-time worldwide leaderboard of every player's score.  

In regards to the design of the webpage, we decided to split it into two sections to prevent the page looking crowded. The first section, visible when the page loads, contains the game, a timer, a lightbulb, and an information icon which displays a pop-up modal containing a guide when clicked. Each time the user makes the *start game* gesture, the timer starts. If the user hits the loop off the wire, the timer stops and a buzz noise will sound and the lightbulb will illuminate, indicating the end of the game. The section section of the page can be seen by scrolling down, and contains the leaderboard of top ten worldwide scores as well as some information relating to the context and development of the project.  

## Gestures Identified as Appropriate for this Application  
As mentioned in the previous section, we decided that due to the gesture-based nature of this game it would make sense to control all aspects of the game (including starting and restarting a game) with some of the Myo's in-built capabilities and gestures. The game can be started by making a fist, much like you would if you were holding the handle of the loop in a traditional buzz wire game. Once started, the user should release their hand as each time the Myo detects the fist gesture, it will restart the game.  

Once the game has begun, the Myo uses its accelerometer and gyroscope to track the position and movement of the user's arm, allowing for rotation of the loop as well as movement in any direction along the wire. Rotation was not considered when we first began development of the game, but it became clear very quickly that rotation would be required to move the loop around bends in a realistic manner similar to the original game.  

We also added gesture functionailty to activate the help pop-up. If the user makes the pinch gesture, a pop-up will appear on screen containing information relevant to the game.   

In short, our aim with any gesture-related functionality was to keep it as close as possible to how you would play a traditional game of buzz wire in real life. In particular, the fist gesture and position/movement functionality were heavily inspired by the traditional game.

## Hardware Used in Creating the Application  
As mentioned in the introduction, we considered two possible hardware solutions for our project; motion tracking using a camera and [trackingjs](https://trackingjs.com/), and electromyographic sensor based gesture recognition using a [Myo](https://www.myo.com) armband. We thought the camera-based motion tracking was interesting and would be accessible to almost everyone due to most laptops having integrated cameras. However, when we considered the limited functionality of motion tracking versus the many different functions included in the Myo armband, it was clear that the Myo would be a better option.  

Having a variety of integrated functions such as gestures, accelerometer and gyroscope (as opposed to simply tracking motion) ultimately allowed us to give the natural user interface a larger role in the project, and also made the development process as a whole easier. Had we used motion tracking the user likely would have only been able to use gestures in-game, whereas our finished project heavily features gestures and movement not only in-game, but also to start the game and to activate the help pop-up.

## Architecture for the Solution  
Our application is split into three categories - frontend, backend, and database. The architecture of each is described below.  

**Frontend**  
The frontend of our application comprises of one html page and three associated Javascript files.  

+ **templates/index.html** - The `index.html` file gives our application a face, and allows users to interact with the application in a simple manner. It contains the webpage heading, the game container, the timer, a lightbulb, tutorial button, the worldwide leaderboard, information regarding the creators, and a link to the project's github repository. The file also contains some JavaScript code, which loads the game, connects the Myo armband, handles specific Myo gestures, and controls the opening and closing of the tutorial.   
+ **static/js/game.js** - This controls all game related logic, including drawing the wire and loop and updating the position of the loop, as well as saving the user's data upon winning a game. It also handles creating collision boxes for detecting when the loop is off the wire, and checking if the loop is on the wire every time the loop position updates. If the user loses a game, the file will trigger the lightbulb and buzz noise and the game and timer will be reset. If the user wins a game, they are asked to enter a username, which is then pushed with their score to `connect.py`to be saved to the database. Note that user scores are saved without the `:` to make it easier to compare how high or low a score is, for example 2:09 becomes 209, 0:59 becomes 059, 3:00 becomes 300.
+ **static/js/script.js** - The `script.js` file handles loading the game into the specified container on the home page, and the fading effects of the tutorial pop-up. It also controls what happens when each of the three Myo gestures used in our application are detected.  
+ **static/js/scoreboard.js** - Handles populating and updating the game leaderboard. The leaderboard will populate when the page is first opened, and every second after that the script will check to see if any entries in the top ten scores have changed and if so, will change the relative entry in the page leaderboard.  
+ **static/js/timer.js** - This file controls the starting, updating, and stopping of the game's timer, including timer formatting.  
+ **static/js/tutorial.js** - When the user makes a double-tap gesture, the `index.html` file will call a method in the `tutorial.js` file to open or close the tutorial pop-up, depending on if the pop-up is already open or not. The file also sets the content of the pop-up.  

**Backend**
The backend of our application consists of only one simple Python file, `connect.py`. This file is responsible for passing data to and from the MongoDB *leaderboard* document. The file first checks to see if the application is being run in development or production mode, and configures variables related to MongoDB configuration accordingly.  
There are five methods in this file, three of which are related to routes called by the `index.html` file.  

+ **index()**, related to http://buzzwire.herokuapp.com/. This method simply returns the index.html file.  
+ **getScoreList()**, executed when the `/getScoreList` route is called in any `.js` file. This method finds all entries in the leaderboard document within the database, sorts these scores in ascending order, and returns the first ten entries, i.e the lowest (and therefore best) scores.  
+ **save()**, executed when the `/save` route is called in any `.js` file. This method saves the data, passed when the route is called, to the leaderboard document.  
+ **intOverZero(s)**, used by the `my_decorator` function to check if a score is valid, i.e. over 0:00.
+ **my_decorator(f)**, used by the `save()` method to check if a username was entered. If the score is valid and no username was entered, the username variable will be set to "Anon", if the score is valid and a username over 20 characters in length was entered, that username will be cut to 20 characters in length.  

**Database**  
We used MongoDB locally as our database, which is only accessed directly by the `connect.py` file. The database `gestproj` contains a document `leaderboard`, which stores one JSON formatted record per entry. An example layout would be as follows:  

    gestproj  
        leaderboard  
            {
                "_id": {
                "$oid": "5aba519b52a92d1390d822b0"
            },
            "username": "Marvin42",
            "score": "109"
            }

            {
                "_id": {
                "$oid": "5aba529652a92d21609d200f"
            },
            "username": "kirkj",
            "score": "256"
            }


### Diagram of Architecture
For the sake of tidiness, 
![architecturediagram](https://user-images.githubusercontent.com/14957616/38140885-d0ee9078-342d-11e8-9078-429a3ba38a3e.png)

## How To Manually Run the Finished Application

### Set up

List of prerequisites:

+ [Git](https://git-scm.com/downloads)
+ [Python 3](https://www.python.org/download/releases/3.0/)
+ [Heroku Account](https://signup.heroku.com/?c=70130000000NeLCAA0&gclid=CjwKCAjwwPfVBRBiEiwAdkM0HV0DAE_WpJnbrwRzcIh4naph70MyZipAtj4V-3gPhEep8HRvLMy__RoCfrkQAvD_BwE)
+ [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
+ [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community)

Copy the contents of the Webapp/Mongo directory into your desired local directory, open a command line in that directory, and initialize using the `git init` command.  
Next, login to heroku with your account credentials. Once logged in, create the webapp's domain with the create command (DO NOT INCLUDE []). Alternatively, you can choose a randomly generated name by leaving out the name, but beware - the names can be whack.

```
heroku login
heroku create [name]
```

The full domain name should be returned, e.g. https://name.herokuapp.com.  Next, we have to create the mongolab add on.

```
heroku addons: create mongolab
```

The Mongo URI is then set as an environment variable and be accessed in the CLI using the config:get command. We also need to set up the IS_HEROKU environment variable, which needed in order to set up the application. 

```
heroku config:get MONGODB_URI
heroku config:set IS_HEROKU=True
```

### Run locally

Make sure Mongo is running locally by using the `mongod` command in the `bin` folder of the MongoDB installation folder. In a different command line, set IS_HEROKU to False to use the development mode. Then simply run the python file.

```
heroku config:set IS_HEROKU=False
python connect.py
```

### Deploy on Heroku

Set IS_HEROKU to True to use the production mode. Add everything in the repository, stage the commit, and finally, push to Heroku.

```
heroku config:set IS_HEROKU=True
git add .
git commit -m "[commit msg]"
git push heroku master
```

## Conclusions & Recommendations  
Conclusions are what you have learned from this project and the associated research.  Recommendations are what you would do differently if you were to undertake the project again.  The Reflective Piece – what I learned and “enjoyed”  

----

## *List of References*

[Myo](https://www.myo.com) / [Myo Market](https://market.myo.com/) / [Myo JS](https://github.com/thalmiclabs/myo.js) / [Myo JS Vector](https://github.com/thalmiclabs/myojs-vector)

[JavaScript](https://www.javascript.com/)

[HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)

[**MongoDB**](https://www.mongodb.com/)

[Python 3](https://www.python.org/download/releases/3.0/)

[Docker](https://www.docker.com/)

[Heroku](https://www.heroku.com/)

[Canvas](https://docs.microsoft.com/en-us/uwp/api/windows.ui.xaml.controls.canvas)

[Unity](https://unity3d.com)

[Phaser JS](https://phaser.io/)

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse

http://scienceprimer.com/draw-oval-html5-canvas

https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas

https://stackoverflow.com/questions/20275316/detecting-mouse-collision-with-closed-bezier-curved-shapes-in-canvas

https://stackoverflow.com/questions/17125632/html5-canvas-rotate-object-without-moving-coordinates

https://stackoverflow.com/questions/7707286/set-canvas-origin-to-the-lower-left-corner

https://stackoverflow.com/questions/11052720/how-to-calculate-coordinates-of-third-point-in-a-triangle-2d-knowing-2-points

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath

-----

__*Rebecca Kane - G00320698@gmit.ie*__ | __*Tara O'Kelly - G00322214@gmit.ie*__