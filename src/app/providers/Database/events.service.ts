import { Injectable } from '@angular/core';

// importing NeDB
import * as Datastore from 'nedb';

import { EventInfo } from '../../classes/event-info';
import { PhotoCollectionService } from './photo-collection.service';
import { PhotoInfo } from '../../classes/photo-info';



@Injectable({
  providedIn: 'root'
})

export class EventsService 
{

  // collection
  public eventCollection: any;

  private collectionURI = "EventsInfo.db";

  constructor( public photoCollection : PhotoCollectionService ) 
  {
    this.eventCollection = new Datastore({
      filename: this.collectionURI,
      autoload: true
    });

    console.log("Status:  Event Collection is Loaded");
  }

  //---------------------------------------------------------------
  //CRUD NeDB
  //---------------------------------------------------------------


  // Insert new User
  
  public insert(item: EventInfo, photos: PhotoInfo[]) 
  {
    return new Promise((resolve, reject) => {

      return this.eventCollection.insert(item, (err, newDoc) => {

        if (err) {
          reject(err);
        }
        else 
        {
          this.photoCollection.connectedToCollection(newDoc['_id']);
          this.photoCollection.insertAll(photos);
          resolve(newDoc);
        }
      })

    });
  }


  // checking Get All Users
  public findAll() {
    return new Promise((resolve, reject) => {

      return this.eventCollection.find({}, (err, items) => {
        // items is match , in this case all the entries
        if (err) 
        {
          reject(err);
        }
        else 
        {
          resolve(items);
        }
      })

    });
  }

}
