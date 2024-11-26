import request from "supertest";
import { app } from "../../src/app"; // Import only the app, not the server
import { getPipedriveContacts } from "../../src/domain/services/PipedriveService";

jest.mock("../../src/domain/services/PipedriveService");

const mockContacts = [
  {
    emailAddress: "b@mail.com",
    phoneNumber: "9876543",
    source: "pipedrive",
    rating: null,
    contactDateAdded: "2024-11-25T10:00:00Z",
  },
];

describe("PipedriveController", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls and state after each test
  });

  afterAll(() => {
    jest.restoreAllMocks(); // Restore original mocked functions
  });

  it("should fetch Pipedrive contacts successfully", async () => {
    (getPipedriveContacts as jest.Mock).mockResolvedValue(mockContacts);

    const response = await request(app).get("/pipedrive/contacts");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(mockContacts);
  });

  it("should handle errors when fetching Pipedrive contacts", async () => {
    (getPipedriveContacts as jest.Mock).mockRejectedValue(new Error("Failed to fetch contacts"));

    const response = await request(app).get("/pipedrive/contacts");

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Failed to fetch contacts");
  });
});