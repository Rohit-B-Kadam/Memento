export class EventInfo 
{
    constructor(
       public title :  string,
       public description: string,
       public location: string,
       public date: Date,
       public categories : string[],
       public tags: string[],
       public friends: string[] 
    ){ }
}
