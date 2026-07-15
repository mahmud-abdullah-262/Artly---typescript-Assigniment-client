import { ObjectId } from "mongodb";

export interface Artist {
_id: ObjectId;
artistId : string;
name: string;
image : string;
location: string;
bio: string
}