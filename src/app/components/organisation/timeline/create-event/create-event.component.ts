import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EventsService } from '../../../../providers/Database/events.service';
import { EventInfo } from '../../../../classes/event-info';
import { PhotoInfo } from '../../../../classes/photo-info';
import { ElectronService } from '../../../../providers/electron.service';
import { Router } from '@angular/router';
//import { EXIF } from 'exif-js';
var EXIF = require('exif-js');

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit 
{
  // Date Filter
  dateFilter = (d: Date): boolean => 
  {
    let dateNow = new Date();
    // Prevent to selected future date.
    return d <= dateNow;
  }


  // Form Group
  
  public uploadControl: FormGroup;

  public eventDetail: FormGroup;

  public isHidden: boolean;



  // Filling data
  categories: string[] = ["Family" , "Friend", "College Friends"];
  
  eventType: string[] = ["Trekking","Marriage","Pinic","Event"];
  
  // make dynamic
  friendLists:string[] = [
    'Sonam Karale',
    'Abhishek Zambre',
    'Sanket Hebbal',
    'Shubham Bangar',
    'Harshal Ghule',
    'Shreyas Bhujbal',
    'Shubham Hajare',
    'Shubham Kanade',
    'Chandan Patil',
    'Anuja Jadhav',
    'Sailee Jagtap',
    'SudhirKumar Chobhey',
    'Vaibhav Magar'
  ];

  
  // storing info
  public images = [];

  addedFriends: string[] = [];

  public photoInfos : PhotoInfo[] = [];

  public eventInfo: EventInfo;

  constructor(private _formBuilder: FormBuilder, 
              private eventCollection: EventsService,
              private _electronService: ElectronService,
              private router: Router) 
  {
    
    // initialising the form control
    this.uploadControl = this._formBuilder.group(
      {
        addPhoto : [null,Validators.required] 
      }
    )

    this.eventDetail = this._formBuilder.group(
      {
        eventName: [null, Validators.required],
        eventDate: [null, Validators.required],
        location: [null, Validators.required],
        eventType: [null, Validators.required],
        eventCategory: [null, Validators.required],
        description: [null, Validators.required],
  
      }
    );

    this.isHidden = false;
  }

  ngOnInit() 
  {
  }


  // Image Reader
  public onFileInput(event: any)
  {
    for( let i = 0 ; i < event.target.files.length; i++)
    {
        this.photoInfos.push(new PhotoInfo(event.target.files[i].path));
        this.readTheImagedata(event.target.files[i]); 
    }
  }

  public readTheImagedata(file)
  {
    let reader = new FileReader();
    reader.onload = (event: any) => 
    {  
      this.images.push(event.target.result);
    }
    reader.readAsDataURL(file);
  }


   // Drag and drop event
   public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) 
    {
      // not in same list
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }
 
  public onSubmit()
  {
    console.log(this.eventDetail.value);
  }

  public addEvent()
  {



    this.eventInfo = new EventInfo(
      this.eventDetail.value['eventName'],
      this.eventDetail.value['eventDate'],
      this.eventDetail.value['location'],
      this.eventDetail.value['eventType'],
      this.eventDetail.value['eventCategory'],
      this.eventDetail.value['description'],
      this.addedFriends
      );

      this.moveAllPhotoToDest("/home/rohit/Desktop/Momento-Events");
      this.fillPhotoInfo();
      // insert the event
      this.eventCollection.insert(this.eventInfo , this.photoInfos ).then( (value : EventInfo)=> {
      
        console.log(value)
       this.router.navigate(['/timeline', value._id]);
      });

  }

  public moveAllPhotoToDest( destFolder:string)
  {
    // getting nodejs fs module from electronService
    let fs = this._electronService.fs;
    let date = this.eventInfo.date;

    let fullPath: string= destFolder;
    if (!fs.existsSync(fullPath))
    {
      fs.mkdirSync(fullPath);
    }

    // check year folder is exist or not
    fullPath += '/'+date.getFullYear();
    if (!fs.existsSync(fullPath))
    {
      fs.mkdirSync(fullPath);
    }
   

    fullPath += "/"+date.getDate()+'_'+date.getMonth()+'_'+this.eventInfo.title;
    if (!fs.existsSync(fullPath))
    {
      fs.mkdirSync(fullPath);
    }

    for(let i = 0 ; i < this.photoInfos.length; i++)
    {
      let photoName = this.photoInfos[i].photoUrl.split('\\').pop().split('/').pop();
      fs.copyFileSync(this.photoInfos[i].photoUrl, fullPath+'/'+photoName);
      this.photoInfos[i].photoUrl = fullPath+'/'+photoName;
    }

  }

  public fillPhotoInfo()
  {
    let fs = this._electronService.fs;

    for(let i = 0 ; i < this.photoInfos.length; i++)
    {
      let data = fs.readFileSync(this.photoInfos[i].photoUrl);

      var exifData = EXIF.readFromBinaryFile(this.toArrayBuffer(data));
      this.photoInfos[i].model = exifData.Model;
      this.photoInfos[i].dataTime = exifData.DateTime;
      this.photoInfos[i].orientation = exifData.Orientation;
    }
  }

  public toArrayBuffer(buf) 
  {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) 
    {
        view[i] = buf[i];
    }
    return ab;
  }

}
