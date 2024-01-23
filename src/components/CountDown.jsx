import { useEffect, useState } from "react";
import ShowTimer from "./ShowTimer";
import '../styles/CountDown.css';

function CountDown() {
	const [minute, setMinute] = useState(0);
	const [hour, setHour] = useState(0);
	const [second, setSecond] = useState(0);
	const [totalSeconds, setTotalSeconds] = useState(0);
	const [timerStarted, setTimerStarted] = useState(false);
	const [timeFinished, setTimeFinished] = useState(false);

	// console.log("Countdown....");

	const handleClick = () => {
		if (hour === 0 && minute === 0) return;
		setTotalSeconds(hour * 3600 + minute * 60);
		setTimerStarted(true);
	};

	const makeTwoDigit = (value)=>{
		// console.log(value, value.length);
		if(parseInt(value, 10) < 10 && value.length!=2) return '0'+value;
		// if(value.length < 2){
		// 	console.log('lenght 1...');
		// 	return '0'+value;
		// }
		return value;
	};

	useEffect(() => {
		// console.log('useEffect.....');
		let timer;
		if (timerStarted && totalSeconds > 0) {
			timer = setInterval(() => {
				setTotalSeconds((prevState) => prevState - 1);
				setHour(makeTwoDigit(Math.floor(totalSeconds/3600)));
				setMinute(makeTwoDigit(Math.floor((totalSeconds%3600)/60)));
				setSecond(makeTwoDigit(totalSeconds%60));
			}, 1000);
		} else if (timerStarted && totalSeconds === 0) {
			// console.log('else if...');
			clearInterval(timer);
			setSecond(0);
			setTimerStarted(false);
			setTimeFinished(true);
		}

        return()=>{
            clearInterval(timer);
        }
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
					setHour(event.target.value === NaN ? 0 : parseInt(event.target.value))
				}
			></input>
			<br />
			<br />
			<label>Enter Minute: </label>
			<input
				type="number"
				value={minute}
				onChange={(event) =>
					setMinute(
						event.target.value === NaN ? 0 : parseInt(event.target.value)
					)
				}
			></input>
			<br />
			<br />
			<button onClick={handleClick}>Start</button>
			<ShowTimer
				// hour={Math.floor(totalSeconds / 3600)}
				// minute={Math.floor((totalSeconds % 3600) / 60)}
				// second={totalSeconds % 60}
                // hour={hour} minute={minute} second={second}
				hour={makeTwoDigit(hour)} minute={makeTwoDigit(minute)} second={makeTwoDigit(second)}
			/>
			{timeFinished && <p className="time-up">Your time has run out!</p>}
			{/* <div>{hour} : {minute} : {second} </div> */}
		</div>
	);
}

export default CountDown;
