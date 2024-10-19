import { Entry } from "@prisma/client";
import Prisma from "../src/db";
import { server } from "../src/server";

const dateReviver = (key: string, value: string) => {
  if (key == "created_at" || key == "time") {
    return new Date(value);
  }

  return value;
};

beforeAll(async () => {
  await server.listen(process.env.PORT || 3001, "0.0.0.0");
});

describe("The server...", () => {
  // ------------------------------ CREATE ------------------------------
  it("...should create an entry and store it in the database.", async () => {
    // Create fake entry
    const testEntry: Entry = {
      id: "90000",
      title: "Test Entry",
      description: "This is a test description.",
      created_at: new Date("2024-02-26"),
      time: new Date("2024-02-26"),
    };

    // Add it to database
    const response_create = await server.inject({
      method: "POST",
      url: "/create/",
      payload: testEntry,
    });
    expect(response_create.statusCode).toBe(200);

    // Get it from database and ensure it exists
    const response_get = await server.inject({
      method: "GET",
      url: "/get/90000",
    });
    expect(response_get.statusCode).toBe(200);
    expect(JSON.parse(response_get.payload, dateReviver)).toEqual(testEntry);
  });

  // ------------------------------ GET/:id ------------------------------
  it("...should return a specific entry from /get/:id.", async () => {
    // Create fake entry with specific ID
    const testEntry: Entry = {
      id: "90001",
      title: "Test Entry",
      description: "This is a test description.",
      created_at: new Date("2024-02-26"),
      time: new Date("2024-02-26"),
    };

    // Add it to database
    const response_create = await server.inject({
      method: "POST",
      url: "/create/",
      payload: testEntry,
    });
    expect(response_create.statusCode).toBe(200);

    // Get/ID it from database and assert it is correct
    const response_get = await server.inject({
      method: "GET",
      url: "/get/90001",
    });
    expect(response_create.statusCode).toBe(200);
    expect(JSON.parse(response_get.payload, dateReviver)).toEqual(testEntry);
  });

  // ------------------------------- GET -------------------------------
  it("...should return all entries from /get/.", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/get/",
    });
    expect(response.statusCode).toBe(200);

    JSON.parse(response.payload).forEach((entry: object) => {
      expect(entry).toHaveProperty("id");
      expect(entry).toHaveProperty("title");
      expect(entry).toHaveProperty("description");
      expect(entry).toHaveProperty("created_at");
      expect(entry).toHaveProperty("time");
    });
  });

  // ------------------------------ UPDATE ------------------------------
  it("...should update an entry in the database.", async () => {
    // Create fake entry
    const testEntry: Entry = {
      id: "90002",
      title: "Test Entry",
      description: "This is a test description.",
      created_at: new Date("2024-02-26"),
      time: new Date("2024-02-26"),
    };

    // Create update entry
    const updateEntry: Entry = {
      id: "90002",
      title: "Test Entry Update",
      description: "This is an updated test description.",
      created_at: new Date("2024-02-26"),
      time: new Date("2024-02-26"),
    };

    // Add it to database
    const response_create = await server.inject({
      method: "POST",
      url: "/create/",
      payload: testEntry,
    });
    expect(response_create.statusCode).toBe(200);

    // Update it
    const response_update = await server.inject({
      method: "PUT",
      url: "/update/90002",
      payload: updateEntry,
    });
    expect(response_update.statusCode).toBe(200);
    expect(JSON.parse(response_update.payload).msg).toBe("Updated successfully");

    // Get it from database and assert changes
    const response_get = await server.inject({
      method: "GET",
      url: "/get/90002",
    });
    expect(response_get.statusCode).toBe(200);
    expect(JSON.parse(response_get.payload, dateReviver)).toEqual(updateEntry);
  });

  // ------------------------------ DELETE ------------------------------
  it("...should delete an entry in the database.", async () => {
    // Create fake entry
    const testEntry: Entry = {
      id: "90003",
      title: "Test Entry.",
      description: "This is a test description.",
      created_at: new Date("2024-02-26"),
      time: new Date("2024-02-26"),
    };

    // Add it to database
    const response_create = await server.inject({
      method: "POST",
      url: "/create/",
      payload: testEntry,
    });

    // Delete entry
    const response_delete = await server.inject({
      method: "DELETE",
      url: "/delete/90003",
    });
    expect(response_delete.statusCode).toBe(200);

    // Get it from database and assert 500
    const response_get = await server.inject({
      method: "GET",
      url: "/get/90003",
    });
    expect(response_get.statusCode).toBe(500);
  });
});

afterAll(async () => {
  // Clean up test entries (WILL REMOVE IF TEST DB ADDED)
  await server.inject({ method: "DELETE", url: "/delete/90000" });
  await server.inject({ method: "DELETE", url: "/delete/90001" });
  await server.inject({ method: "DELETE", url: "/delete/90002" });

  await server.close();
});
