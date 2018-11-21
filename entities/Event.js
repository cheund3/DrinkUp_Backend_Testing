"use strict";

/**
 * Event Entity
 * @author Dylan L. Cheung <cheund3@rpi.edu>
 */
export class Event {

  constructor( name, testId ) {
    this._name = name;
    this._testId = testId;
  }

  get name() {
    return this._name;
  }

  get testId() {
    return this._testId;
  }

}