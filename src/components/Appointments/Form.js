import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
	const [input, setInput] = useState("hi");

	return (
		<main className='appointment__card appointment__card--create'>
			<section className='appointment__card-left'>
				<form autoComplete='off'>
					<input
						className='appointment__create-input text--semi-bold'
						name='name'
						type='text'
						placeholder='Enter Student Name'
						/*
          This must be a controlled component
						
        */
						value={input}
						onChange={(event) => {
							setInput(event.target.value);
						}}
					/>
				</form>
				<InterviewerList
					interviewers={props.interviewers}
					value={props.value}
					onChange={props.id}
				/>
			</section>
			<section className='appointment__card-right'>
				<section className='appointment__actions'>
					<Button danger onClick={props.onCancel}>
						Cancel
					</Button>
					<Button confirm onClick={props.onSave}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}