import React from "react";
import InterviewerListItem from "components/InterviewerListItem.js";
import classNames from "classnames";
import 'components/InterviewerList.scss'

export default function InterviewList(props) {

return(
	<section className='interviewers'>
		<h4 className='interviewers__header text--light'>Interviewer</h4>
		<ul className='interviewers__list'>
				{props.interviewers.map((item) => (	
					<InterviewerListItem
						key={item.id}
						name={item.name}
						avatar={item.avatar}
						selected={item.id === props.interviewer}
						setInterviewer={item.setInterviewer}
					/>
			))}
		</ul>
 </section>
)
}
