import { useEffect, useRef, useState } from 'react';

export function useLogging(message) {
	useEffect(() => {
		console.log(message);
	}, [message]);
}

function getLocalStorageValue(key) {
	const val = localStorage.getItem(key);
	if (!val) return null;
	try {
		return JSON.parse(val);
	} catch (e) {
		return null;
	}
}

function setLocalStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function usePersistentState(key, defaultState = '') {
	const [state, setState] = useState(getLocalStorageValue(key) || defaultState);

	useEffect(() => {
		setLocalStorage(key, state);
	});

	return [state, setState];
}

export function useUndo([state, setState]) {
	const history = useRef(state);
	const [index, setIndex] = useState(history.current.length - 1);

	function undo() {
		setIndex(Math.max(0, index - 1));
	}
	function redo() {
		setIndex(Math.min(history.current.length - 1, index + 1));
	}
	function newSetState(nextState) {
		const nextIndex = index + 1;
		// Truncate any future redos.
		history.current = history.current.slice(0, nextIndex);
		history.current[nextIndex] = nextState;
		setIndex(nextIndex);
		setState(nextState);
	}

	return [history.current[index], newSetState, undo, redo, history.current];
}
