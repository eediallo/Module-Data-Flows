import { Weather } from "./weather.js";
import { ThumbnailHandler } from "./thumbnailHandler.js";
import { DataLoadingMsgHandler } from "./dataLoadingStatus.js";

//==========Instantiation======================
const weather = new Weather();
const thumbnailHandler = new ThumbnailHandler();
const dataLoadingMsgHandler = new DataLoadingMsgHandler();

export { weather, thumbnailHandler, dataLoadingMsgHandler };
