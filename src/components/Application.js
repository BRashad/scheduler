import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
// import InterviewerListItem from "components/InterviewerListItem";

export default function Application(props) {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	const setDay = (day) => setState({ ...state, day });

	useEffect(() => {
		const days = "http://localhost:8001/api/days";
		const appointments = "http://localhost:8001/api/appointments";
		const interviewers = "http://localhost:8001/api/interviewers";

		Promise.all([
			axios.get(days),
			axios.get(appointments),
			axios.get(interviewers),
		]).then((all) => {
			//console.log("ALL", all);
			setState((prev) => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));

			//const [first, second, third] = all;

			//console.log(first, second, third);
		});
	}, []);
	const dailyAppointments = getAppointmentsForDay(state, state.day);

	const schedule = dailyAppointments.map((appointment) => {
		const interview = getInterview(state, appointment.interview);
		console.log("interview", interview);
		return (
			<Appointment
				key={appointment.id}
				id={appointment.id}
				time={appointment.time}
				interview={interview}
			/>
		);
	});

	console.log("state.interviewers", state.interviewers);

	return (
		<main className='layout'>
			<section className='sidebar'>
				{
					<div>
						<img
							className='sidebar--centered'
							src='images/logo.png'
							alt='Interview Scheduler'
						/>
						<hr className='sidebar__separator sidebar--centered' />
						<nav className='sidebar__menu'>
							<DayList days={state.days} day={state.day} setDay={setDay} />
						</nav>
						<img
							className='sidebar__lhl sidebar--centered'
							src='images/lhl.png'
							alt='Lighthouse Labs'
						/>
					</div>
				}
			</section>
			<section className='schedule'>
				{schedule}
				{<Appointment key='last' time='5pm' />}
			</section>
		</main>
	);
}
