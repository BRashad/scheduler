import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Confirm from "components/Appointment/Confirm.js";
import Form from "components/Appointment/Form.js";
import Error from "components/Appointment/Error.js";
import useVisualMode from "hooks/useVisualMode.js";
//import Application from "components/Application.js";
import Status from "./Status";

export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	const SAVING = "SAVING";
	const DELETING = "DELETING";
	const CONFIRM = "CONFIRM";
	const EDITING = "EDIT";
	const ERROR_SAVE = "ERROR_SAVE";
	const ERROR_DELETE = "ERROR_DELETE";
	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		if (name === "") {
			return "Student name cannot be blank";
		}
		transition(SAVING);
		props
			.bookInterview(props.id, interview)
			.then((res) => transition(SHOW))
			.catch((error) => transition(ERROR_SAVE, true));
	}

	function deleting() {
		transition(DELETING, true);
		props
			.cancelInterview(props.id)
			.then((res) => transition(EMPTY))
			.catch((error) => transition(ERROR_DELETE, true));
	}

	return (
		<article className='appointment'>
			<Header time={props.time} />
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					onEdit={() => transition(EDITING)}
					onDelete={() => transition(CONFIRM)}
				/>
			)}
			{mode === CREATE && (
				<Form interviewers={props.interviewers} onSave={save} onCancel={back} />
			)}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SAVING && <Status mode={mode} />}
			{mode === CONFIRM && <Confirm onCancel={back} onConfirm={deleting} />}
			{mode === DELETING && <Status mode={mode} />}
			{mode === EDITING && (
				<Form
					interviewers={props.interviewers}
					name={props.interview.student}
					interviewer={props.interview.interviewer}
					onCancel={() => back()}
					onSave={save}
				/>
			)}
			{mode === ERROR_DELETE && (
				<Error message='Could not delete appointment' onClose={() => back()} />
			)}
			{mode === ERROR_SAVE && (
				<Error message='Could not save appointment' onClose={() => back()} />
			)}
		</article>
	);
}
