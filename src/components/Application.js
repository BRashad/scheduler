import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

// const appointments = [
// 	{
// 		id: 1,
// 		time: "12pm",
// 	},
// 	{
// 		id: 2,
// 		time: "1pm",
// 		interview: {
// 			student: "Lydia Miller-Jones",
// 			interviewer: {
// 				id: 1,
// 				name: "Sylvia Palmer",
// 				avatar: "https://i.imgur.com/LpaY82x.png",
// 			},
// 		},
// 	},
// 	{
// 		id: 1,
// 		time: "13pm",
// 	},
// 	{
// 		id: 2,
// 		time: "3pm",
// 		interview: {
// 			student: "Lydia Miller-Jones",
// 			interviewer: {
// 				id: 1,
// 				name: "Sylvia Palmer",
// 				avatar: "https://i.imgur.com/LpaY82x.png",
// 			},
// 		},
// 	},
// 	{
// 		id: 1,
// 		time: "15pm",
// 	},
// 	{
// 		id: 2,
// 		time: "17pm",
// 		interview: {
// 			student: "Lydia Miller-Jones",
// 			interviewer: {
// 				id: 1,
// 				name: "Sylvia Palmer",
// 				avatar: "https://i.imgur.com/LpaY82x.png",
// 			},
// 		},
// 	},
// ];

export default function Application(props) {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
	});

	const dailyAppointments = getAppointmentsForDay(state, state.day);
	const setDay = (day) => setState({ ...state, day });
	// const setDays = (days) => {
	// 	setState((prev) => ({ ...prev, days }));
	// };
	// const [day, setDay] = useState("Monday");

	// const [days, setDays] = useState([]);

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

			const [first, second, third] = all;

			console.log(first, second, third);
		});
	}, []);

	const listOfAppointments = dailyAppointments.map((appointment) => {
		return (
			<Appointment
				key={appointment.id}
				id={appointment.id}
				time={appointment.time}
				interview={appointment.interview}
			/>
		);
	});

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
				{listOfAppointments}
				{<Appointment key='last' time='5pm' />}
			</section>
		</main>
	);
}
