export class User {
    
    constructor(public userName:string,
                public password:string,
                public email:string,
                public profileURL:string,
                public faceDescriptor?:any,
                public _id ?: string)
    { }
}
