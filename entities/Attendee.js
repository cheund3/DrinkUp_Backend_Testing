"use strict";

/**
 * Attendee Entity
 * @author Shayne F. Preston <prests@rpi.edu>
 */
export class Attendee {

  constructor( firstName, middleName, lastName, age, licenseNumber){
    this._firstName = firstName;
    this._middleName = middleName;
    this._lastName = lastName;
    this._age = age;
    this._licenseNumber = licenseNumber;
  }

  get firstName() {
    return this._firstName;
  }

  get middleName() {
    return this._middleName;
  }

  get lastName() {
    return this._lastName;
  }

  get age() {
    return this._age;
  }

  get licenseNumber() {
    return this._licenseNumber;
  }

}