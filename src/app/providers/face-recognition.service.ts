import { Injectable } from '@angular/core';

// import 
import * as faceapi from 'face-api.js';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})

export class FaceRecognitionService 
{

  MODEL_URL="/assets/models";
  public isModuleLoaded = false;
  
  constructor() 
  {
    this.loadModel()
  }

  public Add()
  {
    console.log("Added")
  }

  async loadModel()
  {
    await faceapi.loadSsdMobilenetv1Model(this.MODEL_URL);
    //await faceapi.loadFaceDetectionModel(this.MODEL_URL);
    await faceapi.loadFaceLandmarkModel(this.MODEL_URL);
    await faceapi.loadFaceRecognitionModel(this.MODEL_URL);
    console.log("model is loaded...");
    this.isModuleLoaded = true;
    //console.log(faceapi.nets);
  }

  public async GetFaceDescription( InputImage)
  {
    while(!this.isModuleLoaded){ console.log("Waiting for module log")}
    
    // const img = await faceapi.bufferToImage(InputImage)
    
    
    // Detecting Face
    const fullFaceDescriptions = faceapi.detectAllFaces(InputImage).withFaceLandmarks().withFaceDescriptors()
		// Check if image contain face or not
    if (!isNullOrUndefined(fullFaceDescriptions)) 
    {
      console.log(fullFaceDescriptions);
      // resize the detected boxes in case your displayed image has a different size then the original
      // const detectionsForSize = faceapi.resizeResults( fullFaceDescriptions, { width: this.refImage.width, height: this.refImage.height })
      
      // // draw them into a canvas
      // const canvas = this.canvas1.nativeElement;
      // canvas.width = this.refImage.width;
      // canvas.height = this.refImage.height;
      
      // // Draw the rectangle round the detected face
      // const detectionsArray = detectionsForSize.map(fd => fd.detection)
      // faceapi.drawDetection(canvas, detectionsArray, { withScore: true })
    }

  }
}
