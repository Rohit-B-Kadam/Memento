// All functionality on photo database

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

  }

  public insertAll(items: PhotoInfo[])
  {
    return new Promise( (resolve , reject) => {
      items.forEach( item =>
        {
          this.insert(item).then( () => {
            console.log(item);
          })
        });

        resolve()
      });

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

  // checking Get All Users
  public findAll() 
  {
    return new Promise((resolve, reject) => {

      return this.photoCollection.find({}, (err, items) => {
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


  remove(id:any) 
  {
    return new Promise((resolve, reject) => {
        return this.photoCollection.remove({ _id: id }, {}, ((err:any, numRemoved:any) => {
            if ( err )
            {
                reject(err);
            }
            else
            {
                resolve(numRemoved);
            }
        }));
    })
  }


  public removeAll( evenId:string) 
  {
    return new Promise((resolve, reject) => {

      let db = new Datastore({
        filename: evenId,
        autoload: true
      });

      return db.remove({ }, {multi : true}, ((err:any, numRemoved:any) => {
        if ( err )
        {
            reject(err);
        }
        else
        {
          resolve(numRemoved);
        }
    }));
    })
  }

  


}
