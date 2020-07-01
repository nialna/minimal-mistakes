---
title: "Hatch Cats: Mix, create and collect cats with your friends"
header:
  image: "/assets/img/2019/Nov/cats-banner.jpg"
categories:
  - Projects
tags:
  - html5
  - facebook
  - js
---

<video controls width="640" height="480">
  <source src="/assets/video/2019/Nov/cats-gameplay.mp4" type='video/mp4'>
</video>

Hatch Cats is a Facebook instant game about breeding and collecting cats. Using procedural generation, the game generates new animated cats by combining two parent cats and mixing their genes. Each cat has multiple genes that control their physical traits (body shape, fur pattern, color, eyes...) and some personality traits. When breeding two cats together, their genes are mixed and some hidden genes or mutations can appear (just like in real-life genetics).

![cats]({{site.url}}{{site.baseurl}}/assets/img/2019/Nov/cat-explain-1.png)
![cats]({{site.url}}{{site.baseurl}}/assets/img/2019/Nov/cat-gens.png)

I was lead programmer on this game and implemented the first version of the game myself, then more programmers joined as we made the soft launch version of the game. The game has a special server to generate animated cat texture atlases depending on their genes, which creates virtually infinite possible combinations of cats, and they are fully animated (animations made using Spine).

![cats]({{site.url}}{{site.baseurl}}/assets/img/2019/Nov/cat-anim.gif)

The goal for the player is to progress in the game and discover new genes by breeding their own cats with their friends' cats. By doing so, they can discover new genes and fill their collections of cats. Genes have rarity (common/rare/legendary etc) which means that some of the prettiest genes need a lot of breeding to discover, and breeding more advanced cats increases the chances of getting more rare cats.

The cats are scored based on the rarity of their genes, with a leaderboard of all cats created globally and by friends, so players can compete on finding the most rare cats.

![cats]({{site.url}}{{site.baseurl}}/assets/img/2019/Nov/cat-multiple.gif)

The game was soft launched on Facebook instant games but isn't live anymore.

The game is implemented in TypeScript with vue.js and vuex. The server is in node.js. Animations run using the webGL version of spine, and the genetic algorithm for generating their genes and assets is in a node.js server which generates and uploads texture atlases to google storage. The game uses the firestore database and its real-time features to have the game react in real-time to new notifications, new eggs etc.

