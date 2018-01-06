##Building Mario Galaxy 3C in Unity

I have been working on prototyping different things with Unity3D in the hope of making a game with it. It turns out that one of those prototypes was quite challenging and interesting to make. This article is about mimicking the physics of Mario Galaxy (where the player is pulled towards small planets by gravity).

##Mario Galaxy

![Mario Galaxy]({{ site.url }}{{ site.baseurl }}/assets/img/2014/Jan/super_mario_galaxy_wii_09.jpg)

So what's so special about this game? Well, first it's a Nintendo game, which means the camera, controls and characters are amazing, and second, it's the first platformer (at least the first I know of) to feature a player gravitating around arbitrarilly formed planets, which can't be done with simple physics.


##Walking around a planet

My first idea was to use "real life physics" by assigning a gravity force to each planet and everything. But it somehow didn't seem quite right.

I don't think Nintendo went this way. The way Mario can move on platforms of any form and still be easilly controllable is not realistic at all, but it's really great. I think this experience sums up really well the bottom-up childish Nintendo way of designing games.

![]({{ site.url }}{{ site.baseurl }}/assets/img/2014/Jan/070908smg_scr33.jpg)

So, luckilly for me I did some research and found a really interesting idea: It consists of using normals to change the player's direction depending on the face underneath them. Let me explain myself:

The planet is a random mesh, with a mesh collider, and the player is placed on its surface. When the player moves, we want them to stay on the surface of the planet, or more precisely to be oriented so that when they fall, they fall in the direction of the surface. To do that, we just use ray tracing to check the first planet underneath the player. Then it's really simple: You take the normal vector to the face that the player has hit.
You rotate the player so that they're aligned with the face up vector, and you have successfully re-orientated the player according to the shape of the planet.
If you have planets that are high-poly, you can then have a smooth movement on the surface of it just by looking the direction of the face under you.

Then there's a lot of code to write so you can smooth things, handle jump correctly (my player was initially falling down to space when jumping from a cliff sometimes), and other things which would be too long to explain here. Here is [the code]() for the "stickToPlanet" component that makes any gameObject keep its orientation arround a planet.
 
The interesting part is that (may contain random stuff used in my prototype, sorry):
```csharp

	void Update () {
		Vector3 dwn = transform.TransformDirection(Vector3.down);
		RaycastHit hit1;
		RaycastHit hit2;
		touchedSomething = false;
		if (stickDown && Physics.Raycast (transform.position, dwn, out hit1, linkDistance)) { // This is the main raycast that scans under the player for the planet
			linkToPlanet (hit1);
		}
        // Here I send different raycasts depending on the player situation. IE if the player is jumping to another planet we may have to search for it forward, up, left or right and not just under him
		if (Physics.Raycast ( transform.position, transform.up, out hit2, linkDistance)) {
			if (!stickDown || hit2.distance < hit1.distance) {
				linkToPlanet (hit2);
			}
		}
		if (!touchedSomething && !flying) {
			transform.Rotate (rotateCatchupSpeed * Time.deltaTime, 0f, 0f);
		}
		touchedSomething = false;
	}
    //...
    // If a planet is found, this is called
void linkToPlanet (RaycastHit planet) {
	if (planet.transform.tag == "Planet") {
		touchedSomething = true;
		Transform lastPlanet = this.planet;
		this.planet = planet.transform;
		if (this.planet != lastPlanet) {
			gameObject.SendMessage ("changePlanet", this.planet);
			lastPlanetChange = Time.time;
			startQuat = transform.rotation;
			startUp = transform.up;
		}
		flying = false;
		float frac = (Time.time - lastPlanetChange);
        // Here we set the rotation of the player depending on the hit normal
		transform.rotation = Quaternion.FromToRotation (transform.up, planet.normal) * transform.rotation;
		//transform.rotation = Quaternion.RotateTowards (transform.rotation, newRotation, 10f);
	}
}
```

##The camera

Another bit of challenge here was writing the camera. The player is rotating arround an arbitrary mesh and it was really hard to have a camera that felt right. I think I spent at least an hour walking about in Mario Galaxy just to see how they did it. As usual, Nintendo impressed me by how much details were put into their camera. Of course I couldn't reproduce the same thing alone, but I could still get something basic and working.

<iframe width="480" height="360" src="//www.youtube.com/embed/3F_rTQBz3b4" frameborder="0" allowfullscreen></iframe>
*If you want to see a bit the controls and camera in action*

## Demo, source code

Now you may want to see a [demo](assets/files/galaxy/index.html) of all that in action. Move with left stick (or arrow keys), A to jump, turn camera with right stick (or don't turn if you don't have a gamepad).

The meshes used here are extremely low poly so movement may be a bit ugly but it's just a proof of concept. Just jump to another object/planet to switch what you're attached to.

If you want to check the whole source code to understand some details, here is the [github repo]().
You can also directly get the [UnityPackage]() so you can insert it in a scene. 