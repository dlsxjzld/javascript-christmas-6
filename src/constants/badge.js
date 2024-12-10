const MIN_STAR = 5_000;
const MAX_STAR = 10_000;
const MIN_TREE = 10_000;
const MAX_TREE = 20_000;
const MIN_SANTA = 20_000;

const BADGE = {
  STAR: '별',
  TREE: '트리',
  SANTA: '산타',
  DEFAULT: '없음',
};

export const getBadge = (price) => {
  if (price >= MIN_STAR && price < MAX_STAR) {
    return BADGE.STAR;
  }
  if (price >= MIN_TREE && price < MAX_TREE) {
    return BADGE.TREE;
  }
  if (price >= MIN_SANTA) {
    return BADGE.SANTA;
  }

  return BADGE.DEFAULT;
};
