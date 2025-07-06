//this file is not used by browser, use node to run it

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFramesDir = './'; 
const outputJsonFile = 'bad_apple_frames.json';
const threshold = 128; 

async function processFrames() {
  const outputData = {
    width: 0,
    height: 0,
    frames: []
  };

  const files = fs.readdirSync(inputFramesDir)
    .filter(f => f.startsWith('frame_') && f.endsWith('.png'))
    .sort((a, b) => +a.match(/\d+/)[0] - +b.match(/\d+/)[0]);

  if (!files.length) {
    console.error(`No PNG frames found in '${inputFramesDir}'.`);
    return;
  }

  console.log(`Found ${files.length} frames to process.`);

  for (let file of files) {
    try {
      const { data, info } = await sharp(path.join(inputFramesDir, file))
        .raw()
        .toBuffer({ resolveWithObject: true });

      if (!outputData.width) {
        outputData.width = info.width;
        outputData.height = info.height;
        console.log(`Detected dimensions: ${info.width}x${info.height}`);
      }

      if (info.channels !== 1)
        console.warn(`Frame ${file} has ${info.channels} channels.`);

      const frameMap = Array.from(data, v => (v > threshold ? 1 : 0));
      outputData.frames.push(frameMap);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  fs.writeFileSync(outputJsonFile, JSON.stringify(outputData));
  console.log(`All frame data saved to ${outputJsonFile}`);
  console.log(`Total frames: ${outputData.frames.length}`);
}

processFrames();