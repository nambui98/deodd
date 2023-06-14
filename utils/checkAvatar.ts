export const checkAvatar = (avatar: number | undefined) => {
  switch (avatar) {
    case 0: return 'avatar-yellow';
    case 1: return 'avatar-orange';
    case 2: return 'avatar-pink';
    case 3: return 'avatar-violet';
    case 4: return 'avatar-green';
    default: return 'avatar-yellow'
  }
}
export const getPathAvatar = (avatarId: number | undefined) => {
  const basePath = '/assets/images';
  switch (avatarId) {
    case 0: return basePath + '/avatar-yellow.png';
    case 1: return basePath + '/avatar-orange.png';
    case 2: return basePath + '/avatar-pink.png';
    case 3: return basePath + '/avatar-violet.png';
    case 4: return basePath + '/avatar-green.png';
    default: return basePath + '/avatar-yellow.png'
  }
}

export const getPathAvatarNFT = (avatarId: string | undefined) => {
  const basePath = '/assets/images';
  switch (avatarId) {
    case "DIAMOND": return basePath + '/diamond.png';
    case "GOLD": return basePath + '/gold.png';
    case "BRONZE": return basePath + '/bronze.png';
    default: return basePath + '/bronze.png'
  }
}
