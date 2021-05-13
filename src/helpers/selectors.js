export function getAppointmentsForDay(state, day) {
	//... returns an array of appointments for that day
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
	//console.log("ARRAY", filteredDays);
	return dayAppointments;
}
