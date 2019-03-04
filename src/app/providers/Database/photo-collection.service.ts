import { Injectable } from '@angular/core';

// importing NeDB
import * as Datastore from 'nedb';
import { PhotoInfo } from '../../classes/photo-info';
import { resolve } from 'q';


@Injectable({
  providedIn: 'root'
})
export class PhotoCollectionService {

  public photoCollection: Datastore;

  public collectionURI: string;

  constructor() 
  { 

  }

  public connectedToCollection(collectionName: string) :void
  {
    this.collectionURI = collectionName;
    this.photoCollection = new Datastore({
      filename: this.collectionURI,
      autoload: true
    });

    console.log("collection is open");
  }

  public insertAll(items: PhotoInfo[])
  {
    items.forEach( item =>
      {
        this.insert(item).then( () => {
          console.log(item);
        })
      })
  }

  public insert(item: PhotoInfo)
  {
    return new Promise( (resolve , reject) => {

      return this.photoCollection.insert(item , (err , newDoc) => {
        if (err) 
        {
          reject(err);
        }
        else{
          resolve(newDoc);
        }
      });

    });
  }

}
