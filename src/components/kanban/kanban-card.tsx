"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import type { KanbanCard as KanbanCardType } from "@/stores/kanban-store";

interface KanbanCardProps {
  card: KanbanCardType;
  onDelete: (id: string) => void;
}

export function KanbanCard({ card, onDelete }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, data: { type: "card", card } });

  const style = {
    opacity: isDragging ? 0.5 : 1,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="flex items-start gap-2 rounded-md border bg-background p-2 shadow-sm"
      ref={setNodeRef}
      style={style}
    >
      <button
        className="mt-0.5 cursor-grab touch-none"
        type="button"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-4 text-muted-foreground" />
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-sm">{card.title}</p>
        {card.description && (
          <p className="mt-0.5 truncate text-muted-foreground text-xs">
            {card.description}
          </p>
        )}
      </div>
      <button
        className="mt-0.5 cursor-pointer"
        onClick={() => onDelete(card.id)}
        type="button"
      >
        <Trash2 className="size-3 text-muted-foreground hover:text-destructive" />
      </button>
    </div>
  );
}
