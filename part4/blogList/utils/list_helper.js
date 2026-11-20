const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((accumulator, current) => {
    if (typeof current.likes === 'number') return accumulator + current.likes;
    return accumulator;
  }, 0);
};

export default { dummy, totalLikes };
