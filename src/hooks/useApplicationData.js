import React, { useState, useEffect } from "react";

import "components/Application.scss";
// import DayList from "components/DayList.js";
// import Appointment from "components/Appointment";
import axios from "axios";
// import {
// 	getAppointmentsForDay,
// 	getInterview,
// 	getInterviewersForDay,
// } from "helpers/selectors";
// import InterviewerListItem from "components/InterviewerListItem";

export default function useApplicationData() {
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

	const updateSpots = (appointment, amount) => {
		let newDays = [];
		for (const day of state.days) {
			let newDay = day;
			for (const appointmentId of day.appointments) {
				if (appointmentId === appointment) {
					newDay = { ...newDay, spots: (newDay.spots += amount) };
				}
			}
			newDays.push(newDay);
		}
		return newDays;
	};

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
			.then(async (res) => {
				const newDays = updateSpots(id, -1);
				setState({
					...state,
					appointments,
					days: newDays,
				});
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
				const newDays = updateSpots(id, 1);
				setState({ ...state, appointments, days: newDays });
			});
	};

	return { state, setDay, bookInterview, cancelInterview };
}
