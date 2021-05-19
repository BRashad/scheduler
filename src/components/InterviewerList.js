import React from "react";
import PropTypes from "prop-types";

import InterviewerListItem from "components/InterviewerListItem.js";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
	if (props.interviewers) {
		return (
			<section className='interviewers'>
				<h4 className='interviewers__header text--light'>Interviewer</h4>
				<ul className='interviewers__list'>
					{props.interviewers.map((item) => (
						<InterviewerListItem
							key={item.id}
							name={item.name}
							avatar={item.avatar}
							selected={item.id === props.value}
							setInterviewer={() => {
								props.onChange(item.id);
							}}
						/>
					))}
				</ul>
			</section>
		);
	}
	return <div></div>;
}

InterviewerList.propTypes = {
	interviewers: PropTypes.array.isRequired,
};
