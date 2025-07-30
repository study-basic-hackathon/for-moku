import { PARTYKIT_URL } from "@/app/env";

export async function deleteUserFromRoom(roomId: string, userId: string): Promise<void> {
  const response = await fetch(`${PARTYKIT_URL}/parties/main/${roomId}`, {
    method: "DELETE",
    body: JSON.stringify(userId),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete user: ${response.status} ${response.statusText}`);
  }
}