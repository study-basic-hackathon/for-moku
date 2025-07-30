import { selectEventById } from "@/lib/db/event";
import { isUserAdminOfGroup } from "@/lib/db/user_group_assignment";
import { selectUserByEmail } from "@/lib/db/user";

export async function checkAdminPermission(userEmail: string, roomId: string): Promise<boolean> {
  try {
    const eventId = Number(roomId);
    if (isNaN(eventId)) return false;

    const event = await selectEventById(eventId);
    if (!event) return false;

    const user = await selectUserByEmail(userEmail);
    if (!user) return false;

    return await isUserAdminOfGroup(user.id, event.userGroupId);
  } catch (error) {
    console.error("Failed to check admin permission:", error);
    return false;
  }
}