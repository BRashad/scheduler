import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
	const dayItem = props.days.map((day) => (
		<li>
			<DayListItem
				key={day.id}
				name={day.name}
				spots={day.spots}
				selected={day.name === props.day}
				setDay={props.setDay}
			/>
		</li>
	));

	return <ul>{dayItem}</ul>;
}
