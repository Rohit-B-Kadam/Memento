import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import { Profile } from 'selenium-webdriver/firefox';
import { User } from '../../../classes/user';
import { ElectronService } from '../../../providers/electron.service';
import { FaceRecognitionService } from '../../../providers/face-recognition.service';

// import 
import * as faceapi from 'face-api.js';
//import '@tensorflow/tfjs-node';
import { isNullOrUndefined } from 'util';

import * as canvas from 'canvas';
import { TNetInput } from 'face-api.js';
import { UsersService } from '../../../providers/Database/users.service';
import { ErrorStateMatcher } from '@angular/material';
import { CurrentUserService } from '../../../providers/current-user.service';


export class MyErrorStateMatcher implements ErrorStateMatcher 
{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit 
{
  
  // FormBuilder  
  public registrationForm: FormGroup;
  public uploadControl: FormGroup;
  public matcher : MyErrorStateMatcher;

  //image path
  public imagePath;
  
  imgURL: any;
  public message: string;
  public profilePic;

  public imageBlog;

  // User Object
  public userInfo: User;
  
  MODEL_URL="/assets/models";

  constructor(private _formBuilder: FormBuilder,
              private _electronService: ElectronService,
              private _faceRecognition: FaceRecognitionService,
              private _userCollection: UsersService,
              private _currentUser: CurrentUserService) 
  { 
    
  }

  ngOnInit() 
  {
    this.matcher = new MyErrorStateMatcher();

    this.registrationForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
    }, {validator: this.checkPasswords });

    this.uploadControl = this._formBuilder.group(
      {
        addPhoto : [null,Validators.required] 
      }
    )

  }

  public onSubmit()
  {
  }

  // Custom Validator
  public checkPasswords(group: FormGroup) 
  { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }     
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

  public addUser()
  {
    
    let email = this.registrationForm.value['email']
    let name = this.registrationForm.value['username']
    let password = this.registrationForm.value['password']
    
    this.saveProfilePic("/home/rohit/Desktop/Momento-Events");
    this.userInfo = new User(name,password,email,this.imagePath);
    this._currentUser.setCurrentUser(this.userInfo)
    
    
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
    console.log(this.userInfo)
    
    // save in database
    this._userCollection.insert(this.userInfo)
  }

  public saveProfilePic( destFolder:string)
  {
    // getting nodejs fs module from electronService
    let fs = this._electronService.fs;

    let fullPath: string= destFolder;
    if (!fs.existsSync(fullPath))
    {
      fs.mkdirSync(fullPath);
    }

    // check metadata folder is exist or not
    fullPath += '/.metadata';
    if (!fs.existsSync(fullPath))
    {
      fs.mkdirSync(fullPath);
    }
   

    fullPath += "/profile_pic";
    if (!fs.existsSync(fullPath))
    {
      fs.mkdirSync(fullPath);
    }

    let photoName = this.imagePath.split('\\').pop().split('/').pop();
    fs.copyFileSync(this.imagePath, fullPath + '/' + this.registrationForm.value['email']+".jpg");
    this.imagePath = fullPath + '/' + this.registrationForm.value['email']+".jpg";

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
