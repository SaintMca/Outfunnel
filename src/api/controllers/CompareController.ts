import { Request, Response } from "express";
import { fetchContactsFromPlatform } from "../../domain/services/UnifiedContactService";
import { CompareContacts } from "../../utils/CompareContacts";

export const compareContacts = async (req: Request, res: Response) => {
  try {
    // Fetch contacts from both platforms
    const [mailchimpContacts, pipedriveContacts] = await Promise.all([
      fetchContactsFromPlatform("mailchimp"),
      fetchContactsFromPlatform("pipedrive"),
    ]);

    // Compare contacts
    const result = CompareContacts(mailchimpContacts, pipedriveContacts);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while comparing contacts.",
    });
  }
};