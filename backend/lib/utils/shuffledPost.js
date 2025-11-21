const getShuffledPost = (posts) => {
  const shuffledPost = [...posts];
  for (let i = shuffledPost.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledPost[i], shuffledPost[j]] = [shuffledPost[j], shuffledPost[i]];
  }
  return shuffledPost;
};

export default getShuffledPost;
