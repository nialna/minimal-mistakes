---
title: "Jin's Bouncing Wilds - HTML5 Casino game made at Gamesys"
---

Jin's Bouncing Wilds is an HTML5 slot game I made at Gamesys. It was an ambitious project for the company, as it had a lot of animations and features compared to usual slot games.

The game is centered around the character, Jin (a red panda) that can bounce from symbol to symbol, creating bonuses for the player.

<video width="640" height="480" controls>
  <source src="{{site.url}}{{site.baseurl}}/assets/img/2018/Jan/trailer.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

The game is made in  HTML5 and runs on canvas/webGL with [Pixi.js](http://www.pixijs.com/) for rendering. It uses [Spine](http://esotericsoftware.com/) for advanced animations, too.

To build this game, we made a new game engine from scratch. I am product owner of this game engine as I am leading the development of the engine in my team. We focused heavily on tooling to enable artists to easily integrate their assets, add animations and special effects without developer input.

![JBW1]({{site.url}}{{site.baseurl}}/assets/img/2018/Jan/jbw1.png)

We made a custom tween engine for this game that our artists use to create and modify animations in the game that are fully described in json template files. The majority of the game's visuals can fully be controlled by modifying json files, which is great for designers.

I also developed new testing tools at the same time for automating game testing and making QA life easier.

![JBW2]({{site.url}}{{site.baseurl}}/assets/img/2018/Jan/jbw1.png)