import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { of as observableOf } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { EventsService } from '../../../../providers/Database/events.service';
import { EventInfo } from '../../../../classes/event-info';
import { MatDialog } from '@angular/material';
import { PasswordCheckingComponent } from './password-checking/password-checking.component';
import { CurrentUserService } from '../../../../providers/current-user.service';
import { Category } from '../../../../classes/category';
import { ElectronService } from '../../../../providers/electron.service';

/** File node data with possible child nodes. */
export class FileNode {
  name: string;
  type: string;
  id?: string;
  children?: FileNode[];
}

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export class FlatTreeNode 
{
  name: string;
  type: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<FileNode, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<FileNode, FlatTreeNode>;


  /// My code //////////////////////////////
  eventList: FileNode[];
  fullEventDetail: EventInfo[];
  groups:Category[];
  public isHidden:boolean;

  constructor( private eventCollection: EventsService,
              public dialog: MatDialog,
              public _currentUserCollection: CurrentUserService,
              public _electronService: ElectronService) 
  {
    
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    
    this.groups = [];
    let allCategory = new Category("All","temp")
    this.groups.push(allCategory)
    this.groups = _currentUserCollection.Categories;
    
    this.isHidden = true;
    
    this.getEventList();
    

  }


  /** Transform the data to something the tree can read. */
  transformer(node: FileNode, level: number) 
  {
    return {
      name: node.name,
      type: node.type,
      id: node.id,
      level: level,
      expandable: !!node.children
    };
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode) 
  {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: FileNode) {
    return observableOf(node.children);
  }

  public getEventList()
  {

    // initial eventlist
    this.eventList = [];

    // getting data from database
    this.eventCollection.find(this._currentUserCollection.UserInfo._id).then( (events : any[])=> 
    {
      this.fullEventDetail = events;
      let filterValue = this.fullEventDetail.filter((value)=>
      {
        return !value.isHidden
      })
      this.DisplayEventList(filterValue)
    })
    .catch((err)=>{
      console.log("Error: "+err);
    });

  }

  public EventFilter(value)
  {
    console.log(value);

    let displayEvent:EventInfo[];

    if(value == "All")
    {
      this.eventCollection.find(this._currentUserCollection.UserInfo._id).then( (events : any[])=> 
      {
        this.fullEventDetail = events;
        
        displayEvent = events;
        this.DisplayEventList(displayEvent);
      })
      .catch((err)=>{
        console.log("Error: "+err);
      });
    }
    else
    {
      displayEvent = this.fullEventDetail.filter((detail) => {
        if (detail.categories.includes(value)) {
          return true;
        }
        else {
          return false;
        }
      })


      this.DisplayEventList(displayEvent);
    }

  }

  public HiddingAction()
  {

    

    // Decrypt the data
    let hiddenEvent = this.fullEventDetail.filter( (values)=>
    {
        return values.isHidden
    })

    if(this.isHidden)
    {
      // Dialog box to accept password
      const dialogRef = this.dialog.open(PasswordCheckingComponent, {
        width: '250px'
      });
  
      // Dialog box output
      dialogRef.afterClosed().subscribe(result => 
      {
        console.log(result);
        if (result == "Successful") 
        { 
          
          console.log(hiddenEvent)
          this.DecryptThisEvent(hiddenEvent)

          this.DisplayEventList(this.fullEventDetail)
        }

      });

      this.isHidden = false;
    }
    else
    {
      
      // display only no hidden event
      let filterValue = this.fullEventDetail.filter((value)=>
      {
        return !value.isHidden
      })
      this.DisplayEventList(filterValue)

      // Delete the extract event
      let trash = this._electronService.trash;
      let fs = this._electronService.fs;
      
      hiddenEvent.forEach( (value) =>
      {
          let path = value.eventPath;
          if(fs.existsSync(path))
          {
            trash(path)
          }
      })
      this.isHidden = true;
    }
  }

  public DecryptThisEvent( events : EventInfo[] )
  {
    // requirement
    let fstream = this._electronService.fstream;
    let tar = this._electronService.tar;
    let crypto = this._electronService.crypto;
    
     // Generating the key
     const KEY = 'mySup3rC00lP4ssWord'

    events.forEach( (event) =>
    {
      let data = fstream.Reader("/home/rohit/Desktop/Momento-Events/.Encrypt/"+event._id+".tar");
      let decrypt = crypto.createDecipher("aes-256-cbc",KEY)

      let urlstr = event.eventPath;
      let r = /[^\/]*$/;
      let path = urlstr.replace(r, '');
      console.log(path) 
      let extract = tar.Extract(path);
      
      data.pipe(decrypt).pipe(extract);


    })
      
  }

  public DisplayEventList(events:any[])
  {
      this.eventList = []
      // iterating each events
      events.forEach( event => 
        {
          let date: Date = event.date;
          let yy = date.getFullYear();
  
          // setting value
          let node: FileNode = new FileNode();
          node.name = event.title;
          node.id = event._id;
          node.type = "event";
          
  
          // checking if parent node is already exist
          let flag: boolean = false;
          for(let i = 0 ; i < this.eventList.length; i++)
          {
            // if yes
            if( +this.eventList[i].name == yy)
            {
              this.eventList[i].children.push(node);
              flag = true;
              break;
            }
          }
  
          // if no
          if(flag == false)
          {
            // create parent node
            let folderNode: FileNode = new FileNode();
            folderNode.name = ""+yy;
            folderNode.type = "folder";
            folderNode.children = [];
            folderNode.children.push(node);
            this.eventList.push(folderNode);
          }
  
        });
  
        // joint the data to tree <-- IMP
        //console.log(this.eventList);
        // TODO: Sort the array
        this.eventList.sort((event1,event2) =>{
          return +event1.name - +event2.name; 
        });
  
        
        this.dataSource.data = this.eventList;
  }
}
