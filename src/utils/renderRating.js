import starFilled from "../assets/imgs/icons/star-filled.svg";
import starEmpty from "../assets/imgs/icons/star-empty.svg";

const constructArrFromNumber = num => {
	const arr = [];
	for (let i = 1; i <= num; i++) {
		arr.push(i);
	}
	return arr;
};

// rate = 4 => [1, 2, 3, 4]
// default rate = 5 => [1, 2, 3, 4, 5]

const renderRating = (defaultRate, actualRate) => {
	const defaultRateArray = constructArrFromNumber(defaultRate);
	const actualRateArray = constructArrFromNumber(actualRate);

	return defaultRateArray.map((val, index) => {
		if (val !== actualRateArray[index]) {
			return <img key={index} src={starEmpty} alt="empty star" />;
		}
		return <img key={index} src={starFilled} alt="filled star" />;
	});
};

export default renderRating;
