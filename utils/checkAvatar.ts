export const checkAvatar = (avatar: number) => {
  switch (avatar) {
    case 0: return 'avatar-yellow';
    case 1: return 'avatar-orange';
    case 2: return 'avatar-pink';
    case 3: return 'avatar-violet';
    case 4: return 'avatar-green';
  }
}