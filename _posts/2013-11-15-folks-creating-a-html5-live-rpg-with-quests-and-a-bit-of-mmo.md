## Folks - Creating a HTML5 Animal Crossing-like Facebook game with quests and real-time events

Folks is a game I made during my last year at ISART Digital. 
It is a social game meant to produce an experience of peaceful living on a little village, in the kind of the *Animal Crossing* series.
The pitch is "Move to your new village, and create bonds with your new neighboors. Explore your village and discover all its secrets: magic plants and trees, mysterious events and fun characters!"
It is developped in HTML5 (with no framework used, because at the time html5 canvas was still pretty new).
![Logo Folks]({{ site.url }}{{ site.baseurl }}/assets/img/2013/Nov/logo.png).

We were two developers, two designers, two artists and one sound designer. We had about one day per month of official group-work on this project for the year.

Folks is one of the most challenging games I ever made, and I learned a lot. On the technical side we had to make a full game engine (given that HTML5 games were a pretty novel thing, and how our game was, it was better do start from scratch). 
Many of the game components we developed were things we never made before and had no clue how to make at the time.

So let's start with the basics:

* **Assets Pipeline** Our artists wanted to work in 3D, so we made a pipeline using Maya scripts and other tools to automatically generate 2D spritesheets from 3D models. This is similar to the process used in older 2D console games (think Donkey Kong on SNES) where the game uses pre-rendered 3D graphics to look better.
* **Rendering engine** We built our own isometric rendering engine that also supported free movement, collisions and very basic physics. The game maps were designed using [Tiled](http://www.mapeditor.org/) and parsed by our engine.
* **Procedural Generation** Each player was supposed to have their own unique village. The way we did this is by designing the world map as a grid composed of individual tiles (which are about the size of a screen). The algorithm would generate the player's world by placing those tiles semi randomly to create a coherent but unique world.
* **Animation engine**. We made our own animation system based on exported 3D assets and json config files.
* Real-time server and client gaming: The game map is dynamic and is saved during gameplay, events can be launched to and by the server anytime (for example a christmas event)
* Facebook communication: Players are able to go to their friends' worlds through Facebook and interact with them
* Quest branching and player progression
* Dialog API
* Scripting API for special game events

![Folks Screenshot]({{ site.url }}{{ site.baseurl }}/assets/img/2013/Nov/folksscreen.png)
#### Scripting system
Considering our heavy needs of controling the world by quest/event/dialog interaction, we needed a simple scripting system for game designers. We implemented hooks in every needed behaviour of the game, making us able to call special behaviours at will (moving a PNJ to a location from example) or to detect special events (Player picking up a fruit on the ground).
With these hooks, we designed a simple scripting system so the designers could write scripts for their quests/events/dialogs. It looks similar to that:

```js
asynchronous();
movePNJToPlayer(pnjName: "julie");
launchDialog(pnj: "julie", dialog:"julie_qst_03_03_launch");

waitAction(type : "gameobjectShovel", object : "ground");
synchronous();

givePlayerReward(reward: ["apple x 3", "money x 1000"]);
unlockTool(tool : "shovel");
movePNJ(pnj: "julie", location: "previousLocation");
```


The `asynchronous` and `synchronous` are the only programming-minded instructions.
The first is meant to execute each instruction one after each other, which means, waiting for each action to complete before launching the next (for the launchDialog it is waiting for the end of the dialog), so it is used for a *sequence* of actions.
The second is meant to execute every instructions at the same time, no matter they are finished or not. It's used when many things happen at once. In this case, giving a reward and unlocking a new tool.

With these two special instructions plus the hooks in game behaviours, we were able to try and create very complex events and quest behaviour pretty quickly, so we are happy with the result.

### Live event system
One of the keys of the game design was the real-time calendar. To keep players coming to the game, we wanted to build a lot of events associated to the real-life calendar. For example: Sunday fishing contest, full-moon marathon, or more simply a NPC going to the bar every evening.

To do that, we implemented a socket communication between client and server. The server continuously runs a loop to check if some world events are to be launched/finished. Every time that happens, it sends an event to all connected clients with the script of the event. Then the script is executed on the client and the event is launched. If a player connects, then their client receives the information of all currently running event scripts and they are launched too. This allows us to store all this content on the server and make the game faster to load, as they will only be received as needed.

We didn't have the time to create proper game events for our final demo, but we made a few tests like for example making a NPC run arround the map every minute, so that was a proof of concept.

### Quest System
The players were able to participate in quests, which followed the classical MMORPG mechanics: a PNJ has some quests, with conditions to unlock them. You take a quest, finish its steps one by one, and then receive a reward.
![Folks Quest diary screenshot]({{ site.url }}{{ site.baseurl }}/assets/img/2013/Nov/folksscreentruc.png)

#### Quest Life-cycle

The first thing we did here was to design the general life-cycle of a quest. Inspired by the Android app behaviour, we started with a simple life-cycle.

1) `Activate`: This step unlocks the quest and makes it `active`
2) `Start`: This step *launches* the quest and makes it `running`
3) The player does stuff
4) `Complete`: The last step of the quest is finished, and thus the quest is `Complete`
5) The player validates the end of the quest, making it `Finished`

Every step is a function with before/after hooks so we can script arround it.
The activate function just makes the quest active. This would for example make the famous "exclamation mark" appearing on a NPC and the starting dialog be available.
Then the start function, launched in a script, makes the quest running and start its objective.
At this moment all the quest objectives are initialized and pushed to the quest diary (more on that later). Most of the time this happens after a dialog, but a quest could also be launched by interacting with an object or doing anything that is scriptable.
Once the player fas finished the last objective, the Complete function is called, marking the quest complete and unlocking  its ending.
Once the player does the last ending action (usually the final dialog with the quest NPC) the action is marked as finished, its rewards are sent to the player, and it is deleted from the current quest diary.

#### Quest Objectives
While the quest is `running`, the player has a list of objectives to complete. Here's how it happens:

1) The quest fetches the current objective
2) The objective goes the same life-cycle as the quest, with each step containing many hooks that can run scripts written by the game designers, defining what happens during the quest
3) when the objective is finished, the quest fetches the next objective
4) If no objective is found, the quest is `complete`


The quests are stored in `json` files containing the description of the quest, its objectives and the associated scripts. [example file](https://pastebin.com/nzNpEkSx) (game tutorial). The file is in French because it was a french project. We hadn't implemented any localisation at the time.


#### Tools
Due to the lack of time on this student project, we weren't able to make as much tool as we wanted. Ideally, all the features mentioned previously would have tools for designers to easily create them.

We only had time to create a dialog editor tool (which proved very useful).  For the rest, designers had to edit json files to create content (which isn't that bad really).