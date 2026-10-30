
"use client";



import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DeleteConfirmModal } from "@/components/delete-confirm-modal";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Project 42</h1>
      <p>Some page content behind the modal.</p>

      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete project
      </Button>

      <DeleteConfirmModal
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </main>
  );
}

