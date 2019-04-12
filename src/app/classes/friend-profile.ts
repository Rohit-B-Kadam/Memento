export class FriendProfile 
{
    constructor(
        public name:string,
        public email:string,
        public userId?:string,
        public faceDescriptor?:any,
        public _id?: string,
        public profilePhotoPath?:any
    ) { }
}
