interface currentProps {
  walletAddress: string
}

export const UserService = {
  getCurrentUser: () => {
    const userInfo = localStorage.getItem('user');
    if(userInfo) return JSON.parse(userInfo);
  },
  setCurrentUser: (userInfo: string) => {
    return localStorage.setItem('user', JSON.stringify(userInfo));
  },
  removeCurrentUser: () => {
    return localStorage.removeItem('user');
  }
}
