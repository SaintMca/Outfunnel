import request from "supertest";
import { app } from "../../src/app"; // Import only the app
import { getMailchimpContacts } from "../../src/domain/services/MailchimpService";

jest.mock("../../src/services/MailchimpService");

const mockContacts = [
  {
    emailAddress: "a@mail.com",
    phoneNumber: "1234567",
    source: "mailchimp",
    rating: null,
    contactDateAdded: "2024-11-25T10:00:00Z",
  },
];

describe("MailchimpController", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Ensure mocks are reset after each test
  });

  afterAll(() => {
    jest.restoreAllMocks(); // Restore all original mocked functions
  });

  it("should fetch Mailchimp contacts successfully", async () => {
    (getMailchimpContacts as jest.Mock).mockResolvedValue(mockContacts);

    const response = await request(app).get("/mailchimp/contacts");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(mockContacts);
  });

  it("should handle errors when fetching Mailchimp contacts", async () => {
    (getMailchimpContacts as jest.Mock).mockRejectedValue(new Error("Failed to fetch contacts"));

    const response = await request(app).get("/mailchimp/contacts");

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Failed to fetch contacts");
  });
});