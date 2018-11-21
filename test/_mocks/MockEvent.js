"use strict";

import Chance from "chance";
import {Event} from "../../entities/Event";
const chanceInstance = new Chance();

const MIN_EXT_ID = 10000000;
const MAX_EXT_ID = 99999999;

export class MockEvent {

  static generate() {
    const testString = chanceInstance.name();
    const testNumber = chanceInstance.integer({ min: MIN_EXT_ID, max: MAX_EXT_ID });
    return new Event(testString, testNumber);
  }

}