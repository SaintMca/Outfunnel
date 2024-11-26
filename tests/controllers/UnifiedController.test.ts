import { fetchContacts } from "../../src/api/controllers/UnifiedController";
import { fetchContactsFromPlatform } from "../../src/domain/services/UnifiedContactService";

jest.mock("../../src/domain/services/UnifiedContactService");

const mockContacts = [
  { emailAddress: "a@mail.com", phoneNumber: "1234567", source: "mailchimp" },
];

describe("UnifiedController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch contacts successfully from the specified platform", async () => {
    (fetchContactsFromPlatform as jest.Mock).mockResolvedValue(mockContacts);

    const req = { params: { platform: "mailchimp" } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await fetchContacts(req, res);

    expect(fetchContactsFromPlatform).toHaveBeenCalledWith("mailchimp");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockContacts,
    });
  });

  it("should return error if platform is unsupported", async () => {
    (fetchContactsFromPlatform as jest.Mock).mockRejectedValue(new Error("Unsupported platform"));

    const req = { params: { platform: "unknown" } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await fetchContacts(req, res);

    expect(fetchContactsFromPlatform).toHaveBeenCalledWith("unknown");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Unsupported platform",
    });
  });
});