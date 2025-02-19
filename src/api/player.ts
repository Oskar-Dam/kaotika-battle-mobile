
export const getPlayerByEmail = async (email: string) => {
  console.log('Fetching player data for email:', email);
  const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/api/player/${email.toLowerCase()}`);

  if (!response.ok) {
    if (response.status === 500) {
      throw new Error('Email not found');
    } else if (response.status === 403) {
      throw new Error('Game already started');
    } else if (response.status === 409) {
      throw new Error('User already logged in');
    } else {
      throw new Error('Failed to fetch player data');
    }
  }

  const playerData = await response.json();
  console.log('Player data:', playerData);
  return playerData.data;
};
