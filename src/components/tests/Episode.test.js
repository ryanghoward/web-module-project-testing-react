import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Episode from "./../Episode";

const testEpisode = {
  id: 1,
  name: "",
  image:
    "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
  season: 1,
  number: 1,
  summary: "test summary",
  runtime: 1,
};

const testEpisodeNoImage = {
  id: 1,
  name: "",
  season: 1,
  number: 1,
  summary: "test summary",
  runtime: 1,
};

test("renders without error", () => {
  render(<Episode episode={testEpisode} />);
});

test("renders the summary test passed as prop", () => {
  render(<Episode episode={testEpisode} />);
  const summary = screen.queryByText(/test summary/i);
  expect(summary).toBeInTheDocument();
  expect(summary).toBeTruthy();
  expect(summary).toHaveTextContent("test summary");
});

test("renders default image when image is not defined", () => {
  render(<Episode episode={testEpisodeNoImage} />);
  const image = screen.queryByAltText(
    "https://i.ibb.co/2FsfXqM/stranger-things.png"
  );
  expect(image).toBeInTheDocument();
});

// #### The Episode Component

// > _This component displays a single episode worth of data. To test it, let's try our some different varieties on what we should pass into our component's props._

// - [ ] Complete a test that shows the Episode component renders. Pass in the provided example episode data as a test prop.
// - [ ] Modify the test data to display a specific summary statement. Complete a test that shows that the summary value passed in to the Episode component displays as expected. **Use at least then 3 different types of expect statements to test the the existence of the summary value.**
// - [ ] The episode component displays a default value ('./stranger_things.png') when a image url is not provided. Create a new piece of test data with the image property set to `null`. Test that the alt tag of the image displayed is set to './stranger_things.png'.
