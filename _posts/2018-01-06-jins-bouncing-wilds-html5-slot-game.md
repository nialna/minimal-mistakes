## Jin's Bouncing Wilds

Jin's Bouncing Wilds is an HTML5 slot game I made at Gamesys. It was an ambitious project for the company, as it had a lot of animations and features compared to usual slot games.

The game is centered around the character, Jin (a red panda) that can bounce from symbol to symbol, creating bonuses for the player.

<iframe src="https://player.vimeo.com/video/234324988" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/234324988">Jin&#039;s Bouncing Wilds</a> from <a href="https://vimeo.com/gamesyscreative">Gamesys</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

The game is made in  HTML5 and runs on canvas/webGL with [Pixi.js](http://www.pixijs.com/) for rendering. It uses [Spine](http://esotericsoftware.com/) for advanced animations, too.

To build this game, we made a new game engine from scratch. I am product owner of this game engine as I am leading the development of the engine in my team. We focused heavily on tooling to enable artists to easily integrate their assets, add animations and special effects without developer input.

![JBW1]({{site.url}}{{site.baseurl}}/assets/img/2018/Jan/jbw1.png)

We made a custom tween engine for this game that our artists use to create and modify animations in the game that are fully described in json template files. The majority of the game's visuals can fully be controlled by modifying json files, which is great for designers.

I also developed new testing tools at the same time for automating game testing and making QA life easier.

![JBW2]({{site.url}}{{site.baseurl}}/assets/img/2018/Jan/jbw1.png)