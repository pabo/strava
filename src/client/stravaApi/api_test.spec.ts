/**
 * Strava API v3
 * The [Swagger Playground](https://developers.strava.com/playground) is the easiest way to familiarize yourself with the Strava API by submitting HTTP requests and observing the responses before you write any client code. It will show what a response will look like with different endpoints depending on the authorization scope you receive from your athletes. To use the Playground, go to https://www.strava.com/settings/api and change your “Authorization Callback Domain” to developers.strava.com. Please note, we only support Swagger 2.0. There is a known issue where you can only select one scope at a time. For more information, please check the section “client code” at https://developers.strava.com/docs.
 *
 * OpenAPI spec version: 3.0.0
 * 
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */

import * as api from "./api"
import { Configuration } from "./configuration"

const config: Configuration = {}

describe("ActivitiesApi", () => {
  let instance: api.ActivitiesApi
  beforeEach(function() {
    instance = new api.ActivitiesApi(config)
  });

  test("createActivity", () => {
    const name: string = "name_example"
    const type: string = "type_example"
    const sportType: string = "sportType_example"
    const startDateLocal: Date = 2013-10-20T19:20:30+01:00
    const elapsedTime: number = 56
    const description: string = "description_example"
    const distance: number = 3.4
    const trainer: number = 56
    const commute: number = 56
    return expect(instance.createActivity(name, type, sportType, startDateLocal, elapsedTime, description, distance, trainer, commute, {})).resolves.toBe(null)
  })
  test("getActivityById", () => {
    const id: number = 789
    const includeAllEfforts: boolean = true
    return expect(instance.getActivityById(id, includeAllEfforts, {})).resolves.toBe(null)
  })
  test("getCommentsByActivityId", () => {
    const id: number = 789
    const page: number = 56
    const perPage: number = 56
    const pageSize: number = 56
    const afterCursor: string = "afterCursor_example"
    return expect(instance.getCommentsByActivityId(id, page, perPage, pageSize, afterCursor, {})).resolves.toBe(null)
  })
  test("getKudoersByActivityId", () => {
    const id: number = 789
    const page: number = 56
    const perPage: number = 56
    return expect(instance.getKudoersByActivityId(id, page, perPage, {})).resolves.toBe(null)
  })
  test("getLapsByActivityId", () => {
    const id: number = 789
    return expect(instance.getLapsByActivityId(id, {})).resolves.toBe(null)
  })
  test("getLoggedInAthleteActivities", () => {
    const before: number = 56
    const after: number = 56
    const page: number = 56
    const perPage: number = 56
    return expect(instance.getLoggedInAthleteActivities(before, after, page, perPage, {})).resolves.toBe(null)
  })
  test("getZonesByActivityId", () => {
    const id: number = 789
    return expect(instance.getZonesByActivityId(id, {})).resolves.toBe(null)
  })
  test("updateActivityById", () => {
    const id: number = 789
    const body: api.UpdatableActivity = undefined
    return expect(instance.updateActivityById(id, body, {})).resolves.toBe(null)
  })
})

describe("AthletesApi", () => {
  let instance: api.AthletesApi
  beforeEach(function() {
    instance = new api.AthletesApi(config)
  });

  test("getLoggedInAthlete", () => {
    return expect(instance.getLoggedInAthlete({})).resolves.toBe(null)
  })
  test("getLoggedInAthleteZones", () => {
    return expect(instance.getLoggedInAthleteZones({})).resolves.toBe(null)
  })
  test("getStats", () => {
    const id: number = 789
    return expect(instance.getStats(id, {})).resolves.toBe(null)
  })
  test("updateLoggedInAthlete", () => {
    const weight: number = 3.4
    return expect(instance.updateLoggedInAthlete(weight, {})).resolves.toBe(null)
  })
})

describe("ClubsApi", () => {
  let instance: api.ClubsApi
  beforeEach(function() {
    instance = new api.ClubsApi(config)
  });

  test("getClubActivitiesById", () => {
    const id: number = 789
    const page: number = 56
    const perPage: number = 56
    return expect(instance.getClubActivitiesById(id, page, perPage, {})).resolves.toBe(null)
  })
  test("getClubAdminsById", () => {
    const id: number = 789
    const page: number = 56
    const perPage: number = 56
    return expect(instance.getClubAdminsById(id, page, perPage, {})).resolves.toBe(null)
  })
  test("getClubById", () => {
    const id: number = 789
    return expect(instance.getClubById(id, {})).resolves.toBe(null)
  })
  test("getClubMembersById", () => {
    const id: number = 789
    const page: number = 56
    const perPage: number = 56
    return expect(instance.getClubMembersById(id, page, perPage, {})).resolves.toBe(null)
  })
  test("getLoggedInAthleteClubs", () => {
    const page: number = 56
    const perPage: number = 56
    return expect(instance.getLoggedInAthleteClubs(page, perPage, {})).resolves.toBe(null)
  })
})

