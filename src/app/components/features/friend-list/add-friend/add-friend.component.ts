import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FriendProfile } from '../../../../classes/friend-profile';
import { ElectronService } from '../../../../providers/electron.service';
import { FaceRecognitionService } from '../../../../providers/face-recognition.service';

import * as faceapi from 'face-api.js';
//import '@tensorflow/tfjs-node';
import { isNullOrUndefined } from 'util';
import { FriendsService } from '../../../../providers/Database/friends.service';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../../../providers/current-user.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit 
{
  // FormBuilder  
  public registrationForm: FormGroup;
  public uploadControl: FormGroup;

  //image path
  public imagePath;
  
  imgURL: any;
  public message: string;
  public profilePic;

  public imageBlog;

  // User Object
  public friendInfo: FriendProfile;
  categories: string[] = ["Family" , "Friend", "College Friends"];

  MODEL_URL="/assets/models";

  constructor(private _formBuilder: FormBuilder,
              private _electronService: ElectronService,
              private _faceRecognition: FaceRecognitionService,
              private _friendCollection: FriendsService,
              private router: Router,
              private _currentUser: CurrentUserService
              ) 
  { 
    
  }

  ngOnInit() 
  {

    this.registrationForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required]
    });

    this.uploadControl = this._formBuilder.group(
      {
        addPhoto : [null] 
      }
    )

  }

  public onSubmit()
  {
  }


  // Image Reader
  public onFileInput(event: any)
  {
    this.imageBlog = event.target.files[0]
    this.readTheImagedata(event.target.files[0]);
    this.imagePath = event.target.files[0].path;
  }

  public readTheImagedata(file)
  {
    let reader = new FileReader();
    reader.onload = (event: any) => 
    {  
      this.profilePic = event.target.result;
    }
    reader.readAsDataURL(file);
  }

  public addFriend()
  {
    
    let email = this.registrationForm.value['email']
    let name = this.registrationForm.value['name']
    
    this.friendInfo = new FriendProfile(name,email,this._currentUser.UserInfo._id);

    /* 
    // Face detection
    //console.log(this.profilePic)
    
    this.loadModel().then(async loaded =>
      {
        console.log("loaded")
				// For First Image

				// Refer the Image
        let refImage  = <HTMLImageElement> document.getElementById("my_picture");
        console.log(refImage);


				// Detecting Face
        const fullFaceDescriptions = await faceapi.detectAllFaces(this.profilePic)

        console.log(fullFaceDescriptions);
        
      });
    */
    console.log(this.friendInfo)
    // save in database
    this._friendCollection.insert(this.friendInfo)
    setTimeout(() => {
      this.router.navigate(['/friend-list']);
    },
      1000);
  }


  async loadModel()
  {
    await faceapi.loadSsdMobilenetv1Model(this.MODEL_URL);
    await faceapi.loadFaceDetectionModel(this.MODEL_URL);
    await faceapi.loadFaceLandmarkModel(this.MODEL_URL);
    await faceapi.loadFaceRecognitionModel(this.MODEL_URL);
    console.log("model is loaded...");
    //console.log(faceapi.nets);
  }

}
