import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EventsService } from '../../../../providers/Database/events.service';
import { EventInfo } from '../../../../classes/event-info';
import { PhotoInfo } from '../../../../classes/photo-info';
import { ElectronService } from '../../../../providers/electron.service';
import { Router } from '@angular/router';
import { FriendsService } from '../../../../providers/Database/friends.service';
import { FriendProfile } from '../../../../classes/friend-profile';
import { MatDialog } from '@angular/material';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { CurrentUserService } from '../../../../providers/current-user.service';
import { Category } from '../../../../classes/category';
import { CatergoryCollectionService } from '../../../../providers/Database/catergory-collection.service';
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

  dropzoneActive:boolean = false;

  // Filling data
  categories: Category[];
  
  // make dynamic
  friendLists:string[];
  // = [
  //   'Sonam Karale',
  //   'Abhishek Zambre',
  //   'Sanket Hebbal',
  //   'Shubham Bangar',
  //   'Harshal Ghule',
  //   'Shreyas Bhujbal',
  //   'Shubham Hajare',
  //   'Shubham Kanade',
  //   'Chandan Patil',
  //   'Anuja Jadhav',
  //   'Sailee Jagtap',
  //   'SudhirKumar Chobhey',
  //   'Vaibhav Magar'
  // ];

  
  // storing info
  
  public images = [];

  addedFriends: string[] = [];

  public photoInfos : PhotoInfo[] = [];

  public eventInfo: EventInfo;

  constructor(private _formBuilder: FormBuilder, 
              private eventCollection: EventsService,
              private _electronService: ElectronService,
              private router: Router,
              private _friendCollection: FriendsService,
              private _currentUser: CurrentUserService,
              public dialog: MatDialog,
              public categoryCollection: CatergoryCollectionService) 
  {
    
     this.categories = _currentUser.Categories;

    this.friendLists = [];

    _friendCollection.find(this._currentUser.UserInfo._id).then( (value : FriendProfile[])=>
    {
        value.forEach( (friend)=>{
          this.friendLists.push(friend.name)
        })
    })

   

    // initialising the form control
    this.uploadControl = this._formBuilder.group(
      {
        addPhoto : [null] 
      },{validator: this.checkUploaded }
    )

    this.eventDetail = this._formBuilder.group(
      {
        eventName: [null, Validators.required],
        eventDate: [null, Validators.required],
        location: [null, Validators.required],
        eventCategory: [null, Validators.required],
        description: [null, Validators.required],
      }
    );
    this.isHidden = false;
  }

   // Custom Validator
   public checkUploaded(group: FormGroup) 
   { 
     return true ? null : { notSame: true }     
   }
 

  ngOnInit() 
  {
    //this.isImageUpload = false;
  }


  // Image Reader

  public dropzoneState($event: boolean) 
  {

    this.dropzoneActive = $event;
  }

  public handleDrop(fileList: FileList) 
  {
    // this.isImageUpload = true;
    //console.log(fileList)
    let imageFile:File[] = [];
    
    for(let i = 0; i < fileList.length; i++)
    {
      let file = fileList[i];
      if(file.type == "image/jpeg")
      {
        imageFile.push(file)
        console.log(file)
        this.photoInfos.push(new PhotoInfo(file.path));
        this.readTheImagedata(file); 
      }
    }
    
    //console.log(imageFile)

  }

  public onFileInput(event: any)
  {
    //this.isImageUpload = true;
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
    this.isHidden = false;
    this.eventInfo = new EventInfo(
        this.eventDetail.value['eventName'],
        this.eventDetail.value['eventDate'],
        this.eventDetail.value['location'],
        this.eventDetail.value['eventCategory'],
        this.eventDetail.value['description'],
        this.addedFriends,
        this.isHidden,
        this._currentUser.UserInfo._id
      );
      

      this.moveAllPhotoToDest("/home/rohit/Desktop/Momento-Events");
      this.fillPhotoInfo();
      //insert the event
      console.log(this.eventInfo)
      this.eventCollection.insert(this.eventInfo , this.photoInfos ).then( (value : EventInfo)=> {
      
        console.log(value)
        setTimeout(() => {
          this.router.navigate(['/timeline', value._id]);
        },
          1000);
       
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
      this.eventInfo.eventPath = fullPath;
      // to get filename
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

  public AddCategory()
  {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.categories = this._currentUser.Categories;
    });
  }
}
