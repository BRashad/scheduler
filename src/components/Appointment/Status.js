import React from "react";

export default function Status(props) {
	return (
		<main className='appointment__card appointment__card--status'>
			<img
				onLoad={props.onLoad}
				className='appointment__status-image'
				src='images/status.png'
				alt='Loading'
			/>
			<h1 className='text--semi-bold'>Deleting</h1>
		</main>
	);
}
