import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./src/integrations/firebase/client";

async function clearDatabase() {
  try {
    console.log("Limpando banco de dados...");

    // Limpar user_roles
    const userRolesSnapshot = await getDocs(collection(db, "user_roles"));
    for (const docSnap of userRolesSnapshot.docs) {
      await deleteDoc(doc(db, "user_roles", docSnap.id));
    }

    // Limpar artists
    const artistsSnapshot = await getDocs(collection(db, "artists"));
    for (const docSnap of artistsSnapshot.docs) {
      await deleteDoc(doc(db, "artists", docSnap.id));
    }

    // Limpar productions
    const productionsSnapshot = await getDocs(collection(db, "productions"));
    for (const docSnap of productionsSnapshot.docs) {
      await deleteDoc(doc(db, "productions", docSnap.id));
    }

    console.log("Banco de dados limpo!");
  } catch (error) {
    console.error("Erro ao limpar banco:", error);
  }
}

clearDatabase();