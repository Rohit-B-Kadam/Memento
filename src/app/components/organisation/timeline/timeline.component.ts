import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventPhotoInteractionService } from '../../../providers/event-photo-interaction.service';
import { ElectronService } from '../../../providers/electron.service';
import { EventInfo } from '../../../classes/event-info';
import { PhotoInfo } from '../../../classes/photo-info';
import { Router } from '@angular/router';
import { EventsService } from '../../../providers/Database/events.service';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([ Breakpoints.Medium ,Breakpoints.Small ,Breakpoints.Handset ])
  .pipe(
    map(result => result.matches)
  );

  constructor(private breakpointObserver: BreakpointObserver,
              private eventCollection: EventsService,
              private _electronService: ElectronService,
              private router: Router) {}

  ngOnInit() {
  }

   // Image Reader
  public onFileInput(event: any) {

      console.log(event.target.files[0])
      this.readTheZipFile(event.target.files[0]);
    
  }

  public readTheZipFile(zipFile) 
  {
    let zipFilePath = zipFile.path;
    // required
    let fs = this._electronService.fs;
    let compressing = this._electronService.compressing;

    let fullPath = "/home/rohit/Desktop/Momento-Events"

    // compress the file(zip) in temp folder
    compressing.zip.uncompress(zipFilePath,fullPath+"/.temp")
      .catch((err)=> { console.log("Error: "+err)})
      .then(() => 
        { 
          console.log("unCompression done") 
          
          // To check if zip file is  created by us or not
          let tempFolderPath = fullPath+"/.temp/"+zipFile.name.slice(0, zipFile.name.length-4);
          let eventDesFile = tempFolderPath +"/event_description.json";
          let photoDesFile = tempFolderPath +"/photo_description.json";

          if(!fs.existsSync(eventDesFile) || !fs.existsSync(photoDesFile) )
          {
            console.log("It's not our zip")
            return
          }

          let data = fs.readFileSync(eventDesFile);
          let eventInfo:EventInfo = JSON.parse(data.toString())
          //convert the date string into date object
          eventInfo.date = new Date(eventInfo.date)

          data = fs.readFileSync(photoDesFile);
          let photoInfo: PhotoInfo[] = JSON.parse(data.toString())
          // photoInfo.forEach( (photo) =>{
          //   photo.dataTime = new Date(photo.dataTime)
          // })
          console.log(eventInfo)
          console.log(photoInfo)

          this.createRequiredFolder(eventInfo,photoInfo,tempFolderPath)

        })
  }

  public createRequiredFolder(eventInfo: EventInfo, photoInfos: PhotoInfo[],tempFolderPath:string)
  {
    // getting nodejs fs module from electronService
    let fs = this._electronService.fs;
    let date = new Date(eventInfo.date);
    console.log(date)

    // Creating Folder
    let fullPath: string= "/home/rohit/Desktop/Momento-Events";
    if (!fs.existsSync(fullPath))
    {
      fs.mkdirSync(fullPath);
    }

    // check year folder is exist or not
    fullPath += "/"+date.getFullYear();
    if (!fs.existsSync(fullPath))
    {
      fs.mkdirSync(fullPath);
    }
   

    fullPath += "/"+date.getDate()+'_'+date.getMonth()+'_'+eventInfo.title;
    if (!fs.existsSync(fullPath))
    {
      fs.mkdirSync(fullPath);
    }

    // Copying Photo To particular location

    photoInfos = photoInfos.map( (photoInfo) => 
    {
        let photoPath = tempFolderPath+"/"+photoInfo.photoUrl.replace(/^.*[\\\/]/, '')
        console.log(photoPath)
        if(!fs.existsSync(photoPath))
        {
          console.log("File is not present")
            return;
        }

        fs.copyFileSync(photoPath , photoInfo.photoUrl );
        return photoInfo;
    })

    // Update in DataBase
     // insert the event
     this.eventCollection.insert(eventInfo , photoInfos ).then( (value : EventInfo)=> {
      
      console.log(value)
      setTimeout(() => {
        this.router.navigate(['/timeline', value._id]);

        // delete the temp folder
        let trash = this._electronService.trash;
        if (fs.existsSync(tempFolderPath)) 
        {
            trash(tempFolderPath);
        }
        else 
        {
          console.log("delete folder path not found")
        }    
      },
        1000);
     
    });


  }

  public movePhotoFromTo(tempFolderPath ,eventInfo: EventInfo)
  {
    // getting nodejs fs module from electronService
    let fs = this._electronService.fs;
    let date = new Date(eventInfo.date);
    console.log(date)

    let fullPath: string= "/home/rohit/Desktop/Momento-Events";
    if (!fs.existsSync(fullPath))
    {
      fs.mkdirSync(fullPath);
    }

    // check year folder is exist or not
    fullPath += "/"+date.getFullYear();
    if (!fs.existsSync(fullPath))
    {
      fs.mkdirSync(fullPath);
    }
   

    fullPath += "/"+date.getDate()+'_'+date.getMonth()+'_'+eventInfo.title;
    if (!fs.existsSync(fullPath))
    {
      fs.mkdirSync(fullPath);
    }

    fs.readdir(tempFolderPath, (err , files)=>
    {
        if(err)
        {
          return console.log("Error"+err)
        }

        // listing all files using forEach
        files.forEach((file) => {
          if(file.slice(file.length-4 , file.length) == ".jpg")
          {
            console.log(file)
          }
          
        })
    })

  }
}
