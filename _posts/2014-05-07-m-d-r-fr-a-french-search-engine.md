##m-d-r.fr - A french search engine

![](assets/img/2014/May/Screenshot_at_mai_07_16_11_57.png)
Ok so I totally forgot to post about this - I have been working with bigger than fiction for Canal + (big french TV channel) on [Le Moteur de Recherche](http://www.m-d-r.fr/) with [Julien De Luca](http://jide.fr/).

The goal was to create an engine that takes english words/people/objects and converts them in their french equivalent, often with a bit of humor. It was made as a marketing operation for a documentary they were making.

I made the server using node.js and mongodb, including among other things a web scrapper that gets data from websites and wikipedia, and also downloads media for searches, treats them (crop/resize) and uploads them to our amazon S3 cloud.
