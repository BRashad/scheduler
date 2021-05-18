export function getAppointmentsForDay(state, day) {
	console.log("state.days", state.days);
	if (!state.days) {
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
//GET INTERVIEW

export function getInterview(state, interview) {
	if (!interview) {
		return null;
	}
	const interviewerId = interview.interviewer;
	const interviewer = state.interviewers[interviewerId];

	return { ...interview, interviewer };
}

//GET INTERVIEWER FOR THE DAY

export function getInterviewersForDay(state, day) {
	if (!state.days.length) {
		return [];
	}

	const interviewersArray = state.days.filter((days) => days.name === day);

	if (!interviewersArray.length) {
		return [];
	}

	const dayInterviewers = interviewersArray[0].interviewers.map((id) => {
		return state.interviewers[id];
	});

	return dayInterviewers;
}
