import { ObjectId } from "mongodb";

export interface Artist {
_id: ObjectId;
artistID : number;
name: string;
imageUrl : string;
location: string;
bio: string
}