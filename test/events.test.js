"use strict";

import request from "request-promise";

import {MockEvent} from "./_mocks/MockEvent";

const URL = "http://ec2-18-217-242-211.us-east-2.compute.amazonaws.com:3000/api/events"; // use caps for global constants

/**
 * Events Endpoint - Test Suite
 * @author Dylan L. Cheung <cheund3@rpi.edu>
 */
describe("Events Endpoints", () => {

  beforeAll(() => {
    // Leave empty if nothing to do before all tests below are run
  });

  afterAll(() => {
    // Leave empty if no clean up is needed
  });

  /**
   * Test to add an event
   */
  test("this is just a sample test", async () => {
    // Documentation for request-promise: https://github.com/request/request-promise
    const event = MockEvent.generate();
    const options = {
      method: "POST",
      uri: URL,
      body: {
        name: event.name,
      },
      json: true
    };
    const response = await request(options);
    console.log(response);
    expect(response).not.toBe(null)
  });

  /**
   * Valid Event Insertion
   */
  test("it should insert an event into the database", () => {

  });

  /**
   * Invalid Event Insertion (Duplicate)
   */
  test("it should fail to insert a duplicate event into the database", () => {

  });

});