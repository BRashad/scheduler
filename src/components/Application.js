import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import useApplicationData from "hooks/useApplicationData";
import axios from "axios";
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from "helpers/selectors";
import InterviewerListItem from "components/InterviewerListItem";

export default function Application(props) {
	const { state, setDay, bookInterview, cancelInterview } =
		useApplicationData();

	const dailyAppointments = getAppointmentsForDay(state, state.day);

	const schedule = dailyAppointments.map((appointment) => {
		return (
			<Appointment
				key={appointment.id}
				id={appointment.id}
				time={appointment.time}
				interview={getInterview(state, appointment.interview)}
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
