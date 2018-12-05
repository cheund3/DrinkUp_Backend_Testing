"use strict";

import request from "request-promise";

import {MockEvent} from "./_mocks/MockEvent";
import { stringify } from "querystring";

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
   * Sample Test
   */
  test("this is just a sample test", async () => {
    // Documentation for request-promise: https://github.com/request/request-promise
    const event = MockEvent.generate();
    const options = {
      method: "POST",
      uri: URL,
      body: {
        name: event.name,
        owner: 1
      },
      json: true
    };
    const response = await request(options);
    console.log(response);
    expect(response).not.toBe(null)
  });

  /**
   * Invalid Event Insertion (Duplicate)
   */
  test("it should fail to insert a duplicate event into the database", () => {

  });

  /**
   * Get event by ID
   */
  test("Get event by ID", async () => {
    const options = {
      method: "GET",
      uri: URL+"/185",
    };
    const response = await request(options);
    expect(response).toContain('Test Event');
  });

  test("Get event by invalid ID", async () => {
    const options = {
      method: "GET",
      uri: URL+"/1",
    };
    const response = await request(options);
    expect(response).toBe('');
  });

  test("Get all completed events by an Owner", async () => {
    const options = {
      method: "POST",
      uri: URL+"/ownerEvents",
      body: {
        owner: '148',
        completed: false
      },
      json: true
    };
    const response = await request(options);
    console.log(response);
    expect(response).not.toContain('"completed": true');
  });

  test("Close an event", async () => {
    const onSpotCreate = {
      method: "POST",
      uri: URL,
      body: {
        name: 'Close Event Dummy',
        owner: '148'
      },
      json: true
    };
    const response = await request(onSpotCreate);
    console.log(URL+'/closeEvent/'+'205');
    const closer = {
      method: "PUT",
      uri: URL + '/closeEvent/'+ response.id
    };
    const checker = await request(closer);
    console.log(checker);
    expect(checker).toContain(1);
  })
});