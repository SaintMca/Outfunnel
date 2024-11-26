import { fetchContactsFromPlatform } from "../../domain/services/UnifiedContactService";

export const fetchContacts = async (req: any, res: any) => {
  const { platform } = req.params;

  try {
    const contacts = await fetchContactsFromPlatform(platform);
    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while fetching contacts.",
    });
  }
};