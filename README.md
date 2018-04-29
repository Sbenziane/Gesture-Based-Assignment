# Gesture-Based UI Project (60%) 2018
*A JavaScript Buzz Wire game with a gesture controlled UI, using a Myo armband and a Python backend. Developed as part of Fourth Year Software Development module Gesture Based UI.*

### Project Requirements
Develop an application with a Natural User Interface(NUI), i.e. controlled by natural means - body movements, vocal commands, etc.
+ The minimum expectations for this NUI app would be a locally run implementation.
+ Any programming language can be used.
+ Each project should be developed by teams of two.
+ This task is worth 60% of the overall grade and is to be completed, in teams of two, by the 9th of April. 

*Team Members: [Rebecca Kane](https://github.com/rebeccabernie) and [Tara O'Kelly](https://github.com/taraokelly)*  

### Table of Contents  
[Introduction](#introduction)  
[Purpose of the Application](#purpose-of-the-application)  
[Gestures Identified as Appropriate for this Application](#gestures-identified-as-appropriate-for-this-application)  
[Hardware Used in Creating the Application](#hardware-used-in-creating-the-application)  
[Game Implementation](#game-implementation)  
[Architecture for the Solution](#architecture-for-the-solution)  
[Conclusions and Recommendations](#conclusions-and-recommendations)  
[List of References](#list-of-references)  

**Other**  
[How To Manually Run the Finished Application](#how-to-manually-run-the-finished-application)  

**Game Demonstration**  
A demonstration of the Buzz Wire Game is available on Youtube, [here](https://youtu.be/W8-ndcDzO4Q).

## Introduction
Upon hearing the specifications of the project, we quickly formulated an idea to build a buzz wire game. This childhood game, very familiar to most, seemed like a ideal application to be controlled by gestures, as opposed to a feigned, impractical buzz wire game controlled by keyboard or mouse controls. With a broad idea as to what the end result of this project should be, we began brainstorming the actual implementation.

We considered two possible hardware solutions for our project -  
+ Motion tracking using a camera and coloured finger tips, using [tracking.js](https://trackingjs.com/)  
+ Electromyographic sensor based gesture recognition, using a [Myo](https://www.myo.com) armband  

After deliberating over the two technologies we decided to go with the Myo armband. We chose the Myo for a number of reasons, which we outline in the *[Hardware Used in Creating the Application](#hardware-used-in-creating-the-application)* section. We also had to consider the software options for our project, and after some brief research discovered that Myo armbands are compatible with mulitiple languages including C# and JavaScript, which were particularly interested in.  
We considered the following platforms for Myo development:  

+ **C# UWP** - The game could be made with C# and Xaml using the [canvas](https://docs.microsoft.com/en-us/uwp/api/windows.ui.xaml.controls.canvas) element. The application could be then be run on any recent Windows platform.
+ **C# Unity** - Using Unity with C# would be a suitable choice to make a game. [Unity](https://unity3d.com) is a efficient, cross platform game engine that supports both 2D and 3D graphics. The unity app could then be exported and uploaded to the [Myo Market](https://market.myo.com/).
+ **JavaScript** - JavaScript would not be as optimal for game making. However, a powerful game engine may not needed for such a simplistic game. A HTML5 canvas would probably suffice. If needed a JavaScript game framework could be applied in making  the game, e.g. [Phaser JS](https://phaser.io/). Most notably, the application would be easily accessible - more than that of a Myo Market application. Instead of downloading and installing software, a simple HTTP request in a favoured browser would bring a user to the game. 

After more research and some discussion, we decided on a single page JavaScript web application, aiming to host it on [Heroku](https://www.heroku.com/). This option would allow the user to access the game through any browser - arguably more accessible than a traditional native app for the [Myo Market](https://market.myo.com/). Our final agreed list of technologies is as follows:  
+ [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) - a standardized markup language used to display and structure data on a web page. Importantly, HTML ```<canvas>``` element is used to draw graphics, on the fly, via JavaScript. We will be utilizing this feature to create our game.  
+ [JavaScript](https://www.javascript.com/) - a high-level scripting language, usually partnered with HTML, that allows dynamic control of content. The most common programming language used in web development, and can also be used for other purposes, e.g. to create device application.  
+ [Python 3](https://www.python.org/download/releases/3.0/) - a simple yet powerful language, Python offers programmers the rare ability to focus mainly on the solution, and less on adhering to a strict syntax. We will be employing Python 3 and the [Flask](http://flask.pocoo.org/) framework for the server-side scripting. The `@app.route` decorator will be used to map the URL to functions in the flask application.  
+ [MongoDB](https://www.mongodb.com/) - a NoSQL document database. Instead of using tables and rows, like in relational databases, MongoDB is built on an arcitecture of collections and documents. Collections are collections on similar documents, and documents comprise of key-value pairs - the most basic unit of data in MongoDB.
+ [Heroku](https://www.heroku.com/) - a platform as a service (PaaS). Heroku offers a high-level cloud server based on a managed container system with integrated data services for deploying and running modern apps.  

## Purpose of the Application  
While there are a number of digital versions of the classic Buzz Wire game available online, we failed to find any that used gesture based controls over the impractical keyboard and mouse method. The fact that there was no existing online game playable in a similar fashion to the original reassured us that our application would be unique and useful, while also meeting the requirements for this assignment.  
### Application Design  
When designing our web application we felt a simple approach would be best, regarding both the look of the application and how it works.  

The rules of any buzz wire game are the same - move the loop from the starting point to the finish, without touching the wire. Rather than a start button, we took advantage of one of the Myo's in-built commands, further explained in *[Gestures Identified as Appropriate for this Application](#gestures-identified-as-appropriate-for-this-application)* section. We also wanted to incorporate a scoring system and agreed that a time based score (quicker being better) would suit best. We then decided that due to the app's online nature, it should have a real-time worldwide leaderboard of every player's score.  

In regards to the design of the webpage, we decided to split it into two sections to prevent the page looking crowded. The first section, visible when the page loads, contains the game, a timer, a lightbulb, and an information icon which displays a pop-up modal containing a guide when clicked. Each time the user makes the *start game* gesture, the timer starts. If the user hits the loop off the wire, the timer stops and a buzz noise will sound and the lightbulb will illuminate, indicating the end of the game. The second section of the page can be seen by scrolling down, and contains the leaderboard of top ten worldwide scores as well as some information relating to the context and development of the project.  

## Gestures Identified as Appropriate for this Application  
As mentioned in the previous section, we decided that due to the gesture-based nature of this game it would make sense to control all aspects of the game (including starting and restarting a game) with some of the Myo's in-built capabilities and gestures. The game can be started by making a fist, much like you would if you were holding the handle of the loop in a traditional buzz wire game. Once started, the user should release their hand as each time the Myo detects the fist gesture, it will restart the game.  

Once the game has begun, the Myo uses its accelerometer and gyroscope to track the position and movement of the user's arm, allowing for rotation of the loop as well as movement in any direction along the wire. Rotation was not considered when we first began development of the game, but it became clear very quickly that rotation would be required to move the loop around bends in a realistic manner similar to the original game.  

We also added gesture functionailty to activate the help pop-up. If the user makes the double-tap gesture, a pop-up will appear on screen containing information relevant to the game.   

In short, our aim with any gesture-related functionality was to keep it as close as possible to how you would play a traditional game of buzz wire in real life. In particular, the fist gesture and position/movement functionality were heavily inspired by the traditional game.  

![gesturesimg](https://user-images.githubusercontent.com/14957616/38145343-af3ebf26-3440-11e8-911b-3767827c656b.png)

## Hardware Used in Creating the Application  
As mentioned in the introduction, we considered two possible hardware solutions for our project; motion tracking using a camera and [tracking.js](https://trackingjs.com/), and electromyographic sensor based gesture recognition using a [Myo](https://www.myo.com) armband. We thought the camera-based motion tracking was interesting and would be accessible to almost everyone due to most laptops having integrated cameras. However, when we considered the limited functionality of motion tracking versus the many different functions included in the Myo armband, it was clear that the Myo would be a better option.  

Having a variety of integrated functions such as gestures, accelerometer and gyroscope (as opposed to simply tracking motion) ultimately allowed us to give the natural user interface a larger role in the project, and also made the development process as a whole easier. Had we used motion tracking the user likely would have only been able to use gestures in-game, whereas our finished project heavily features gestures and movement not only in-game, but also to start the game and to activate the help pop-up.  

## Game Implementation

### Game Objects

Excluding the extra graphics in the game, the main objects of concern are the wire and hoop objects. We focused on creating the wire on the canvas first. After researching how to draw curved lines, there were two options: ```quadraticCurveTo(cpx,cpy,x,y)``` and ```ctx.bezierCurveTo(cpx,cpy,cpx,cpy,x,y);```. We mainly used the Bezier curve as it has more control points, giving it more flexibility in the path it takes between the start and end points of the line. Moving on to the hoop, we began using a solution adapted from the following [tutorial](http://scienceprimer.com/draw-oval-html5-canvas).

```javascript
PI2 = 2 * Math.PI;
PI0 = 0 * Math.PI;
// Example co-ordinates.
x = 50;
y = 450;
// Width and height radii.
w_r = 20;
h_r = 5;

for (var i = 0 * Math.PI; i < PI2; i += 0.01 ) {
               xPos = x - (h_r * Math.sin(i)) * Math.sin(PI0) + (w_r * Math.cos(i)) * Math.cos(PI0);
               yPos = y + (w_r * Math.cos(i)) * Math.sin(PI0) + (h_r * Math.sin(i)) * Math.cos(PI0);
               console.log("x: "+xPos);
               console.log("y: "+yPos);
               if (i == 0)
                   ctx.moveTo(xPos, yPos);
               else
                   ctx.lineTo(xPos, yPos);
           }
```

However, we discovered another function, ```ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)```, that would be more efficent as it provides the functionality to rotate, where as it would be much more cumbersome to rotate the above solution. This is important as the Myo arm band will have a constant stream of data that will continuously update the *x*,*y* position and rotation of the hoop.

### Myo Controls

Now that the game objects were set up we needed to control them via the Myo armband. Fortunately [Thalmic Labs](https://www.thalmic.com/) have released a JavaScript plugin [Myo JS](https://github.com/thalmiclabs/myo.js) to manage the connection with Myo, stream data and detect certain gestures. They have also provided [Myo JS Vector](https://github.com/thalmiclabs/myojs-vector), a plugin that is dependent on the previously mentioned plugin to build on top of its functionality. It manages the data to refine the position and its rotation to mimic the bands directional magnitude. To convert this vector data to suit the span of our canvas, we needed to multiply the *x*,*y* position by the desired height or width of the canvas and multiply the theta value by 360 to convert it to degrees. We also add a listener function waiting for the fist gesture event. When it is triggered, the game is started or restarted. The orientation is set to zero, the hoop rotated to 90 degrees at the start of the wire and its movement is relative to the position of your hand when you start the game. For this reason, it is best to start the game with the back of your hand facing upward. Its also optimal to hold your hand low and close to your body. As mentioned in the Myo JS Vector documentation, the charging light/port should be toward your hand, otherwise you will have parallel directions, i.e. up = down, right = left, etc.

### Collisions

Since this game is 2D, only the far edges of the hoop need to be checked for collisons with the wire. The following solution is what we used to calculate the edge points of a hoop given the center point and the angle in degrees.

```javascript
// Example co-ordinates of center point.
x1 = 50;
y1 = 450;
d1 = 90;

d2 = (d1) * Math.PI / 180,
d3 = (d1-180) * Math.PI / 180

// Edge points.
x2 = x1 + w * Math.cos(d2),
y2 = y1 + w * Math.sin(d2),
x3 = x1 + w * Math.cos(d3),
y3 = y1 + w * Math.sin(d3);
```

Now that we have the edges calculated, the next task was to determine if the edge points intersected with the wire path. This was complex to calculate because of the very irregular path. We found a function that we thought might serve well, ```isPointInPath(x,y)```. It did work well - just not for this task. It didn't just check if the point was on the curved line, i.e the wire, but also every point between the start and end points of the line. The solution we settled on was an adaption of a previous [project](https://emerging-technologies.github.io/problems/project.html). This project had a user draw number on a canvas, to then call the ```getImageData(x,y,width,height)```, retrieving the pixel data of the canvas. The data per pixel contains an rgb value. Using this, we took the Image Data object from a canvas containing just the wire. The we then checked the corresponding pixel data for the edge points. The wire was a shade lighter than black, so if the pixel data returned greater than 0(black or transparent), the edge point has collided with wire.

With the wire collisions working, it became apparent that there was still a major collision to tackle. The user could simply take the hoop of the start of the wire and put it on top. So, we needed a collision to tell if the hoop is not on the wire. This was tackled by the ```isPointInPath(x,y)``` function mentioned above. One edge point should be on one side of the wire and the one should be on the other side. If both edge points were in or out of the path, then it must be off the wire.

The hoop easily disappeared on game start, given that hands move or shake slightly involuntarily - moving the hoop below the starting point, making it off the wire to disappear. First we add a collision box at the beginning of the path to give hoop some leeway in movement. If the hoop is in the box, it is allowed be off the wire. After getting users to test the game we decided to update the collision so that if the hoop is in the collision box, it should stop the user from going down - stopping it from going off the wire. A simple check, while the hoop was in the start box, to see if the *y* value being updated is lower than the current *y* value achieved this.

Finally, the last collision  is needed at the end of the wire. This was very similar to the first implementation of start collison box. Once the center point of to hoop entered the end collision  box, the user has completed the wire and the game ends.

## Architecture for the Solution  
Our application is split into three categories - front-end, back-end, and database, each of which is described below.  

**Front-End**  
The front-end of our application comprises of one html page and five associated Javascript files.  

+ **templates/index.html** - The `index.html` file gives our application a face, and allows users to interact with the application in a simple manner. It contains the webpage heading, the game container, the timer, a lightbulb, tutorial button, the worldwide leaderboard, information regarding the creators, and a link to the project's github repository. The file also contains some JavaScript code, which loads the game, connects the Myo armband, handles specific Myo gestures, and controls the opening and closing of the tutorial.   
+ **static/js/game.js** - This controls all game related logic, including drawing the wire and loop and updating the position of the loop, as well as saving the user's data upon winning a game. It also handles creating collision boxes for detecting when the loop is off the wire, and checking if the loop is on the wire every time the loop position updates. If the user loses a game, the file will trigger the lightbulb and buzz noise and the game and timer will be reset. If the user wins a game, they are asked to enter a username, which is then pushed with their score to `connect.py`to be saved to the database. Note that user scores are saved without the `:` to make it easier to compare how high or low a score is, for example 2:09 becomes 209, 0:59 becomes 059, 3:00 becomes 300.
+ **static/js/script.js** - The `script.js` file handles loading the game into the specified container on the home page, and the fading effects of the tutorial pop-up. It also controls what happens when each of the three Myo gestures used in our application are detected.  
+ **static/js/scoreboard.js** - Handles populating and updating the game leaderboard. The leaderboard will populate when the page is first opened, and every second after that the script will check to see if any entries in the top ten scores have changed and if so, will change the relative entry in the page leaderboard.  
+ **static/js/timer.js** - This file controls the starting, updating, and stopping of the game's timer, including timer formatting.  
+ **static/js/tutorial.js** - When the user makes a double-tap gesture, the `index.html` file will call a method in the `tutorial.js` file to open or close the tutorial pop-up, depending on if the pop-up is already open or not. The file also sets the content of the pop-up.  

**Back-End**  
The back-end of our application consists of only one simple Python file, `connect.py`. This file is responsible for passing data to and from the MongoDB *leaderboard* document. The file first checks to see if the application is being run in development or production mode, and configures variables related to MongoDB configuration accordingly.  
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
For the sake of tidiness, the `css`, `img` and `snds` folders have not been included in this diagram.  
![architecturediagram](https://user-images.githubusercontent.com/14957616/38140885-d0ee9078-342d-11e8-9078-429a3ba38a3e.png)  

### Deployment on Heroku  
While the application works fine in its own right, we felt it should be more accessible. We assumed anyone without a background in software development would not be as comfortable as we are with downloading the repository, installing all dependencies, starting MongoDB from a command line and finally running the web application. Even for a user with good knowledge of these aspects, there is still a chance that something might not install right or versions of dependencies might differ. We felt these possible problems, not to mention the sheer trouble any user would have to go to in order to play the game, would really detract from the simplicity of the game itself and discourage anyone from using it.  

We came to the conclusion that it would be be best to deploy the application on [Heroku](https://www.heroku.com/). While Heroku took some time to get set up and proved tricky at times, we managed to deploy the app with the help of [Heroku's Python Documentation](https://devcenter.heroku.com/categories/python) and some online research. All responsibility regarding installation has now been taken away from the user, leaving them with two very simple tasks - open a browser, and navigate to http://buzzwire.herokuapp.com.  

Should you wish to download this repository and deploy the app from your own machine, we have included a guide on [How To Manually Run the Finished Application](#how-to-manually-run-the-finished-application), which includes a guide on deployment on Heroku.  

## Conclusions and Recommendations  
While we had a lot of previous experience working with Python, Flask, JavaScript, and some experience of Heroku, neither of us had much gesture-based development experience. Choosing to make a Buzz Wire game was a relatively quick decision for us, as we both agreed that not only should it satisfy all requirements for the project, but it would also be a bit of fun when completed. Further research leading us to discover that there were no gesture-based Buzz Wire games online reassured us that we had made a good decision. We carried out extensive research as to what technologies we could and should use both in terms of hardware and software, as described in the *[Introduction](#introduction)* and *[Hardware Used in Creating the Application](#hardware-used-in-creating-the-application)* sections. After completing this application, we both feel significantly more capable and comfortable working with gesture-based technologies and would certainly be more likely to incorporate the technologies in future projects.  

As for recommendations, we really don't have any major regrets regarding any part of the development process. Perhaps the standard "starting earlier" regret, but only for the sake of having the project finished sooner as opposed to fitting more features into the application. We were happy with how we planned and organised the project both before and during development and would only make very minor changes next time, such as maybe adding in some extra levels or different types of games. However, we do feel that for an assignment of this scope we created a well-rounded, clean application, keeping the user experience in mind at all times.  

Having completed the project, we can conclude that we still feel we made good decisions regarding ideas, design, and technologies used. The development process as a whole was relatively smooth and sometimes even enjoyable, particularly when testing the game. We believe our application has modernised the traditional buzz wire game, and has already got some laughs out of fellow students.
  

  


  
---  

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

----

## *List of References*

[Myo](https://www.myo.com) / [Myo Market](https://market.myo.com/) / [Myo JS](https://github.com/thalmiclabs/myo.js) / [Myo JS Vector](https://github.com/thalmiclabs/myojs-vector)

[JavaScript](https://www.javascript.com/)

[HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)

[MongoDB](https://www.mongodb.com/)

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
  
*[back to top](https://github.com/taraokelly/Gesture-Based-Assignment)*