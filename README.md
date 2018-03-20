# Gesture-Based-Assignment

## Table of Contents

+ [Requirements](#requirements)
+ [Planning](#planning)
+ [Technologies](#technologies)
+ [References](#references)

## Requirements

+ An application with a Natural User Interface is required, i.e. controlled by natural means - body movements, vocal commands, etc.
+ The minimum expectations for this NUI app would be a locally run implementation.
+ Any programming language can be used.
+ Each project should be developed by teams of two.

## Planning

Upon hearing the specifications of the project, we quickly formulated an idea to build a buzz wire game. This childhood game, very familiar to most, seemed like a ideal application to be controlled by gestures, as opposed to a feigned, impractical buzz wire game controlled by keyboard or mouse controls.

Now we had settled the orientation of our app, we needed to brainstorm and figure out how to implement the application. After considering using [Myo](https://www.myo.com) armbands(supplied by the college) and camera motion tracking(with coloured finger tips), we decided to take advantage of the Myo armbands. The Myo armbands come equipped with both an accelerometer and a gyroscope. They also have prebuilt gestures which could come in handy if adding any additional features. 

Myo armbands are compatible with mulitiple languages including C# and JavaScript, which were particularly interested in.

+ **C#** - Using Unity with C# would be a suitable choice to make a game. [Unity](https://unity3d.com) is a efficient, cross platform game engine that supports both 2D and 3D graphics. The unity app could then be exported and uploaded to the [Myo Market](https://market.myo.com/).
+ **JavaScript** - JavaScript would not be as optimal for game making. However, a powerful game engine may not needed for such a simplistic game. A HTML5 canvas would probably suffice. If needed a JavaScript game framework could be applied in making  the game, e.g. [Phaser JS](https://phaser.io/). Most notably, the application would be easily accessible - more than that of a Myo Market application. Instead of downloading and installing software, a simple HTTP request in a favoured browser would bring a user to the game. 

After considering the options, we agreed JavaScript would be ideal considering that it meets our requirements and has the most favorable deployment. We will attempt to use solely HTML5 canvas - if this proves to be insufficient, we will investigate the many JavaScript game frameworks. As for the actual deployment, we plan to host a simple Python server with Docker and Heroku.

## Technologies

+ [**HTML5**](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) - HTML(HyperText Markup Language) is simply a standardized markup language used to display and structure data on a web page. Importantly, HTML ```<canvas>``` element is used to draw graphics, on the fly, via JavaScript. We will be utilizing this feature to create our game.
+ [**JavaScript**](https://www.javascript.com/) - JavaScript is a high-level scripting language, usually partnered with HTML, that allows dynamic control of content. JavaScript the most common programming language used in web development, and can also be used for other purposes, e.g. to create device application.
+ [**Python 3**](https://www.python.org/download/releases/3.0/) - Python is a simple yet powerful programming language. It offers programmers the rare ability to focus mainly on the solution, and less on adhering to a strict syntax. We will be employing Python 3 and the [Flask](http://flask.pocoo.org/) framework for the server-side scripting. The @app.route decorator will be used to map the URL to functions in the flask application.
+ [**Docker**](https://www.docker.com/) - Docker is a tool for clean deployment. It uses containerization to manage and encapsulate an applications dependencies and its execution.
+ [**Heroku**](https://www.heroku.com/) - Heroku is a platform as a service (PaaS). It offers a high-level cloud server based on a managed container system with integrated data services for deploying and running modern apps. 

## References

(list of refs here)

-----

__*Rebecca Kane - G00xxxxx@gmit.ie*__ | __*Tara O'Kelly - G00322214@gmit.ie*__
