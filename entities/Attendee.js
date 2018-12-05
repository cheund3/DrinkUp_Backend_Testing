"use strict";

/**
 * Attendee Entity
 * @author Shayne F. Preston <prests@rpi.edu>
 */
export class User {

  constructor( firstName, middleName, lastName, dob, age, left, licenseNumber, eventId){
    this._firstName = firstName;
    this._middleName = middleName;
    this._lastName = lastName;
    this._dob = dob;
    this._age = age;
    this._left = left;
    this._licenseNumber = licenseNumber;
    this._eventId = eventId;
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

  get dob() {
    return this._dob;
  }

  get age() {
    return this._age;
  }

  get left() {
    return this._left;
  }

  get licenseNumber() {
    return this._licenseNumber;
  }

  get eventId() {
    return this._eventId;
  }

}