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
      uri: URL+"/signup",
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
    expect(response.firstName).toBe(user.firstName);
    expect(response.lastName).toBe(user.lastName);
    expect(response.email).toBe(user.email);
    expect(response.password).toBe(user.password);
  });

  /**
   * Invalid User Insertion
   */
  test("Error handling on duplicate insertion", async () => {
    const options = {
      method: "POST",
      uri: URL+"/signup",
      body: {
        firstName: 'shayne',
        lastName: 'preston',
        email: 'shayne@shayne.com',
        password: 'password',
      },
      json: true
    };
    try {
      await request(options);
      fail("duplicate insertion should cause an exception");
    } catch (error) {
      expect(error.message).toContain('"SequelizeUniqueConstraintError\"');
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
        email: 'shayne@shayne.com',
      },
      json: true
    };
    const response = await request(options);
    console.log(response);
    expect(response.email).toBe('shayne@shayne.com');
    expect(response.id).toBe(148);
  });

  /**
   * Get user by ID
   */
  test("Get user by ID", async () => {
    const options = {
      method: "GET",
      uri: URL+"/148",
    };
    const response = await request(options);
    expect(response).toContain('shayne@shayne.com');
  });
});