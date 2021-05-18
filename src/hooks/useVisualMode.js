import { useState } from "react";

const useVisualMode = function (initial) {
	let [history, setHistory] = useState([initial]);

	const transition = function (newMode, replace = false) {
		if (!replace) {
			setHistory((prev) => [...prev, newMode]);
		}
		setHistory((prev) => [...prev.slice(0, -1), newMode]);
	};

	const back = function () {
		if (history.length <= 1) {
			return;
		}
		setHistory((prev) => [...prev].slice(0, -1));
	};
	return { mode: history[history.length - 1], transition, back };
};

export default useVisualMode;
