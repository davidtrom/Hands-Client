import { Recipient } from './Recipient';

export class HelpRequest {
    id: number;
    typeOfRequest: string;
    requestDescription: string;
    recipient: Recipient;


    constructor(id:number, typeOfRequest:string, requestDescription:string, recipient:Recipient){
        this.id = id;
        this.typeOfRequest = typeOfRequest;
        this.requestDescription = requestDescription;
        this.recipient = recipient;
    }
}