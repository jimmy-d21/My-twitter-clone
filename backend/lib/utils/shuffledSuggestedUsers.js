const getShuffledSuggestedUser = (users) => {
  const shuffledSuggestedUser = [...users];
  for (let i = shuffledSuggestedUser.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledSuggestedUser[i], shuffledSuggestedUser[j]] = [
      shuffledSuggestedUser[j],
      shuffledSuggestedUser[i],
    ];
  }
  return shuffledSuggestedUser;
};

export default getShuffledSuggestedUser;
