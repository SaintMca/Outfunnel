import { compareContacts } from "../../src/api/controllers/CompareController";
import { fetchContactsFromPlatform } from "../../src/domain/services/UnifiedContactService";
import { CompareContacts } from "../../src/utils/CompareContacts";

jest.mock("../../src/domain/services/UnifiedContactService");
jest.mock("../../src/utils/CompareContacts");

const mockMailchimpContacts = [
  { emailAddress: "a@mail.com", phoneNumber: "1234567", source: "mailchimp" },
];
const mockPipedriveContacts = [
  { emailAddress: "b@mail.com", phoneNumber: "7654321", source: "pipedrive" },
];
const mockComparisonResult = {
  mailchimpOnly: [{ emailAddress: "a@mail.com", phoneNumber: "1234567", source: "mailchimp" }],
  pipedriveOnly: [{ emailAddress: "b@mail.com", phoneNumber: "7654321", source: "pipedrive" }],
};

describe("CompareController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return compared contacts successfully", async () => {
    (fetchContactsFromPlatform as jest.Mock)
      .mockResolvedValueOnce(mockMailchimpContacts)
      .mockResolvedValueOnce(mockPipedriveContacts);
    (CompareContacts as jest.Mock).mockReturnValue(mockComparisonResult);

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await compareContacts(req, res);

    expect(fetchContactsFromPlatform).toHaveBeenCalledWith("mailchimp");
    expect(fetchContactsFromPlatform).toHaveBeenCalledWith("pipedrive");
    expect(CompareContacts).toHaveBeenCalledWith(mockMailchimpContacts, mockPipedriveContacts);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockComparisonResult);
  });

  it("should return error if fetching contacts fails", async () => {
    (fetchContactsFromPlatform as jest.Mock).mockRejectedValue(new Error("Fetch failed"));

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await compareContacts(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Fetch failed",
    });
  });
});