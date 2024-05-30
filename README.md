# SRC721 NFT

# Installation

- Install dependencies:
```bash
npm install
```

# Minifying the files and run launch the nft
- Build and run a static server to display the nft the user will mint:
```bash
npm start
```

This will minify && gzip all the required files and add them in the [/dist](dist) folder.

See the [package.json](package.json) **scripts** section for more commands.


The /s/ folder contains all of the files needed for the project.
- nft.js - the file that builds the NFT
- append.js - A6677669155563188000 - a simple library for easily inject compressed libraries into the dom (made by Derp Herpenstein)
- w.js - A10207619717431880000 - a micro [3d webgl library](https://xem.github.io/W/) 
- load.js - a small js file that uses append.js to load the nft.js and w.js
- mint.html - an example of what the user will mint

To run the project use:
```bash
npm start
```

This will minify compress and copy the files to the dist/s folder then launch a server such that /s/ points to dist/s
This mimics the /s/cpid endpoint functionality of recursive stamps

To deploy the collection, you will need to
1) stamp the file nft.min.js.gz
2) replace nft.min.js.gz in /dist/s/load.js with the CPID of the stamped file
3) stamp load.js 
4) change the src in mint.html to the CPID of load.js 
5) stamp the deploy.json for the collection, pointing to the load.js CPID as the trait in the array t0
5) generate X mint.html files with ids 1-X
6) have users mint the files with olga encoding with the opreturn containing STAMP:721|c:cpidOfdeployJson|op:mint

Note: not all stamps uploaders will allow you to mint json, js and gz files, but you can drag and drop the files into the stampverse olga uploader
https://www.stampverse.io/mint/stamp-olga