// Catergoies to add userdefine catergoies

import { Injectable } from '@angular/core';

import * as Datastore from 'nedb';
import { Category } from '../../classes/category';

@Injectable({
  providedIn: 'root'
})
export class CatergoryCollectionService {

  public db: any;

  private databaseURI = "CategoriesDatabase.db";

  constructor() {
    this.db = new Datastore({
      filename: this.databaseURI,
      autoload: true
    });

    console.log("Status:  Categories Database is Created");
  }

  //---------------------------------------------------------------
  //CRUD NeDB
  //---------------------------------------------------------------


  // Insert new User
  public insert(item: Category) {
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

  public find(Id:string) 
  {
    return new Promise((resolve, reject) => {

      return this.db.find({userId: Id}, (err, items) => {
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
