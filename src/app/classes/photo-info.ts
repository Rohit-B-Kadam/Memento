export class PhotoInfo 
{
    constructor(
        
        public photoUrl: string,
        public orientation ?: number,
        public dataTime ?: Date,
        public model ?: string, 
        public people ?: string[],
        public tag ?: string[],
        public _id ?: string,
        public eventName ?:string,
        public eventId ?:string
    ) { }
}