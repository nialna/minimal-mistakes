---
title: "Tanks: HTML5 real-time multiplayer game with physics"
---

Tanks is an HTML5 real-time multiplayer game made as a school project. It is built on a node.js server using socket.io, and on the front end box2d for physics. At the time (2013) those technologies were still relatively new and the project was a good occasion of learning more about game networking and physics.

It's a mini game (made in a few days of work). Each player controls a tank and has to shoot other enemies. It's just a sort of online arena in which everyone can connect and shoot.

![Tanks]({{site.url}}{{site.baseurl}}/assets/img/2014/May/tanks.png)

This was my first multiplayer game, and also my first node.js project.

We made fun with a few nice features:

Tracks behind the tanks. It's actually funny to draw tracks behind you.
The tanks are slow, and the projectiles too. But your projectiles can bounce on walls, so it's actually a tactical gameplay where you hit your enemies by using bounces.
Some blocks of the environments are destructible, other aren't. So you can hide behind them, or break them for surprise attacks.