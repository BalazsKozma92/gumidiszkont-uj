function isAuthenticated() {
  const storedItem = localStorage.getItem('token');
  if (!storedItem) {
    return false;
  }

  // eslint-disable-next-line no-unused-vars
  const { value, expirationTime } = JSON.parse(storedItem);
  const currentTime = new Date().getTime();

  if (currentTime > expirationTime) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return false;
  }

  return true;
}

export const authGuard = (to, from, next) => {
  if (to.matched.some((record) => record.meta?.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ path: '/login'});
    } else {
      next();
    }
  } else {
    next();
  }
};
