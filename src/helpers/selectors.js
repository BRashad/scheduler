export function getAppointmentsForDay(state, day) {
	if (!state.days.length) {
		return [];
	}
	const filteredDays = state.days.filter((days) => days.name === day);

	if (!filteredDays.length) {
		return [];
	}
	const dayAppointments = filteredDays[0].appointments.map((id) => {
		return state.appointments[id];
	});

	return dayAppointments;
}

export function getInterview(state, interview) {
	if (!interview) {
		return null;
	}
	const interviewerId = interview.interviewer;
	const interviewer = state.interviewers[interviewerId];

	return { ...interview, interviewer };
}
