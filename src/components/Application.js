import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import axios from "axios";
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from "helpers/selectors";
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
		Promise.all([
			axios.get("http://localhost:8001/api/days"),
			axios.get("http://localhost:8001/api/appointments"),
			axios.get("http://localhost:8001/api/interviewers"),
		]).then((all) => {
			setState((prev) => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));
		});
	}, []);
	const dailyAppointments = getAppointmentsForDay(state, state.day);

	const schedule = dailyAppointments.map((appointment) => {
		const interview = getInterview(state, appointment.interview);

		const bookInterview = (id, interview) => {
			const appointment = {
				...state.appointments[id],
				interview: { ...interview },
			};
			const appointments = {
				...state.appointments,
				[id]: appointment,
			};

			return axios
				.put(`http://localhost:8001/api/appointments/${id}`, { interview })
				.then((res) => {
					setState({ ...state, appointments });
				});
		};

		const cancelInterview = (id) => {
			const appointment = {
				...state.appointments[id],
				interview: null,
			};

			const appointments = {
				...state.appointments,
				[id]: appointment,
			};
			return axios
				.delete(`http://localhost:8001/api/appointments/${id}`)
				.then((res) => {
					setState({ ...state, appointments });
				});
		};

		return (
			<Appointment
				key={appointment.id}
				id={appointment.id}
				time={appointment.time}
				interview={interview}
				bookInterview={bookInterview}
				cancelInterview={cancelInterview}
				interviewers={getInterviewersForDay(state, state.day)}
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
				{schedule}
				{<Appointment key='last' time='5pm' />}
			</section>
		</main>
	);
}
