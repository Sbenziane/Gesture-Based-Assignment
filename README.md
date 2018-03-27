# Gesture Based Assignment

*An JavaScript Buzz Wire game with a gesture controlled UI, using a Myo armband, and a Python backend. Forth Year, Gesture Based UI, Software Development.*

This repository contains a project assigned the assist the learning of the module Gesture Based UI. This task is worth 60% of the overall grade and is to be completed, in teams of two, by the 9th of April. 

## Table of Contents

+ [Requirements](#requirements)
+ [Team](#team)
+ [Planning](#planning)
+ [Technologies](#technologies)
+ [Implementation](#implementation)
+ [How To Run](#how-to-run)
+ [References](#references)

## Requirements

+ An application with a Natural User Interface(NUI) is required, i.e. controlled by natural means - body movements, vocal commands, etc.
+ The minimum expectations for this NUI app would be a locally run implementation.
+ Any programming language can be used.
+ Each project should be developed by teams of two.

The full specification can be found in the [spec.pdf](https://github.com/taraokelly/Gesture-Based-Assignment/blob/master/spec.pdf) file.

## Team 

+ [Rebecca Kane](https://github.com/rebeccabernie)
+ [Tara O'Kelly](https://github.com/taraokelly)

## Planning

Upon hearing the specifications of the project, we quickly formulated an idea to build a buzz wire game. This childhood game, very familiar to most, seemed like a ideal application to be controlled by gestures, as opposed to a feigned, impractical buzz wire game controlled by keyboard or mouse controls.

Now we had settled the orientation of our app, we needed to brainstorm and figure out how to implement the application. After considering using [Myo](https://www.myo.com) armbands(supplied by the college) and camera motion tracking(with coloured finger tips), we decided to take advantage of the Myo armbands. The Myo armbands come equipped with both an accelerometer and a gyroscope. They also have prebuilt gestures which could come in handy if adding any additional features. 

Myo armbands are compatible with mulitiple languages including C# and JavaScript, which were particularly interested in.

+ **C# UWP** - The game could be made with C# and Xaml using the [canvas](https://docs.microsoft.com/en-us/uwp/api/windows.ui.xaml.controls.canvas) element. The application could be then be run on any recent Windows platform.
+ **C# Unity** - Using Unity with C# would be a suitable choice to make a game. [Unity](https://unity3d.com) is a efficient, cross platform game engine that supports both 2D and 3D graphics. The unity app could then be exported and uploaded to the [Myo Market](https://market.myo.com/).
+ **JavaScript** - JavaScript would not be as optimal for game making. However, a powerful game engine may not needed for such a simplistic game. A HTML5 canvas would probably suffice. If needed a JavaScript game framework could be applied in making  the game, e.g. [Phaser JS](https://phaser.io/). Most notably, the application would be easily accessible - more than that of a Myo Market application. Instead of downloading and installing software, a simple HTTP request in a favoured browser would bring a user to the game. 

After considering the options, we agreed JavaScript would be ideal considering that it meets our requirements and has the most favorable deployment. We will attempt to use solely HTML5 canvas - if this proves to be insufficient, we will investigate the many JavaScript game frameworks. As for the actual deployment, we plan to host a simple Python server with Docker and Heroku.

## Technologies

+ [**HTML5**](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) - HTML(HyperText Markup Language) is simply a standardized markup language used to display and structure data on a web page. Importantly, HTML ```<canvas>``` element is used to draw graphics, on the fly, via JavaScript. We will be utilizing this feature to create our game.
+ [**JavaScript**](https://www.javascript.com/) - JavaScript is a high-level scripting language, usually partnered with HTML, that allows dynamic control of content. JavaScript the most common programming language used in web development, and can also be used for other purposes, e.g. to create device application.
+ [**Python 3**](https://www.python.org/download/releases/3.0/) - Python is a simple yet powerful programming language. It offers programmers the rare ability to focus mainly on the solution, and less on adhering to a strict syntax. We will be employing Python 3 and the [Flask](http://flask.pocoo.org/) framework for the server-side scripting. The @app.route decorator will be used to map the URL to functions in the flask application.
+ [**Docker**](https://www.docker.com/) - Docker is a tool for clean deployment. It uses containerization to manage and encapsulate an applications dependencies and its execution.
+ [**Heroku**](https://www.heroku.com/) - Heroku is a platform as a service (PaaS). It offers a high-level cloud server based on a managed container system with integrated data services for deploying and running modern apps. 

## Implementation

### Game 

#### Game Objects

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

#### Myo Controls

Now that the game objects were set up we needed to control them via the Myo armband. Fortunately [Thalmic Labs](https://www.thalmic.com/) have released a JavaScript plugin [Myo JS](https://github.com/thalmiclabs/myo.js) to manage the connection with Myo, stream data and detect certain gestures. They have also provided [Myo JS Vector](https://github.com/thalmiclabs/myojs-vector), a plugin that is dependent on the previously mentioned plugin to build on top of its functionality. It manages the data to refine the position and its rotation to mimic the bands directional magnitude. To convert this vector data to suit the span of our canvas, we needed to multiply the *x*,*y* position by the desired height or width of the canvas and multiply the theta value by 360 to convert it to degrees. We also add a listener function waiting for the fist gesture event. When it is triggered, the game is started or restarted. The orientation is set to zero, the hoop rotated to 90 degrees at the start of the wire and its movement is relative to the position of your hand when you start the game. For this reason, it is best to start the game with the back of your hand facing upward. Its also optimal to hold your hand low and close to your body. As mentioned in the Myo JS Vector documentation, the charging light/port should be toward your hand, otherwise you will have parallel directions, i.e. up = down, right = left, etc.

#### Collisions

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

## How To Run

(how to run here)

## References

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse

-----

__*Rebecca Kane - G00320698@gmit.ie*__ | __*Tara O'Kelly - G00322214@gmit.ie*__
