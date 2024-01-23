import "../styles/CountDown.css";

function ShowTimer({ hour, minute, second }) {
	console.log("ShowTimer....");
	return (
		<div className="show">
			{hour} : {minute} : {second}{" "}
		</div>
	);
}

export default ShowTimer;
