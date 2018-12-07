"use strict";

import request from "request-promise";

import {MockAttendee} from "./_mocks/MockAttendee";

const URL = "http://ec2-18-217-242-211.us-east-2.compute.amazonaws.com:3000/api/attendees";
var attendee;
var attendeeID;

/**
 * Attendees Endpoint - Test Suite
 * @author Shayne F. Preston <prests@rpi.edu>
 */
describe("Attendees Endpoints", () => {

    beforeAll(() => {
      attendee = MockAttendee.generate();
    });
  
    afterAll( async () => {
      const options = {
        method: "DELETE",
        uri: URL+"/"+attendeeID
      };
      const response = await request(options);
    });
  
    /**
     * Sample Test
     */
    test("this is just a sample test", async () => {
      // Documentation for request-promise: https://github.com/request/request-promise
      console.log(attendee);
      const options = {
        method: "POST",
        uri: URL,
        body: {
          firstName: attendee.firstName,
          middleName: attendee.middleName,
          lastName: attendee.lastName,
          dob: '02-16-1997',
          licenseNumber: ''+attendee.licenseNumber,
          eventId: 111
        },
        json: true
      };
      const response = await request(options);
      console.log(response);
      expect(response.firstName).toBe(attendee.firstName);
      expect(response.middle_name).toBe(attendee.middleName);
      expect(response.lastName).toBe(attendee.lastName);
      expect(response.dateOfBirth).toBe('1997-02-16');
      expect(response.license_number).toBe(''+attendee.licenseNumber);
      expect(response.eventId).toBe(111);
      attendeeID = response.id;
    });
    
    test("Get attendee by ID", async () => {
      const options = {
        method: "GET",
        uri: URL+"/"+attendeeID,
      };
      const response = await request(options);
      console.log(response);
      expect(response).toContain(''+attendee.licenseNumber);
    });
  
    test("Get attendee by invalid ID", async () => {
      const options = {
        method: "GET",
        uri: URL+"/0",
      };
      const response = await request(options);
      expect(response).toBe('');
    });

    test("Get all attendees by an eventID", async () => {
      const options = {
        method: "POST",
        uri: URL+"/getEvents",
        body: {
          eventId: 111
        },
        json: true
      };
      const response = await request(options);
      for(var i; i<response.length; ++i){
        expect(i.eventId).toBe(111);
      }
    });

    test("Have an attendee leave", async () => {
      const options = {
        method: "POST",
        uri: URL + '/left',
        body: {
          licenseNumber: '' + attendee.licenseNumber
        },
        json: true
      };
      const response = await request(options);
      expect(response.id).toBe(attendeeID);
    });
  
    test("Have an attendee return", async () => {
        const options = {
            method: "POST",
            uri: URL + "/enter",
            body: {
                licenseNumber: '' + attendee.licenseNumber
            },
            json: true
        };
        const response = await request(options);
        expect(response.id).toBe(attendeeID);
    });
  });