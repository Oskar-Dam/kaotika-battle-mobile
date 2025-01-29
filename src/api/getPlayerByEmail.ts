export const getPlayerByEmail = async (email: string) => {
  const response = await fetch(`https://kaotika-battle-server.onrender.com/api/player/${email}`);

  if (!response.ok) {
    if (response.status === 500) {
      throw new Error('Email not found');
    } else {
      throw new Error('Failed to fetch player data');
    }
  }

  const playerData = await response.json();
  return playerData.data;
};
