import { Request, Response } from "express";
import { getMailchimpContacts } from "../../domain/services/MailchimpService";
import { getPipedriveContacts } from "../../domain/services/PipedriveService";
import { CompareContacts } from "../../utils/CompareContacts";

export const compareContacts = async (req: Request, res: Response) => {
  try {
    
    // Fetch contacts from both platforms
    const mailchimpContacts = await getMailchimpContacts();
    const pipedriveContacts = await getPipedriveContacts();

    // Compare contacts using the utility function
    const result = CompareContacts(mailchimpContacts, pipedriveContacts);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while comparing contacts.",
    });
  }
};