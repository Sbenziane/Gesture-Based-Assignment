# Gesture-Based UI Project (60%) 2018
*A JavaScript Buzz Wire game with a gesture controlled UI, using a Myo armband and a Python backend. Developed as part of Fourth Year Software Development module Gesture Based UI.*

### Requirements
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

In regards to the design of the webpage, we decided to split it into two sections to prevent the page looking crowded. The first section, visible when the page loads, contains the game, a timer, a lightbulb, and an information icon which displays a pop up containing a guide when clicked. Each time the user makes the *start game* gesture, the timer starts. If the user hits the loop off the wire, the timer stops and a buzz noise will sound and the lightbulb will illuminate, indicating the end of the game. The section section of the page can be seen by scrolling down, and contains the leaderboard of top ten worldwide scores as well as some information relating to the context and development of the project.  

## Gestures Identified as Appropriate for this Application  
As mentioned in the previous section, we decided that due to the gesture-based nature of this game it would make sense to control all aspects of the game (including starting and restarting a game) with some of the Myo's in-built capabilities and gestures. The game can be started by making a fist, much like you would if you were holding the handle of the loop in a traditional buzz wire game. Once started, the user should release their hand as each time the Myo detects the fist gesture, it will restart the game.  

Once the game has begun, the Myo uses its accelerometer and gyroscope to track the position and movement of the user's arm, allowing for rotation of the loop as well as movement in any direction along the wire. Rotation was not considered when we first began development of the game, but it became clear very quickly that rotation would be required to move the loop around bends in a realistic manner similar to the original game.  

We also added gesture functionailty to activate the help pop up. If the user makes the pinch gesture, a pop up will appear on screen containing information relevant to the game.   

In short, our aim with any gesture-related functionality was to keep it as close as possible to how you would play a traditional game of buzz wire in real life. In particular, the fist gesture and position/movement functionality were heavily inspired by the traditional game.

## Hardware Used in Creating the Application  
As mentioned in the introduction, we considered two possible hardware solutions for our project; motion tracking using a camera and [trackingjs](https://trackingjs.com/), and electromyographic sensor based gesture recognition using a [Myo](https://www.myo.com) armband. We thought the camera-based motion tracking was interesting and would be accessible to almost everyone due to most laptops having integrated cameras. However, when we considered the limited functionality of motion tracking versus the many different functions included in the Myo armband, it was clear that the Myo would be a better option.  

Having a variety of integrated functions such as gestures, accelerometer and gyroscope (as opposed to simply tracking motion) ultimately allowed us to give the natural user interface a larger role in the project, and also made the development process as a whole easier. Had we used motion tracking the user likely would have only been able to use gestures in-game, whereas our finished project heavily features gestures and movement not only in-game, but also to start the game and to activate the help pop-up.

## Architecture for the Solution  
the full architecture for the solution, including the class diagrams, any data models, communications and distributed elements that you are creating.  

## Conclusions & Recommendations  
Conclusions are what you have learned from this project and the associated research.  Recommendations are what you would do differently if you were to undertake the project again.  The Reflective Piece – what I learned and “enjoyed”