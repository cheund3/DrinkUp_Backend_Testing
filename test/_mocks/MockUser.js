"use strict";

import Chance from "chance";
import {User} from "../../entities/User";
const chanceInstance = new Chance();

const MIN_EXT_ID = 0;
const MAX_EXT_ID = 200;

export class MockUser {

  static generate() {
    const firstName = chanceInstance.name();
    const lastName = chanceInstance.name();
    const email = chanceInstance.name() + "@gmail.com";
    const password = chanceInstance.integer({ min: MIN_EXT_ID, max: MAX_EXT_ID }) + chanceInstance.name(); + chanceInstance.integer({ min: MIN_EXT_ID, max: MAX_EXT_ID });
    return new User(firstName, lastName, email, password);
  }

}