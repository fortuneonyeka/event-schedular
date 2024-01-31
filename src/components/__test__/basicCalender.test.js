import React from "react";
import { render, screen } from "@testing-library/react";
import BasicCalendar from "../basicCalendat/BasicCalendar";

import Modal from "../modal/Modal";

describe("BasicCalendar", () => {
  it("renders without crashing", () => {
    render(<BasicCalendar />);
  });

  it("displays current month and year", () => {
    render(<BasicCalendar />);
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", {
      month: "long",
    });
    const currentYear = currentDate.getFullYear();
    expect(
      screen.getByText(`${currentMonth} ${currentYear}`)
    ).toBeInTheDocument();
  });

  it("displays weekdays", () => {
    render(<BasicCalendar />);
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekdays.forEach((weekday) => {
      expect(screen.getByText(weekday)).toBeInTheDocument();
    });
  });

  it("renders a modal component", () => {
    render(<Modal />);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
});
