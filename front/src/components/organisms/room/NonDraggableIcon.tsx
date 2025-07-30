"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/atoms/shadcn/avatar";
import { User } from "lucide-react";
import { UserIcon } from "@/types/room/shared";
import UserIconTooltip from "./UserIconTooltip";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { deleteUserFromRoom } from "@/lib/api/deleteUser";

export default function NonDraggableIcon({
  icon,
  roomId
} : {
  icon: UserIcon,
  roomId?: string
}) {
  const { data: session } = useSession();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // roomIdがない場合（終了したイベント）は削除機能を無効化
  const canDelete = roomId && isAdmin;

  useEffect(() => {
    const checkAdmin = async () => {
      if (session?.user?.email && roomId) {
        try {
          const response = await fetch(`/api/admin/check-permission?roomId=${roomId}`);
          if (response.ok) {
            const data = await response.json();
            setIsAdmin(data.isAdmin);
          }
        } catch (error) {
          console.error("Failed to check admin permission:", error);
          setIsAdmin(false);
        }
      }
    };
    
    checkAdmin();
  }, [session?.user?.email, roomId]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (canDelete) {
      setShowDeleteDialog(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!roomId) return;
    try {
      await deleteUserFromRoom(roomId, icon.user.id);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <>
      <div
        className="absolute size-12"
        style={{transform: `translate(${icon.position.x}px, ${icon.position.y}px)`}}
      >
        <UserIconTooltip user={icon.user}>
          <Avatar
            className={`size-12 ${canDelete ? 'cursor-pointer hover:opacity-80' : ''}`}
            onClick={handleClick}
            onPointerDown={(e) => e.preventDefault()}
          >
            <AvatarImage 
              src={`${icon.user.image}`}
              draggable="false"
              referrerPolicy="no-referrer"
            />
            <AvatarFallback><User /></AvatarFallback> 
          </Avatar>
        </UserIconTooltip>
      </div>
      
      {canDelete && (
        <DeleteConfirmDialog
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={handleDeleteConfirm}
          userName={icon.user.name || "Unknown User"}
        />
      )}
    </>
  )
}
