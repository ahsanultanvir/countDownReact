import { useEffect, useState } from "react";
import ShowTimer from "./ShowTimer";
import "../styles/CountDown.css";

function CountDownObject() {
	const [countDownTimer, setCountDownTimer] = useState({
		hour: 0,
		minute: 0,
		second: 0,
		totalSeconds: 0,
		timerStarted: false,
		timeFinished: false,
	});

	const { hour, minute, second, totalSeconds, timerStarted, timeFinished } = countDownTimer;

	const handleClick = () => {
		if (hour === 0 && minute === 0) return;
		setCountDownTimer({
			...countDownTimer,
			totalSeconds: hour * 3600 + minute * 60,
			timerStarted: true,
		});
	};

	const makeTwoDigit = (value) => {
		if (parseInt(value, 10) < 10 && value.length !== 2) return "0" + value;
		return value;
	};

	useEffect(() => {
        console.log('useEffect....');
		let timer;
		if (timerStarted && totalSeconds > 0) {
			timer = setInterval(() => {
				setCountDownTimer((prevState) => ({
					...prevState,
					totalSeconds: prevState.totalSeconds - 1,
				}));
			}, 100);
		} else if (timerStarted && totalSeconds === 0) {
            console.log('Clear Interval', { ...countDownTimer,
                second: 0,
                timeFinished: true,
                timerStarted: false,});
			const newCountDownTimer = countDownTimer;
            newCountDownTimer.second = 0;
            newCountDownTimer.timeFinished = true;
            newCountDownTimer.timerStarted = false;
            setCountDownTimer((prevState) => ({
                newCountDownTimer
                // ...prevState,
                // second: 0,
                // timeFinished: true,
                // timerStarted: false,
            }));
            // clearInterval(timer);
			// setCountDownTimer({
			// 	...countDownTimer,
			// 	second: 0,
			// 	timeFinished: true,
			// 	timerStarted: false,
			// });
            console.log(countDownTimer);
            clearInterval(timer);
		}

        setCountDownTimer({
            ...countDownTimer,
            hour: makeTwoDigit(Math.floor(totalSeconds / 3600)),
            minute: makeTwoDigit(
                Math.floor((totalSeconds % 3600) / 60)
            ),
            second: makeTwoDigit(totalSeconds % 60),
        })

		return () => {
			clearInterval(timer);
		};
	}, [totalSeconds, timerStarted]);

	return (
        
		<div className="container stop-watch">
			<h3>Count Down</h3>
			<hr />
			<label>Enter Hour: </label>
			<input
				type="number"
				value={hour}
				onChange={(event) =>
					setCountDownTimer({
						...countDownTimer,
						hour: event.target.value === NaN ? 0 : parseInt(event.target.value),
					})
				}
			/>
			<br />
			<br />
			<label>Enter Minute: </label>
			<input
				type="number"
				value={minute}
				onChange={(event) =>
					setCountDownTimer({
						...countDownTimer,
						minute: event.target.value == NaN ? 0 : parseInt(event.target.value),
					})
				}
			/>
			<br />
			<br />
			<button onClick={handleClick}>Start</button>
			<ShowTimer
				hour={makeTwoDigit(hour)}
				minute={makeTwoDigit(minute)}
				second={makeTwoDigit(second)}
			/>
            {/* <p>{countDownTimer.timerStarted ? "Started" : "Not Started"}</p>
            <p>{countDownTimer.timeFinished ? "Finished" : "Not Finished"}</p> */}
			{countDownTimer.timeFinished && <p className="time-up">Your time has run out!</p>}
            
		</div>
	);
}

export default CountDownObject;
