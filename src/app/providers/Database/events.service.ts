// All functionality on events database

import { Injectable } from '@angular/core';

// importing NeDB
import * as Datastore from 'nedb';

import { EventInfo } from '../../classes/event-info';
import { PhotoCollectionService } from './photo-collection.service';
import { PhotoInfo } from '../../classes/photo-info';
import { StoreTempData } from '../../classes/store-temp-data';



@Injectable({
  providedIn: 'root'
})



export class EventsService 
{

  // collection ie db
  public eventCollection: any;

  private collectionURI = "EventsInfo.db";


  // store the data .. work like cache
  public storeTempData: StoreTempData;

  constructor( public photoCollection : PhotoCollectionService ) 
  {
    this.eventCollection = new Datastore({
      filename: this.collectionURI,
      autoload: true
    });

    this.storeTempData = new StoreTempData();
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

          // photo db
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

  public getEventDetail(eventId: string )
  {
    
    return new Promise( (resolve, reject) =>
    {
      // find the doc where id = eventId return array of doc which the condition
      return this.eventCollection.find( { _id: eventId } , { }, (err , item)=> 
      {
        if (err) 
        {
          reject(err);
        }
        else 
        {
          this.storeTempData.eventInfo = item;
          this.storeTempData.id = eventId;
          resolve(item);
        }
      })
    });
  }

  public getAllPhoto( eventId: string)
  {
      this.photoCollection.connectedToCollection(eventId);
      return this.photoCollection.findAll();
  }
}
