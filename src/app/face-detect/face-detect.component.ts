import { Component, OnInit, ViewChild } from '@angular/core';

// import
import * as faceapi from 'face-api.js';
import { isNullOrUndefined } from 'util';
import * as canvas from 'canvas';

const { Canvas, Image, ImageData } = canvas



@Component({
  selector: 'app-face-detect',
  templateUrl: './face-detect.component.html',
  styleUrls: ['./face-detect.component.scss']
})


export class FaceDetectComponent implements OnInit 
{

  // Models path
  MODEL_URL="/assets/models";

  public singleFaceDiscription;
  public groupFaceDiscription;

  public groupPic;
  public profilepic;

  public faceMatcher;
  
  // To draw box round the detected face
  @ViewChild('canvas1') canvas1:any;
  @ViewChild('canvas2') canvas2:any;
  
  constructor() 
  {

    // A MonkeyPatch is a piece of code which extends or modifies other code at runtime (typically at startup).
    faceapi.env.monkeyPatch({
      Canvas: HTMLCanvasElement,
      Image: HTMLImageElement,
      ImageData: ImageData,
      Video: HTMLVideoElement,
      createCanvasElement: () => document.createElement('canvas'),
      createImageElement: () => document.createElement('img')
      });
  }
 
  

  ngOnInit() 
  {
    // Load the Model
    this.loadModel()
  }

  public async loadModel()
  {
    await faceapi.loadSsdMobilenetv1Model(this.MODEL_URL);
    //await faceapi.loadFaceDetectionModel(this.MODEL_URL);
    await faceapi.loadFaceLandmarkModel(this.MODEL_URL);
    await faceapi.loadFaceRecognitionModel(this.MODEL_URL);


    await faceapi.loadTinyFaceDetectorModel(this.MODEL_URL)
    // await faceapi.loadMtcnnModel('/models')
    // await faceapi.loadFaceLandmarkModel('/models')
    await faceapi.loadFaceLandmarkTinyModel(this.MODEL_URL)
    await faceapi.loadFaceExpressionModel(this.MODEL_URL)


    console.log("model is loaded...");
    console.log(faceapi.nets);
  }

  async uploadImage(event: any) 
  {
    
    const imgFile = event.target.files[0]

    // 1. create an HTMLImageElement from a Blob
    const img:HTMLImageElement = await faceapi.bufferToImage(imgFile)

    // 2. Display the image
    let profileImgRef = document.getElementById("profileImgRef") as HTMLImageElement;
    //this.profilepic = img.src;
    profileImgRef.src = img.src

    // Detecting single Face with face landmarks and with face description
    const firstFaceDescription = await faceapi
                      .detectSingleFace(img)
                      .withFaceLandmarks().withFaceDescriptor()

    // Check if image contain face or not
    if (!isNullOrUndefined(firstFaceDescription)) 
    {
      console.log(firstFaceDescription);

      // resize the detected boxes in case your displayed image has a different size then the original
      const detectionsForSize = faceapi.resizeResults(firstFaceDescription, 
                                      { width: profileImgRef.width, height: profileImgRef.height })

      // draw them into a canvas
      const canvas = this.canvas1.nativeElement;
      canvas.width = profileImgRef.width;
      canvas.height = profileImgRef.height;

      // Draw the rectangle round the detected face
      const detectionsArray = detectionsForSize.detection
      
      // Giving Label to detected face                                  [label]        [descriptor list]
      const singleLabelDiscription = new  faceapi.LabeledFaceDescriptors("person1", [firstFaceDescription.descriptor])      
      this.faceMatcher = new faceapi.FaceMatcher(singleLabelDiscription)

      // const boxesWithText = [
      //   new faceapi.BoxWithText( detectionsArray.box, "Me")
      // ]
      
      faceapi.drawDetection(canvas, detectionsArray, { withScore: true , withClassName: true })
      //faceapi.drawDetection(canvas, boxesWithText, {withScore:true})
    }
    else
    {
      console.log("Face is not detected")
    }

  }

  public async uploadSecondImage(event: any) 
  {

    const imgFile = event.target.files[0]
    // create an HTMLImageElement from a Blob
    const img: HTMLImageElement = await faceapi.bufferToImage(imgFile)
    //this.groupPic = img.src
    let groupImgRef = document.getElementById("groupImgRef") as HTMLImageElement;
    groupImgRef.src = img.src;
    

    // Detecting Face
    const fullFaceDescriptions = await faceapi
                      .detectAllFaces(img)
                      .withFaceLandmarks().withFaceDescriptors()

    // Check if image contain face or not
    if (!isNullOrUndefined(fullFaceDescriptions)) 
    {
      console.log(fullFaceDescriptions);

      this.groupFaceDiscription = fullFaceDescriptions;
      // resize the detected boxes in case your displayed image has a different size then the original
      const detectionsForSize = faceapi.resizeResults(fullFaceDescriptions, 
        { width: groupImgRef.width, height: groupImgRef.height })

      // draw them into a canvas
      const canvas = this.canvas2.nativeElement;
      canvas.width = groupImgRef.width;
      canvas.height = groupImgRef.height;

      // Draw the rectangle round the detected face
      const detectionsArray = detectionsForSize.map(fd => fd.detection)


      // Face recognition

      // 0.6 is a good distance threshold value to judge
      // whether the descriptors match or not
      const maxDescriptorDistance = 0.6
      const results = fullFaceDescriptions.map(fd => 
      {
        return this.faceMatcher.findBestMatch(fd.descriptor,maxDescriptorDistance)
      })

      console.log(results)

      const boxesWithText = results.map((bestMatch, i) => {
        const box = detectionsArray[i].box
        const text = bestMatch.toString()
        const boxWithText = new faceapi.BoxWithText(box, text)
        return boxWithText
      })

      faceapi.drawDetection(canvas, boxesWithText)

    }

  }
}
