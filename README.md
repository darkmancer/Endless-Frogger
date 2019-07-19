# Frogger Game Project

Frogger Game is a complete browser-based arcade game with endless ending.

You can play the game from [this link](https://darkmancer.github.io/Endless-Frogger/).

## Table of Contents

* [Game Rules](#game-rules)
* [Technical](#technical)
* [Credits](#credits)

## Game Rules

In this game there is a Player and Enemies (Bugs). The goal of the player is to reach the water, without colliding into any one of the enemies.

The player can move left, right, up and down using keyboard's arrow keys. The enemies move in varying speeds on the paved block portion of the scene. Once a the player collides with an enemy, the player moves back to the start square and loses 1 life. Once the player reaches the water 20 points are added to the score. The game is over when your life reach zero

Additionally there are 2 types of Items a green gem and a heart that player can collect to get bonus :

* **Heart** - 1 up life
* **green gem** - 50 points

## Technical

* **index.html** - contains the game's html structure.
* **style.css** - contains the game's board styling.
* **app.js** - contains all the board actions & logic.
* **engine.js** - provides the game loop functionality.
* **resources.js** - provides utility functions for loading game assets.

## Credits

Resources I referred to while working on this project:

* http://irene.marin.cat/udacity/project3/index.html
* https://github.com/ncaron/frontend-nanodegree-arcade-game/blob/master/js/app.js
* https://github.com/asaki444/frontendfrogger/blob/master/js/app.js
* The Udacity Front-End Nanodegree Forums: https://discussions.udacity.com/c/nd001-project-3-classic-arcade-game-clone
* https://discussions.udacity.com/t/having-trouble-displaying-the-score/26963
* https://discussions.udacity.com/t/need-help-refactoring/32466
* https://discussions.udacity.com/t/finite-state-machine-to-model-game-states/21955
* https://discussions.udacity.com/t/canvas-not-clearing-player-bug-fixed/29714
* https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
* http://stackoverflow.com/questions/4950115/removeeventlistener-on-anonymous-functions-in-javascript
* http://stackoverflow.com/questions/14542062/eventlistener-enter-key
* http://stackoverflow.com/questions/21553547/how-to-clear-timeout-in-javascript
* https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearTimeout
* https://discussions.udacity.com/t/jshint-warnings/34854/5
