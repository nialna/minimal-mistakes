---
title: "Grassy Chimera: Monster collecting roguelike RPG"
header:
  image: # "/assets/img/2020/May/chef-banner.jpg"
categories:
  - Projects
tags:
  - godot
---

Grassy Chimera is a monster collecting roguelike RPG with dating simulator elements I have been working on in my spare time. It is inspired from a PS1 game I liked a long time ago: [Azure Dreams](https://en.wikipedia.org/wiki/Azure_Dreams), which is a very special combination of a roguelike game loop, with monsters to collect and battle, and character relationships.

![grassy-chimera]({{site.url}}{{site.baseurl}}/assets/img/2020/May/grassy-1.png)
Grassy Chimera takes place in a town that is near a mythical forest full of monsters and treasures. This forest is composed of layer, each layer containing a teleportation portal moving the player to the next layer of the forest. The ultimate goal is to reach the deepest layer of the forest. Monsters will attack the player on the way, but the player can also tame monsters and have them fight for them. By finding monster eggs in the forest, the player can bring those eggs to the town and hatch them to get new monsters. It is then possible to use those monsters in battle.

<iframe src="https://drive.google.com/file/d/1vnBf9pNOD2ZEgcIa45YVJ_WvifOF-SqY/preview" width="640" height="480"></iframe>

The town contains various characters that each have their own role in the town (shopkeeper, pharmacist, etc), with some of them being romanceable. Characters have a dialogue system that includes relationship levels and conditional dialogue, with quests that are unlocked as the game progresses. Those quests will usually involve doing something in the forest.

The game loop looks like the following:

* Make preparations in town
* Go to the forest, fight monsters and collect treasures, then eventually escape or die
* Go back to town and then options are:
  * Talk to villagers to advance their questlines
  * Use shops to buy/sell/prepare for the next run
  * Spend money to upgrade the town, creating new buildings which will be inhabited by new characters and unlock new features
  * Manage monsters collected by the player
* Go back to the forest to try to go further/complete more quests

At the moment the game is still in a prototype stage, with the forest gameplay, monster-collecting with a few species, inventory and dialogue system functional, and one basic example quest. It is a project I work on the side when I have the time.

This game is made in Godot, using gdscript.

![grassy-chimera]({{site.url}}{{site.baseurl}}/assets/img/2020/May/grassy-2.png)