describe("GearsApi", () => {
  let instance: api.GearsApi
  beforeEach(function() {
    instance = new api.GearsApi(config)
  });

  test("getGearById", () => {
    const id: string = "id_example"
    return expect(instance.getGearById(id, {})).resolves.toBe(null)
  })
})

describe("RoutesApi", () => {
  let instance: api.RoutesApi
  beforeEach(function() {
    instance = new api.RoutesApi(config)
  });

  test("getRouteAsGPX", () => {
    const id: number = 789
    return expect(instance.getRouteAsGPX(id, {})).resolves.toBe(null)
  })
  test("getRouteAsTCX", () => {
    const id: number = 789
    return expect(instance.getRouteAsTCX(id, {})).resolves.toBe(null)
  })
  test("getRouteById", () => {
    const id: number = 789
    return expect(instance.getRouteById(id, {})).resolves.toBe(null)
  })
  test("getRoutesByAthleteId", () => {
    const page: number = 56
    const perPage: number = 56
    return expect(instance.getRoutesByAthleteId(page, perPage, {})).resolves.toBe(null)
  })
})

describe("SegmentEffortsApi", () => {
  let instance: api.SegmentEffortsApi
  beforeEach(function() {
    instance = new api.SegmentEffortsApi(config)
  });

  test("getEffortsBySegmentId", () => {
    const segmentId: number = 56
    const startDateLocal: Date = 2013-10-20T19:20:30+01:00
    const endDateLocal: Date = 2013-10-20T19:20:30+01:00
    const perPage: number = 56
    return expect(instance.getEffortsBySegmentId(segmentId, startDateLocal, endDateLocal, perPage, {})).resolves.toBe(null)
  })
  test("getSegmentEffortById", () => {
    const id: number = 789
    return expect(instance.getSegmentEffortById(id, {})).resolves.toBe(null)
  })
})

describe("SegmentsApi", () => {
  let instance: api.SegmentsApi
  beforeEach(function() {
    instance = new api.SegmentsApi(config)
  });

  test("exploreSegments", () => {
    const bounds: Array<number> = undefined
    const activityType: string = "activityType_example"
    const minCat: number = 56
    const maxCat: number = 56
    return expect(instance.exploreSegments(bounds, activityType, minCat, maxCat, {})).resolves.toBe(null)
  })
  test("getLoggedInAthleteStarredSegments", () => {
    const page: number = 56
    const perPage: number = 56
    return expect(instance.getLoggedInAthleteStarredSegments(page, perPage, {})).resolves.toBe(null)
  })
  test("getSegmentById", () => {
    const id: number = 789
    return expect(instance.getSegmentById(id, {})).resolves.toBe(null)
  })
  test("starSegment", () => {
    const starred: boolean = true
    const id: number = 789
    return expect(instance.starSegment(starred, id, {})).resolves.toBe(null)
  })
})

describe("StreamsApi", () => {
  let instance: api.StreamsApi
  beforeEach(function() {
    instance = new api.StreamsApi(config)
  });

  test("getActivityStreams", () => {
    const id: number = 789
    const keys: Array<string> = undefined
    const keyByType: boolean = true
    return expect(instance.getActivityStreams(id, keys, keyByType, {})).resolves.toBe(null)
  })
  test("getRouteStreams", () => {
    const id: number = 789
    return expect(instance.getRouteStreams(id, {})).resolves.toBe(null)
  })
  test("getSegmentEffortStreams", () => {
    const id: number = 789
    const keys: Array<string> = undefined
    const keyByType: boolean = true
    return expect(instance.getSegmentEffortStreams(id, keys, keyByType, {})).resolves.toBe(null)
  })
  test("getSegmentStreams", () => {
    const id: number = 789
    const keys: Array<string> = undefined
    const keyByType: boolean = true
    return expect(instance.getSegmentStreams(id, keys, keyByType, {})).resolves.toBe(null)
  })
})

describe("UploadsApi", () => {
  let instance: api.UploadsApi
  beforeEach(function() {
    instance = new api.UploadsApi(config)
  });

  test("createUpload", () => {
    const file: Blob = "file_example"
    const name: string = "name_example"
    const description: string = "description_example"
    const trainer: string = "trainer_example"
    const commute: string = "commute_example"
    const dataType: string = "dataType_example"
    const externalId: string = "externalId_example"
    return expect(instance.createUpload(file, name, description, trainer, commute, dataType, externalId, {})).resolves.toBe(null)
  })
  test("getUploadById", () => {
    const uploadId: number = 789
    return expect(instance.getUploadById(uploadId, {})).resolves.toBe(null)
  })
})

