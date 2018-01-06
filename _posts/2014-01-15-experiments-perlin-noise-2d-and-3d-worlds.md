##Experiments: Perlin noise 2D and 3D worlds

Have you heard of Perlin noise? It is quite an amazing thing that has a wide range of uses in games (and in other stuff).

Basically, Perlin noise is a random number generator between 0 and 1 with inputs. But instead of generating pure random numbers, it generates numbers that smoothly "interpolate" between each other.
As a picture can be worth lots of words, let's see what the Perlin noise can do in 1D

![](assets/img/2014/Jan/noise1.png)
*Classical random number generation: Numbers are 100% random, they do not care about the value of `x` and if we tried to make a path it wouldn't look really great.*

![](assets/img/2014/Jan/noise2.png)
*Perlin noise pseudo-random generation: The noise generates a random number that is coherent with the evolution of `x`, giving random but smooth paths.*

##So what's the deal?

So that's great we can generate random curves. And then what?

Well to start with, random curve generation can actually have some use. Imagine you're making a shooter game or something, and want your ennemies to have pseudo-random paths. With Perlin noise and a little fine-tuning you could have random paths along your screen. Although I wouldn't advice random paths on a shooter, since it's all about learning ennemies' move. But that's just an example.

Anyway, the coolest thing isn't this little curve, it's the dimensions. What I've shown you is 1D Perlin noise, but it also works in 2D, 3D, and 4D (and more but really I don't know what to do with five dimensions).

What it means is that instead of just generating points on a curve, you can generate points for 2 coordinates, that is 2D points. What can you do with 2D random points?

* Texture generation
* Heightmap generation
* Clouds
* Position of stars in a procedural galaxy
* ...

![](assets/img/2014/Jan/perlin_noise.png)
*Bare Perlin noise values in an image : Black = 0, White = 1.*

You can also generate 2D worlds with it. Just look at the previous image and imagine it is a heightmap. Black is deep ocean, white is the top of the highest mountains. Then replace black and white by according colors, fine-tune your random a little and you have a world map.

Here is an example for a [prototype]() I built a few months ago. It generates a 2D world using Perlin noise. It's a bit ugly and world generation isn't great, but you get the idea. Click to move.

##3D noise

Now let's move on to 3D. If Perlin noise uses three inputs, you get (x,y,z) points. Which means you can generate 3D things, and that's really awesome. Some examples:

* 3D planets
* 3D atmosphere, particle systems, clouds
* 3D game world (the most known example being Minecraft)
* 2D Animations: The third dimension is used as the time, meaning that you can get values for (x, y, t) * A 2D point depending on the time

![](assets/img/2014/Jan/chUrHZE.png)
*Some procedural space game that generates planets in Unity. Prototype I've been working on lately*

I have created a little [demo](assets/files/perlin/index.html) of 3D noise used in javascript to create 2D animations. As you can see Perlin noise is a costly algorithm, and the image has to be scaled down to be processed in real time. You can check the full source code on [github]().

Perlin noise can really produce all sort of things, here are some screenshots:
![](assets/img/2014/Jan/gen1.png)
![](assets/img/2014/Jan/gen2.png)
![](assets/img/2014/Jan/gen3.png)
