# What

Just a simple site to see if you can guess the FPS of the video you're watching.

You have the option between a random sample of 25, 30, 50 and 60 fps.

# Why

> More FPS = better

So, I asked myself if that was really true or if it was just useless posturing,
 since I couldn't tell the difference anyway.

If you can actually guess the fps correctly every time, well good for you. I guess...

# How

The videos are from the [Big Buck Bunny](http://bbb3d.renderfarming.net/download.html) sample
 (thank you [Blender Foundation](https://www.blender.org/about/)!).

```bash
wget http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4
file=bbb_sunflower_1080p_60fps_normal.mp4
for f in 25 30 50 60 ; do 
    ffmpeg -y -ss 07:15 -i $file -t 00:20 -c:a copy -r $f -c:v libx264 -b:v 4001k ${f}_fps.mp4
done
```

Feel free to use any other 60 fps source and try it out yourself. 
Just put the samples in the media folder. 

## Running the thing

Requirements:

 - node + npm

```bash
npm install
npm run run
```
