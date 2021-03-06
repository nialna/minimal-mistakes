---
title: "Experimental Unity game with procedural meshes"
---

We had a weird [game]({{ site.url }}{{ site.baseurl }}/assets/files/boxgame/index.html) idea to make with Unity: The player can place spots on the ground, and depending on how much are placed, things happen when you press a button:

* 1 spot: Little explosion around it
* 2 spots: A line appears between the two spots, slowing down any enemy passing by
* 3 spots: The triangle formed by the spots becomes a black hole, every enemy in it dies.

![]({{ site.url }}{{ site.baseurl }}/assets/img/2014/May/boxgame.png)
So the gameplay is all about moving around and placing spots to slow enemies and kill them. The more you kill in a single triangle, the more point you have.

It was made very quickly (a day or so) and we spent time on getting funny graphics. We were also experimenting with procedural meshes (which is the initial reason for this gameplay)

You can play either with gamepad (A to place dots, X to use them) or keyboard (Space to place dots, Alt to use).

(The game used to have a feature to upload scores and other things but this isn't hosted anymore).