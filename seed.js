import { collection, addDoc } from "firebase/firestore";
import { db } from "./src/integrations/firebase/client";

async function seedDatabase() {
  try {
    console.log("Iniciando seed do banco de dados...");

    // Adicionar alguns artistas de exemplo
    const artistsRef = collection(db, "artists");
    await addDoc(artistsRef, {
      name: "João Silva",
      stage_name: "DJ João",
      bio: "DJ e produtor musical especializado em música eletrônica",
      photo_url: null,
      genres: ["Eletrônica", "House"],
      featured: true,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    });

    await addDoc(artistsRef, {
      name: "Maria Santos",
      stage_name: "MC Maria",
      bio: "Cantora e compositora de pop e R&B",
      photo_url: null,
      genres: ["Pop", "R&B"],
      featured: false,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    });

    // Adicionar uma produção de exemplo
    const productionsRef = collection(db, "productions");
    await addDoc(productionsRef, {
      title: "Álbum de Estreia",
      description: "Primeiro álbum do artista João Silva",
      production_type: "music",
      status: "in_progress",
      user_id: "admin",
      created_at: new Date(),
      updated_at: new Date()
    });

    console.log("Seed concluído com sucesso!");
  } catch (error) {
    console.error("Erro durante o seed:", error);
  }
}

seedDatabase();