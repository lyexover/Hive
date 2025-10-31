'use server'

import postgres from 'postgres';
const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

export async function AddToRoom(userID, roomID) {
  try {
    // Vérifier si l'utilisateur est déjà membre de la room
    const existing = await sql`
      SELECT 1 FROM room_members 
      WHERE user_id = ${userID} AND room_id = ${roomID}
      LIMIT 1
    `;

    if (existing.length > 0) {
      return { success: false, message: 'L’utilisateur est déjà membre de cette room.' };
    }

    // Ajouter le membre à la room
    await sql`
      INSERT INTO room_members (user_id, room_id)
      VALUES (${userID}, ${roomID})
    `;

    return { success: true, message: 'Utilisateur ajouté avec succès à la room.' };

  } catch (err) {
    console.error('Erreur lors de l’ajout à la room:', err);
    return { success: false, message: 'Erreur serveur lors de l’ajout à la room.' };
  }
}
