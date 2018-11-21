"use strict";

import request from "request-promise";

import {MockUser} from "./_mocks/MockUser";

const URL = "http://ec2-18-217-242-211.us-east-2.compute.amazonaws.com:3000/api/users";

/**
 * Users Endpoint - Test Suite
 * @author Dylan L. Cheung <cheund3@rpi.edu>
 */
describe("Users Endpoints", () => {

  beforeAll(() => {
  });

  afterAll(() => {
  });

  test("this is just a sample test", async () => {
    const user = MockUser.generate();
    const options = {
      method: "POST",
      uri: URL,
      body: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
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
  test("should insert an event into the database", () => {

  });

  /**
   * Invalid Event Insertion (Duplicate)
   */
  test("should fail to insert a duplicate event into the database", () => {

  });

});