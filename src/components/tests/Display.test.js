import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Display from "./../Display";

import mockFetchShow from "./../../api/fetchShow";
import { wait } from "@testing-library/user-event/dist/utils";
jest.mock("./../../api/fetchShow");

const testShowData = {
  name: "test show",
  summary: "test summary",
  seasons: [
    {
      id: 0,
      name: "season 1",
      episodes: [],
    },
    {
      id: 1,
      name: "season 2",
      episodes: [],
    },
    {
      id: 2,
      name: "season 3",
      episodes: [],
    },
  ],
};

test("renders without errors with no props", () => {
  render(<Display />);
});

test("renders Show component when the button is clicked ", async () => {
  mockFetchShow.mockResolvedValueOnce(testShowData);

  render(<Display />);
  const button = screen.getByRole("button");
  userEvent.click(button);

  const show = await screen.findByTestId("show-container");
  expect(show).toBeInTheDocument();
});

test("renders show season options matching your data when the button is clicked", async () => {
  mockFetchShow.mockResolvedValueOnce(testShowData);

  render(<Display />);
  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    const seasonOptions = screen.queryAllByTestId("season-option");
    expect(seasonOptions).toHaveLength(3);
  });
});

test("displayFunc is called when the fetch button is pressed", async () => {
  mockFetchShow.mockResolvedValueOnce(testShowData);

  const displayFunc = jest.fn();

  render(<Display displayFunc={displayFunc} />);
  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    expect(displayFunc).toHaveBeenCalled();
  });
});

// ### The Display Component

// > _This component holds the state values of the application and handles api calls. In this component's tests, you work with mocking external modules and working with async / await / waitFor_

// - [ ] Test that the Display component renders without any passed in props.
// - [ ] Rebuild or copy the show test data element as used in the previous set of tests.
// - [ ] Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
// - [ ] Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
// - [ ] Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
