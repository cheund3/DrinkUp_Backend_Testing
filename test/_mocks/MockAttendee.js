/**
 * Attendee Entity
 * @author Shayne F. Preston <prests@rpi.edu>
 */
"use strict";

import Chance from "chance";
import {Attendee} from "../../entities/Attendee";
const chanceInstance = new Chance();

const MIN_EXT_ID = 0;
const MAX_EXT_ID = 200;

const MIN_LIC = 111111
const MAX_LIC = 999999
export class MockAttendee {

  static generate() {
    const firstName = chanceInstance.name();
    const middleName = chanceInstance.name();
    const lastName = chanceInstance.name();
    const age = chanceInstance.integer({ min: MIN_EXT_ID, max: MAX_EXT_ID});
    const licenseNumber = chanceInstance.integer({min: MIN_LIC, max: MAX_LIC});
    return new Attendee(firstName, middleName, lastName, age, licenseNumber);
  }

}