export class EventInfo 
{
    constructor(
       public title :  string,
       public date: Date,
       public location: string,
       public categories : string[],
       public description: string,
       public friends: string[],
       public isHidden?:boolean,
       public userId?:string,
       public eventPath?: string,
       public _id?: string,
    ){ }
}
