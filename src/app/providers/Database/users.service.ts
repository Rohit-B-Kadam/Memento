import { Injectable } from '@angular/core';

// importing NeDB
import * as Datastore from 'nedb';
import { User } from '../../classes/user';

@Injectable({
  providedIn: 'root'
})



export class UsersService {

  public db: any;

  private databaseURI = "UserDatabase.db";

  constructor() {
    this.db = new Datastore({
      filename: this.databaseURI,
      autoload: true
    });

    console.log("Status:  Users Database is Created");
  }

  //---------------------------------------------------------------
  //CRUD NeDB
  //---------------------------------------------------------------


  // Insert new User
  public insert(item: User) {
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

}
