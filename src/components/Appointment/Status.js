import React from "react";

export default function Status(props) {
	console.log("PROPS", props.mode);
	return (
		<main className='appointment__card appointment__card--status'>
			<img
				onLoad={props.onLoad}
				className='appointment__status-image'
				src='images/status.png'
				alt='Loading'
			/>
			<h1 className='text--semi-bold'>{props.mode}</h1>
		</main>
	);
}
