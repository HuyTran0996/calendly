import DashboardNav from "@/components/DashboardNav";
import EventTypeForm from "@/components/EventTypeForm";
import React from "react";

const NewEventTypePage = () => {
  return (
    <div>
      <DashboardNav />
      <div className="mt-4">
        <EventTypeForm />
      </div>
    </div>
  );
};

export default NewEventTypePage;
