const Role = {
  get profile() {
    return localStorage.getItem('role');
  },

  isAdmin() {
    return this.profile === 'ADMIN';
  },

  isVisitor() {
    return this.profile === 'VISITOR';
  },

  columnActions() {
    return this.profile === 'ADMIN';
  },
};

export { Role };
