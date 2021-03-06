import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
	if (props.days.length) {
		const dayItem = props.days.map((day) => (
			<DayListItem
				key={day.id}
				name={day.name}
				spots={day.spots}
				selected={day.name === props.day}
				setDay={props.setDay}
			/>
		));

		return <ul>{dayItem}</ul>;
	} else {
		return null;
	}

}
