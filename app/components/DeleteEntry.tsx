"use client";

import { deleteEntry } from "@/logic/db.api";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { toast } from "sonner";

export default function DeleteEntryPage({ id }: { id: string }) {
    function handleDelete() {
        try {
            deleteEntry(id);
            toast.success("Entrada eliminada exitosamente");
        } catch (error) {
            toast.error("Error al eliminar la entrada", {
                description: (error as Error).message,
            });
        }
    }

    return (
        <Button variant="outline" onClick={handleDelete}>
            <TrashIcon />
            Eliminar
        </Button>
    )
}