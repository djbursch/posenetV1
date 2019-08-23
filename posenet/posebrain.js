const express = require ('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs');
const posenet = require('@tensorflow-models/posenet');

const {
    createCanvas, Image
} = require('canvas')
const imageScaleFactor = 0.5;
const outputStride = 16;
const flipHorizontal = false;

const tryModel = async() => {
    console.log('start');
        const net = await posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: 513,
        multiplier: 0.75
        });
    const img = new Image();
    img.src = '../upload/2019-08-21T21:49:28.750ZIMG_0176.png';
        img.width = 34;
        img.height = 34;
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    img.onload = function (){ ctx.drawImage(img, 0, 0);}
    const input = tf.browser.fromPixels(canvas);
    const pose = await net.estimateSinglePose(input, imageScaleFactor, flipHorizontal, outputStride);
   // console.log(pose);
    for(const keypoint of pose.keypoints) {
        console.log(`${keypoint.part}: (${keypoint.position.x},${keypoint.position.y})`);
    }
    console.log('end');
}

tryModel();




module.exports = router;

