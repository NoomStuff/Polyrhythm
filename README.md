# JavaScript Polrhythm

A highly modifyable polyrhythm, simulates 21 balls moving along arcs.
Whenever hitting the baseline the balls will move backwards and play a sound.
Over time the balls will desync and they resync after exactly 15 minutes. 
This project was inspired by [this video](https://youtu.be/Kt3DavtVGVE?si=bNtb1qqZ9DwNnmZU) made by [Hyperplexed](https://www.youtube.com/@Hyperplexed)

Made by [NoomStuff](https://github.com/NoomStuff).  
Licensed under the MIT License. See [LICENSE](LICENSE).  
You are free to use the project however you want, it would be appreciated if you would provide credit when modifying, redistributing or showcasing my work.

---

## How to Use

You can run the script in two ways:

1. **Website**:  
   [Click here to open](https://https://polyrhythm.noomstuff.com/)

2. **Locally**:
   - Download or clone this repository
   - Open `index.html` in your browser
   - Modify `polyrhythm.js` to change the settings

---

## Configuration Options

All settings are located in the `settings` object at the top of `polyrhythm.js`. Here's what each setting does:

- **`playOnLoad`**:  
  Start the script instantly when the page finishes loading, if false it will wait until the user has clicked the page. (Pages usually can't play audio until the user has interacted with it) 

- **`fullscreenOnStart`**:  
  Fullscreen the window when the animation starts, `playOnLoad = false` is recommended.  

- **`duration`**:  
  Time in seconds before all balls sync up at the starting position.  

- **`loops`**:  
  Number of loops the **innermost** ball completes within the full cycle.

- **`loopReduction`**:  
  How many fewer loops each ball completes as it gets further away from the innermost ball, so if the `loops = 21` and `loopReduction = 1` the innermost ball will do 21 bounces and the outermost ball will do 1. (If the loops the outermost ball will do is smaller than 1 the script will break)

- **`lineWidth`**:  
  Thickness (in pixels) of lines and arcs.  

- **`showBaseline`**:  
  Show the base line that balls bounce on.  

- **`showArcs`**:  
  Show/hide the arc paths that the balls follow.  

- **`initialArcRadius`**:  
  Radius of the smallest arc (compared to total line width).  

- **`ballSize`**:  
  Size of each ball (compared to total line width).  

- **`muteOnStart`**:  
  Whether to mute sounds until the user clicks the page.  

- **`muteOnUnfocus`**:  
  Automatically mute sounds when the browser tab is not active. (**HIGHLY RECOMMENDED** as most browsers will not keep playing the sounds but instead queue them up, this might hurt your ears real bad if you tab back in)

- **`audioVolume`**:  
  Percent volume of ball hit sounds.  

- **`hitSounds`**:  
  Which instrument to use for ball impacts, will grab sounds from `sfx/<instrument>/hit<number>`.  (`"bell"`, `"vibraphone"`, `"hammond"`, `"marimba"`)
