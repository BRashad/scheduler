import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "components/DayListItem";

storiesOf("Button", module)
	.addParameters({
		backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
	})
	.add("Base", () => <Button>Base</Button>)
	.add("Confirm", () => <Button confirm>Confirm</Button>)
	.add("Danger", () => <Button danger>Cancel</Button>)
	.add("Clickable", () => (
		<Button onClick={action("button-clicked")}>Clickable</Button>
	))
	.add("Disabled", () => (
		<Button disabled onClick={action("button-clicked")}>
			Disabled
		</Button>
	));

export default function DayListItem(props) {
	return (
		<li>
			<h2 className='text--regular'>Day Name</h2>
			<h3 className='text--light'>X spots remaining</h3>
		</li>
	);
}
