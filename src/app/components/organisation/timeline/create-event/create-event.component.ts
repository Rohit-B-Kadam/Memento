import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
//import { EXIF } from 'exif-js';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit 
{

  eventDetail = this._formBuilder.group(
    {
      eventName: [null , Validators.required],
      eventDate: [null, Validators.required],
      eventCategory: [null, Validators.required],
      location: [null, Validators.required],
      description: [null, Validators.required],

    }
  );


  // Date Filter
  dateFilter = (d: Date): boolean => {
    let dateNow = new Date();
    // Prevent to selected future date.
    return d <= dateNow;
  }

  // categories
  categories: string[] = ["Family" , "Friend", "College Friends"];
  public images = [];
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

  addedFriends:string[] = [];


  constructor(private _formBuilder: FormBuilder) 
  {
    
  }

  ngOnInit() 
  {
  }


  // Image Reader
  public onFileInput(event: any)
  {
    for( let i = 0 ; i < event.target.files.length; i++)
    {     
        this.readTheImagedata(event.target.files[i]); 
    }

    console.log(this.images);
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
   drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) 
    {
      
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
}
