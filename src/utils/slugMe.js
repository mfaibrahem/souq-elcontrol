const slugMe = str => {
	let toBeSlugified = str.toLowerCase();
	toBeSlugified = toBeSlugified.replace(/\s+/g, "-");
	toBeSlugified = toBeSlugified.replace(/&/g, "-and-");
	return toBeSlugified;
};

export default slugMe;
