import React from "react";

import { action } from "@storybook/addon-actions";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";

export default function Appointment(props) {
	return (
		<article className='appointment'>
			<Header time={props.time} />
			{props.interview ? (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					onEdit={action("onEdit")}
					onDelete={action("onDelete")}
				/>
			) : (
				<Empty />
			)}
		</article>
	);
}
