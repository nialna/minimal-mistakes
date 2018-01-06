---
title: "Unity Project: Procedural Hack'n'slash with voxels"
---

![screen]({{site.url}}{{site.baseurl}}/assets/img/2014/May/crawler-1-med.jpg)
This is a prototype of a procedural hack n slash with a voxel-based map, made with Unity.

One rule in this project is to try to make reusable code. To that end, I used Unity's editor API to extend the editor with a "spell creator" that defines properties of a spell (animations, particles, physics, damage or other effects...). It is very easy for me to create all sorts of new spells without any code (or barely any if it really needs new behaviour).

![screen]({{site.url}}{{site.baseurl}}/assets/img/2014/May/crawler-2-med.jpg)

I've been really surprised at how good the editor scripting is in Unity. Creating new spells that look good is only a matter of minutes when iterating on the gameplay.