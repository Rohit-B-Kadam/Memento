import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  public uploadControl: FormGroup;

  public imagePath;
  imgURL: any;
  public message: string;
  public profilePic;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() 
  {
    this.registrationForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.uploadControl = this._formBuilder.group(
      {
        addPhoto : [null,Validators.required] 
      }
    )

  }

  preview(files) {
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  public onSubmit()
  {

  }

  // Image Reader
  public onFileInput(event: any)
  {
    for( let i = 0 ; i < event.target.files.length; i++)
    {
        // this.photoInfos.push(new PhotoInfo(event.target.files[i].path));
        this.readTheImagedata(event.target.files[i]); 
    }
  }

  public readTheImagedata(file)
  {
    let reader = new FileReader();
    reader.onload = (event: any) => 
    {  
      // this.images.push(event.target.result);
      this.profilePic = event.target.result;
    }
    reader.readAsDataURL(file);
  }

  public addUser()
  {

  }
}
