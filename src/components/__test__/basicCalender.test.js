import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BasicCalendar from "../basicCalendat/BasicCalendar";
import Modal from "../modal/Modal";

describe("BasicCalendar", () => {
  it("renders without crashing", () => {
    render(<BasicCalendar />);
  });


  it("displays current month and year", () => {
    render(<BasicCalendar />);
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", { month: "long" });
    const currentYear = currentDate.getFullYear();
    expect(screen.getByText(`${currentMonth} ${currentYear}`)).toBeInTheDocument();
  });
  
  it("displays weekdays", () => {
    render(<BasicCalendar />);
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekdays.forEach((weekday) => {
      expect(screen.getByText(weekday)).toBeInTheDocument();
    });
  });


//   it("renders a modal component", () => {
//       render(<Modal />);
//       expect(screen.getByTestId("modal")).toBeInTheDocument();
//     });
  
  
  
//     it("displays days of the month", () => {
//       render(<BasicCalendar />);
//       const currentDate = new Date();
//       const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
//       for (let day = 1; day <= lastDayOfMonth; day++) {
//         expect(screen.getByText(day.toString())).toBeInTheDocument();
//       }
//     });
  
//     it("opens modal when a day is clicked", () => {
//       render(<BasicCalendar />);
//       const dayElement = screen.getByText("30"); // Assuming the last day of the month is clickable
//       fireEvent.click(dayElement);
//       expect(screen.getByTestId("eventTitle")).toHaveClass("modal-container"); // Assuming your modal has a CSS class "open" when it is open
//     });
});
