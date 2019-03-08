export class PhotoInfo 
{
    constructor(
        
        public photoUrl: string,
        public people ?: string[],
        public tag ?: string[],
        public _id ?: string
    ) { }
}