export const getVoteMap = (votes) => {
	const map = {};
	votes.forEach((vote) => {
		if (map[vote.option]) {
			map[vote.option].push(vote.user);
		} else {
			map[vote.option] = [vote.user];
		}
	});
	return map;
};
