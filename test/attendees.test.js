"use strict";

import request from "request-promise";

import {MockAttendee} from "./_mocks/MockAttendee";

const URL = "http://ec2-18-217-242-211.us-east-2.compute.amazonaws.com:3000/api/attendees";

/**
 * Attendees Endpoint - Test Suite
 * @author Shayne F. Preston <prests@rpi.edu>
 */
describe("Attendees Endpoints", () => {

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
      const attendee = MockAttendee.generate();
      console.log(attendee);
      const options = {
        method: "POST",
        uri: URL,
        body: {
          firstName: attendee.firstName,
          middleName: attendee.middleName,
          lastName: attendee.lastName,
          dob: '02-16-1997',
          age: attendee.age,
          licenseNumber: ''+attendee.licenseNumber,
          eventId: 111
        },
        json: true
      };
      const response = await request(options);
      console.log(response);
      expect(response).not.toBe(null)
    });
  
    /**
     * Get event by ID
     */
    /*
    test("Get attendee by ID", async () => {
      const options = {
        method: "GET",
        uri: URL+"/96",
      };
      const response = await request(options);
      console.log(response);
      expect(response).toContain('Test Attendee');
    });
  
    test("Get attendee by invalid ID", async () => {
      const options = {
        method: "GET",
        uri: URL+"/1",
      };
      const response = await request(options);
      expect(response).toBe('');
    });
    */
    test("Get all attendees by an eventID", async () => {
      const options = {
        method: "POST",
        uri: URL+"/getEvents",
        body: {
          eventId: 185
        },
        json: true
      };
      const response = await request(options);
      console.log(response);
      expect(response).not.toContain('Test Attendee');
    });
  
    test("Have an attendee leave", async () => {
      const options = {
        method: "POST",
        uri: URL + '/left',
        body: {
          licenseNumber: '' + 414069302
        },
        json: true
      };
      const response = await request(options);
      expect(response).toContain(1);
    });
    
    test("Have an attendee return", async () => {
        const options = {
            method: "POST",
            uri: URL + "/enter",
            body: {
                licenseNumber: '' + 414069302
            },
            json: true
        };
        const response = await request(options);
        expect(response).toContain(1);
    })
  });