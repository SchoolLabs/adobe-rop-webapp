# school_adobe

### Changing the photos:

####`main.js`
In `main.js` there's two arrays that need to be changed: `att_arr` and `IMAGES`. 

`att_arr` holds the credits displayed for each photo - the photographer's name should be followed by `&copy;` which can then be followed by a year, if available. Ex: `"Photographer Name &copy; 2015"`.

`IMAGES` holds the `0` or `1` that represents photoshopped or not. `0` = Photohopped. `1` = Real.

Both `IMAGES` and `att_arr` should be in the same order that the Image files are numbered.

####`transitions.js`
On `line 1`  you need to set the value for the first image's Photographer and the copyright, with year if available. So it should look like: `var firstPhotographerCopyright = "Photographer Name &copy; 2015";`

####Image Files
In `/assets/img/new/` all of the `Swipe#.jpg`, `Swipe#@2x.jpg`, and `Grid#.jpg` photos should be replaced with the new images. Numbers should range from 1-25, inclusive. These numbers should correspond with its order in the array (note that the numbers start at 1, not 0).

`Swipe#.jpg` images should be 600 x 600 pixels.

`Swipe#@2x.jpg` images should be 1200 x 1200 pixels.

`Grid#.jpg` images should be 170 x 170 pixels.
