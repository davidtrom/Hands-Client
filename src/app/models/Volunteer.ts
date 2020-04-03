
export class Volunteer {
    id: number;
    firstName: string;
    lastName: string;
    phoneNum: string;
    email: string;
    password: string;
    link: string;


    constructor(id:number, firstName:string, lastName:string, phoneNum:string, email:string, password:string, link:string){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNum = phoneNum;
        this.email = email;
        this.password = password;
        this.link = link;
    }
}