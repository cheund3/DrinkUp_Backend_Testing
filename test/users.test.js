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

  test("Test user input (unique) ", async () => {
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
   * Invalid User Insertion
   */
  test("Error handling on duplicate insertion", async () => {
    const options = {
      method: "POST",
      uri: URL,
      body: {
        firstName: 'shayne',
        lastName: 'preston',
        email: 'prests@rpi.edu',
        password: 'password',
      },
      json: true
    };
    try {
      await request(options);
      fail("duplicate insertion should cause an exception");
    } catch (error) {
      expect(error.message).toContain('400 - "Bad Request"');
    }
  }); 

  /**
   * Invalid Event Insertion (Duplicate)
   */
  test("search by email", async () => {
    const options = {
      method: "POST",
      uri: URL+'/email',
      body: {
        email: 'prests@rpi.edu',
      },
      json: true
    };
    const response = await request(options);
    console.log(response);
    expect(response).not.toBe(null)
  });

  /**
   * Get users
   */
  test("Get all users", async () => {
    const options = {
      method: "GET",
      uri: URL
    };
    const response = await request(options);
    console.log(response);
    expect(response).not.toBe(null)
  });

  /**
   * Get user by ID
   */
  test("Get all users", async () => {
    const options = {
      method: "GET",
      uri: URL +'/25'
    };
    const response = await request(options);
    console.log(response);
    expect(response).not.toBe(null)
  });
});