There's a game I'd like to make, a procedural game with generated planets and resources, in which you'd have your ship to go from one to the other, and would have to survive.

I've been working on a prototype of spaceship controls and planet generation for that idea. The planet generation is extremely basic at the moment (using 3D perlin noise to generate big planets, but I don't handle biomes yet), but what's interesting here is the ship controls. I've been trying to find a good way to manage the camera so that it adapts to speed and free 3D movement. It's really hard to get it right but I think I've got something not bad.

![Spaceship screenshot]({{site.url}}{{site.baseurl}}/assets/img/2014/May/spaceship.png).

It's a rough prototype, and only [playable]({{site.url}}{{site.baseurl}}/assets/files/spaceship/index.html) with a gamepad for now. Use left stick to rotate, right stick to power the motors.