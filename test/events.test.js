"use strict";

import request from "request-promise";

import {MockEvent} from "./_mocks/MockEvent";
import { stringify } from "querystring";

const URL = "http://ec2-18-217-242-211.us-east-2.compute.amazonaws.com:3000/api/events"; // use caps for global constants
var event;
var eventID;

/**
 * Events Endpoint - Test Suite
 * @author Dylan L. Cheung <cheund3@rpi.edu>
 */
describe("Events Endpoints", () => {

  beforeAll(() => {
    event = MockEvent.generate();
    console.log(event);
  });

  afterAll(async () => {
    const options = {
      method: "DELETE",
      uri: URL+"/"+eventID
    };
    const response = await request(options);
  });

  /**
   * Sample Test
   */
  test("this is just a sample test", async () => {
    // Documentation for request-promise: https://github.com/request/request-promise
    const options = {
      method: "POST",
      uri: URL,
      body: {
        name: event.name,
        owner: event.testId
      },
      json: true
    };
    const response = await request(options);
    console.log(response);
    expect(response.name).toBe(event.name);
    expect(response.owner).toBe(event.testId);
    eventID = response.id;
  });

  test("Get event by ID", async () => {
    const options = {
      method: "GET",
      uri: URL+"/"+eventID,
    };
    const response = await request(options);
    console.log(response);
    expect(response).toContain(event.testId);
  });

  test("Get event by invalid ID", async () => {
    const options = {
      method: "GET",
      uri: URL+"/0",
    };
    const response = await request(options);
    expect(response).toBe('');
  });

  test("Get all completed events by an Owner", async () => {
    const options = {
      method: "POST",
      uri: URL+"/ownerEvents",
      body: {
        owner: event.testId,
        completed: false
      },
      json: true
    };
    const response = await request(options);
    console.log(response);
    expect(response).not.toContain('"completed": true');
  });

  test("Close an event", async () => {
    const options = {
      method: "PUT",
      uri: URL+ '/closeEvent/' + eventID
    };
    const response = await request(options);
    expect(response).toContain(eventID);
    expect(response).toContain(true);
  })

  test("Close an invalid event", async () => {
    const options = {
      method: "PUT",
      uri: URL+ '/closeEvent/0'
    };
    const response = await request(options);
    expect(response).toBe('');
  })
});