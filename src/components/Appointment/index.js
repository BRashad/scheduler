import React from "react";

import { action } from "@storybook/addon-actions";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Form from "components/Appointment/Form.js";
import useVisualMode from "hooks/useVisualMode.js";
import Application from "components/Application.js";
import Status from "./Status";

export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	const SAVING = "SAVING";
	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);
	console.log("MODE", mode);
	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		transition(SAVING);
		props.bookInterview(props.id, interview).then((res) => transition(SHOW));
	}

	return (
		<article className='appointment'>
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SAVING && <Status mode={mode} />}
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					onEdit={action("onEdit")}
					onDelete={action("onDelete")}
				/>
			)}
			{mode === CREATE && (
				<Form interviewers={props.interviewers} onSave={save} onCancel={back} />
			)}
		</article>
	);
}
