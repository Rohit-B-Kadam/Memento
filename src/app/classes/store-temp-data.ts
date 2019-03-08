import { EventInfo } from "./event-info";
import { PhotoInfo } from "./photo-info";

export class StoreTempData {
  public id : string;  
  public eventInfo: EventInfo;
  public photoInfos ?: PhotoInfo[];
}
