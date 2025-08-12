# Managing Packages With npm

Here, i've learn how to user npm (node package manager) to manage package and already build module from npm in my node app.

The main file to deeply understand there was [package.json](./package.json) :

- the version and name the two required feild in a package.json file !
- more about versioning : 
    - "package name": "MAJOR.MINOR.PATH"
    - PATH: updated when you solve a bug, optimizing and cleaning your code
    - MINOR: updated when you add a new feature
    - MAJOR: updated when your app is upgraded and the add features aren't compatible with the current minor states.

- in your pk.json, when you want a package been updated depending on the PATH version it should look like :
    - "package" : "~1.2.x"
- and when you want it to been updated depending on the MINOR version it should look like :
    - "package" : "^1.x.x"

!note: by knowing that the minor update => the path update !

!note: if you wanna remove a specific package in your project just remove's line in your dependencies dict !
