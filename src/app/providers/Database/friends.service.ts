import { Injectable } from '@angular/core';

// importing NeDB
import * as Datastore from 'nedb';
import { FriendProfile } from '../../classes/friend-profile';


@Injectable({
  providedIn: 'root'
})
export class FriendsService 
{

  public db: any;

  private databaseURI = "FriendDatabase.db";

  constructor() {
    this.db = new Datastore({
      filename: this.databaseURI,
      autoload: true
    });

    console.log("Status:  friends Database is Created");
  }

  //---------------------------------------------------------------
  //CRUD NeDB
  //---------------------------------------------------------------


  // Insert new User
  public insert(item: FriendProfile) {
    return new Promise((resolve, reject) => {

      return this.db.insert(item, (err, newDoc) => {

        if (err) {
          reject(err);
        }
        else {
          resolve(newDoc);
        }
      })

    });
  }


  // checking Get All Users
  public findAll() {
    return new Promise((resolve, reject) => {

      return this.db.find({}, (err, items) => {
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

  // Remove
  public remove(id:any) 
  {
    return new Promise((resolve, reject) => {
        return this.db.remove({ _id: id }, {}, ((err:any, numRemoved:any) => {
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
