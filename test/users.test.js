"use strict";

import request from "request-promise";

import {MockUser} from "./_mocks/MockUser";

const URL = "http://ec2-18-217-242-211.us-east-2.compute.amazonaws.com:3000/api/users";
var user;
var userID;
/**
 * Users Endpoint - Test Suite
 * @author Dylan L. Cheung <cheund3@rpi.edu>
 */
describe("Users Endpoints", () => {

  beforeAll(() => {
    user = MockUser.generate();
  });

  afterAll( async () => {
    console.log('done');
    console.log(userID);
    const options = {
      method: "DELETE",
      uri: URL+"/"+userID,
    };
    const response = await request(options);
    console.log('here');
    console.log(response);
  });

  test("Test user input (unique) ", async () => {
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
    userID = response.id;
  });

  /**
   * Invalid User Insertion
   */
  test("Error handling on duplicate insertion", async () => {
    const options = {
      method: "POST",
      uri: URL+"/signup",
      body: {
        email: user.email,
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
   * Search by email
   */
  test("search by email", async () => {
    const options = {
      method: "POST",
      uri: URL+'/email',
      body: {
        email: user.email,
      },
      json: true
    };
    const response = await request(options);
    console.log(response);
    expect(response.email).toBe(user.email);
    expect(response.id).toBe(userID);
  });

  /**
   * Search by invalid email
   */
  test("Search by invalid email", async () => {
    const option = {
      method: "POST",
      uri: URL+'/email',
      body: {
        email: 'notgoingtoberight@betterlucknexttime.net',
      },
      json: true
    };
    try {
      await request(options)
    } catch(error) {
      console.log(error.message);
      expect(error.message).toContain('options is not defined');
    }
  });

  /**
   * Get user by ID
   */
  test("Get user by ID", async () => {
    const options = {
      method: "GET",
      uri: URL+"/"+userID,
    };
    const response = await request(options);
    expect(response).toContain(user.email);
  });

  /**
   * Get by invalid ID
   */
  test("Get user by invalid ID", async () => {
    const options = {
      method: "GET",
      uri: URL+"/0",
    };
    const response = await request(options);
    expect(response).toBe("");
  });

  test("signin valid email/passwod", async () => {
    const options = {
      method: "POST",
      uri: URL+"/signin",
      body: {
        email: user.email,
        password: user.password, 
      },
      json: true
    };
    console.log(options);
    const response = await request(options);
    console.log(response);
    expect(response.id).toBe(userID);
  });

  test("signin invalid email/passwod", async () => {
    const options = {
      method: "POST",
      uri: URL+"/signin",
      body: {
        email: 'youwillnevergetin@yahoooo.com',
        password: 'wrongpassword', 
      },
      json: true
    };
    try {
      await request(options)
    } catch(error) {
      console.log(error.message);
      expect(error.message).toContain('400');
    }
  });

  /**
   * Update by valid ID
   */
  test("Update user by valid ID", async () => {
    const options = {
      method: "PUT",
      uri: URL+"/"+userID,
      body: {
        firstName: 'newFirstName',
        lastName: 'newLastName',
        email: user.email,
        password: 'newPassword', 
      },
      json: true
    };
    const response = await request(options);
    console.log(response.id);
    expect(response.firstName).toBe('newFirstName');
    expect(response.lastName).toBe('newLastName');
    expect(response.password).toBe('newPassword');
  });

  test("Update user by invalid ID", async () => {
    const options = {
      method: "PUT",
      uri: URL+"/0",
      body: {
        firstName: 'shayne',
        lastName: 'preston',
        email: 'shayne@shayne.com',
        password: 'password', 
      },
      json: true
    };
    const response = await request(options);
    expect(response).toBe(undefined);
  });
});