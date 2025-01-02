"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const EventTypeDelete = ({ id }: { id: string }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    await axios.delete("/api/event-types?id=" + id);
    router.push("/dashboard/event-types");
    router.refresh();
  };
  return (
    <div>
      {!showConfirmation && (
        <button
          onClick={() => setShowConfirmation(true)}
          type="button"
          className="btn-red"
        >
          <Trash size={16} />
          Delete
        </button>
      )}

      {showConfirmation && (
        <div>
          <button
            onClick={() => setShowConfirmation(false)}
            className="btn-gray"
          >
            Cancel
          </button>
          <button onClick={() => handleDelete()} className="btn-red">
            Yes, Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default EventTypeDelete;
