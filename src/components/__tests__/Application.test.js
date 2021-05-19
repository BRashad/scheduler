import React from "react";

import {
	render,
	cleanup,
	waitForElement,
	fireEvent,
	getByText,
	prettyDOM,
	getAllByTestId,
	getByAltText,
	getByPlaceholderText,
	queryByText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Form", () => {
	it("changes the schedule when a new day is selected", async () => {
		const { getByText } = render(<Application />);

		await waitForElement(() => getByText("Monday"));

		fireEvent.click(getByText("Tuesday"));

		expect(getByText("Leopold Silvers")).toBeInTheDocument();
	});

	it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
		const { container, queryAllByAltText, debug } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));
		const appointments = getAllByTestId(container, "appointment");
		const appointment = appointments[1];

		fireEvent.click(queryAllByAltText("Add")[0]);

		fireEvent.change(getByPlaceholderText(container, /enter student name/i), {
			target: { value: "Lydia Miller-Jones" },
		});
		fireEvent.click(getByAltText(container, "Sven Jones"));

		fireEvent.click(getByText(container, "Save"));

		console.log(prettyDOM(appointment));
		debug();
		expect(getByText(container, "SAVING")).toBeInTheDocument();
		await waitForElement(() => getByText(container, "Lydia Miller-Jones"));
		//expect(getByText(appointment, "SAVING")).not.toBeInTheDocument();
	});
	// it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
	// 	const { container, debug } = render(<Application />);
	// 	await waitForElement(() => getByText(container, "Archie Cohen"));
	// 	const appointment = getAllByTestId(container, "appointment")[0];
	// 	// await waitForElement(() => getByText(container, "Lydia Miller-Jones"));
	// 	// await waitForElement(() => queryByText(container, "Lydia Miller-Jones"));
	// 	const appointments = getAllByTestId(container, "appointment");
	// 	//console.log(prettyDOM(appointments));
	// 	const addButton = getByAltText(container, "Add");
	// 	//console.log(prettyDOM(appointment));
	// 	console.log(prettyDOM(addButton));
	// 	fireEvent.click(addButton);

	// 	fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
	// 		target: { value: "Lydia Miller-Jones" },
	// 	});
	// 	fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

	// 	fireEvent.click(getByText(appointment, "Save"));
	// 	//	debug();
	// 	// expect(getByText(appointment, "SAVING")).toBeInTheDocument();
	// 	expect(getByText(appointment, "SAVING")).not.toBeInTheDocument();
	// });
});
