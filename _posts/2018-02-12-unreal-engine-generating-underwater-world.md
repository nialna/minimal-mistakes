---
title: "Unreal Engine 4: Generating a procedural terrain with an underwater world (Part 1)"
header:
  image: "/assets/img/2018/Feb/landscape_1.png"
categories:
  - Projects
tags:
  - unreal engine
  - unreal
  - procedural generation
  - ue4
  - c++
  - terrain
  - subnautica
---

I've been playing Subnautica a lot lately. It is impressive to see how each biome in the game feels unique and handcrafted, and is full of interesting details. Seeing this made me want to try and see how close I could get to this type of world generation in Unreal Engine 4.

This will (probably) be a multi-part post that will go along with my progress.

I am also writing the code in a very configurable way, with the intent of publishing an Unreal plugin of my `MapGenerationComponent` once it is finished, so other people can use it.

For this first part, we'll focus on how to generate a landscape using Perlin noise.

## Perlin Noise

[Perlin Noise](https://en.wikipedia.org/wiki/Perlin_noise) is a type of coherent noise, that is, a type of noise in which the change in output value is smaller if the input values are close to each other.

Imagine a 2D noise function that returns an output between -1 and 1 for (x, y) coordinates. You can use this output value to generate an image. White is 1, black is -1.

Pure random noise would look like TV noise:

![TV Noise]({{site.url}}{{site.baseurl}}/assets/img/2018/Feb/random-noise.jpg)

Coherent noise is random, but has smooth transitions from high to low values:

![Coherent Noise]({{site.url}}{{site.baseurl}}/assets/img/2018/Feb/coherent-noise.jpg)

Without going into too much detail on this post, this coherent noise is what we can use to generate landscapes. If you imagine the previous 2D image as a heightmap, you can imagine the sort of landscape it would make.

I decided to use [libnoise](http://libnoise.sourceforge.net/) to generate my perlin noise in Unreal. It is one of the most used C++ Perlin noise libraries, and has everything I need.

## Loading libnoise in Unreal Engine



As it turns out, Unreal doesn't let you use any random `.dll` file, but instead needs you to [build any libraries you use with the same compiler](https://wiki.unrealengine.com/Linking_Static_Libraries_Using_The_Build_System) as the one used to build the game (in my case, Visual Studio 2017). This means I had to use the sources for libnoise and update them to work with VS2017 and compile properly for Unreal Engine. I also changed the header names from `noise.h` to `libnoise.h`, because Unreal has a `Noise.h` header that would randomly conflict as Windows is not case-sensitive.

The updated VS2017 project is available on [Github](https://github.com/nialna/libnoise-UE4-ready) and ready for use in Unreal (as of 4.18).

Once you've built the project, it's just a matter of copying the header and `.lib` files to the correct place (see readme on Github).

In order to link a static library, it is required modify the `Project.Build.cs`. I slightly improved on the function given in the Unreal wiki, and made a generic function to add libraries that should be useful for the future:

```c++
public bool LoadLib(ReadOnlyTargetRules Target, string libPath, string libName)
{
    bool isLibrarySupported = false;

    if (Target.Platform == UnrealTargetPlatform.Win64 || Target.Platform == UnrealTargetPlatform.Win32) {
        isLibrarySupported = true;
        string PlatformString = (Target.Platform == UnrealTargetPlatform.Win64) ? "x64" : "x86";
        string LibrariesPath = Path.Combine(ThirdPartyPath, libPath, "Libraries");

        PublicAdditionalLibraries.Add(Path.Combine(LibrariesPath, libPath + "." + PlatformString + ".lib"));
        PublicIncludePaths.Add(Path.Combine(ThirdPartyPath, libPath, "Includes"));
    }
    Definitions.Add(string.Format("WITH_" + libName + "_BINDING={0}", isLibrarySupported ? 1 : 0));
    return isLibrarySupported;
}
```

With that, in your build constructor, you can just call:

```c++
LoadLib(Target, "LibNoise", "LIB_NOISE");
```

## Libnoise abstraction layer

I wanted the noise to be easily accessible in the engine and controllable by blueprint/editor modifications, so I created a `PerlinNoiseComponent` that can be added to any actor, giving it access to noise functions, with the possibility of modifying noise parameters from the editor and/or blueprints.

I will soon make this `PerlinNoiseComponent` available as an Unreal Engine plugin for ease of use, too.

![perlin noise editor]({{site.url}}{{site.baseurl}}/assets/img/2018/Feb/perlin_editor.png)

Those are the perlin noise parameters that can be modified to control the noise output. The [libnoise documentation](http://libnoise.sourceforge.net/tutorials/tutorial4.html) can tell you more about what each one does.

Those parameters can also be controlled in blueprints:

![perlin noise blueprints]({{site.url}}{{site.baseurl}}/assets/img/2018/Feb/perlin_bp1.png)

I added a `SetRandomSeed();` function for convenience, it just sets the seed to a random number between 0 and 10,000.

The `MapGenerator` part of this blueprint is my actual component that does the procedural generation using perlin noise, which we'll visit in more details in the next part.

## Calling the Perlin noise function

The perlin noise function takes three inputs (x, y, z) and returns one value in output.

Since we're interested in generating terrain, we only care about giving it two inputs (x and y). The last input can be dismissed. The output value of the noise function will be the height of our terrain.

![perlin noise blueprints]({{site.url}}{{site.baseurl}}/assets/img/2018/Feb/perlin_bp2.png)

This is the most basic example of how you would call the noise function to get a value from an X and Y input (you can leave z at 0 since it's irrelevant to us).