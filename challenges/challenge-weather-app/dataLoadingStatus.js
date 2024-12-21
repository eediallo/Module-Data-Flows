export class DataLoadingMsgHandler {
  constructor(isFetching = false) {
    this.isFetching = isFetching;
  }

  static loadingMsg = "Data is loading. Please wait!";
  static errorLoadingMsg =
    "Data fetching failed! Please refresh the page and try again";

  updateDataLoadingStatus(element) {
    if (this.isFetching) {
      element.textContent = DataLoadingMsgHandler.loadingMsg;
    } else {
      element.textContent = DataLoadingMsgHandler.errorLoadingMsg;
    }
    this.styleFeedbackMsg(element);
  }

  styleFeedbackMsg(element) {
    element.style.textAlign = "center";
    element.style.fontSize = "30px";
    element.style.color = this.isFetching ? "black" : "red";
  }
}
