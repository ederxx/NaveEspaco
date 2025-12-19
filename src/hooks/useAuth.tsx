import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, getIdTokenResult } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/integrations/firebase/client";

type UserRole = "admin" | "member" | "visitor" | "guest";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  userRole: UserRole | null;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        await fetchUserRole(firebaseUser.uid);
      } else {
        setUserRole(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      const userRoleDoc = await getDoc(doc(db, "users", userId));
      if (userRoleDoc.exists()) {
        const role = userRoleDoc.data().role as UserRole;
        setUserRole(role);
      } else {
        // Verificar se é o primeiro usuário (admin)
        const { collection, getDocs, query } = await import("firebase/firestore");
        const rolesQuery = query(collection(db, "users"));
        const rolesSnapshot = await getDocs(rolesQuery);

        const isFirstUser = rolesSnapshot.empty;
        const role = isFirstUser ? "admin" : "member";

        await setDoc(doc(db, "users", userId), { role });
        setUserRole(role);

        // Inicializar dados padrão para o primeiro usuário
        if (isFirstUser) {
          await initializeDefaultData(userId);
        }
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      setUserRole("member");
    }
  };

  const initializeDefaultData = async (userId: string) => {
    try {
      // Verificar se já existem dados
      const artistsQuery = await getDoc(doc(db, "artists", "init-check"));
      if (!artistsQuery.exists()) {
        console.log("Inicializando dados padrão...");

        // Criar alguns artistas de exemplo
        const { collection, addDoc } = await import("firebase/firestore");
        const artistsRef = collection(db, "artists");

        await addDoc(artistsRef, {
          name: "João Silva",
          stage_name: "DJ João",
          bio: "DJ e produtor musical especializado em música eletrônica",
          photo_url: null,
          genres: ["Eletrônica", "House"],
          featured: true,
          is_active: true,
          profile_id: userId,
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
          profile_id: userId,
          created_at: new Date(),
          updated_at: new Date()
        });

        console.log("Dados padrão inicializados!");
      }
    } catch (error) {
      console.error("Erro ao inicializar dados padrão:", error);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setUserRole(null);
  };

  const value = {
    user,
    isLoading,
    userRole,
    isAdmin: userRole === "admin",
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
