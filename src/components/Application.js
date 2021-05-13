import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import axios from "axios";

const appointments = [
	{
		id: 1,
		time: "12pm",
	},
	{
		id: 2,
		time: "1pm",
		interview: {
			student: "Lydia Miller-Jones",
			interviewer: {
				id: 1,
				name: "Sylvia Palmer",
				avatar: "https://i.imgur.com/LpaY82x.png",
			},
		},
	},
	{
		id: 1,
		time: "13pm",
	},
	{
		id: 2,
		time: "3pm",
		interview: {
			student: "Lydia Miller-Jones",
			interviewer: {
				id: 1,
				name: "Sylvia Palmer",
				avatar: "https://i.imgur.com/LpaY82x.png",
			},
		},
	},
	{
		id: 1,
		time: "15pm",
	},
	{
		id: 2,
		time: "17pm",
		interview: {
			student: "Lydia Miller-Jones",
			interviewer: {
				id: 1,
				name: "Sylvia Palmer",
				avatar: "https://i.imgur.com/LpaY82x.png",
			},
		},
	},
];

export default function Application(props) {
	const [day, setDay] = useState("Monday");
	const [days, setDays] = useState([]);

	useEffect(() => {
		const myURL = "http://localhost:8001/api/days";
		axios.get(myURL).then((response) => {
			console.log(response);
		});
	}, [days]);

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
							<DayList days={days} day={day} setDay={setDay} />
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
				{appointments.map((appointment) => {
					return <Appointment key={appointment.id} {...appointment} />;
				})}
			</section>
		</main>
	);
}
