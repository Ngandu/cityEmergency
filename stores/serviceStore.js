import { makeAutoObservable } from "mobx";

class ServiceStore {
  //observables
  service = "";

  constructor() {
    makeAutoObservable(this);
  }

  // actions
  setService(serv) {
    console.log("setService");
    this.service = serv;
  }
}

export default new ServiceStore();
