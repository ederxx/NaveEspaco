import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Rocket, Eye, EyeOff, Loader2 } from "lucide-react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/integrations/firebase/client";
import { MASTER_PASSWORD } from "@/config/app";
import { toast } from "sonner";
import logoEspaconave from "@/assets/logo-espaconave.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showMasterPassword, setShowMasterPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Navigation is now handled in handleSubmit
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    if (isSignUp) {
if (password !== confirmPassword) {
  toast.error("As senhas não coincidem");
  setIsLoading(false);
  return;
}

   if (password.length < 6) {
  toast.error("A senha deve ter pelo menos 6 caracteres");
  setIsLoading(false);
  return;
} 

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // ⚠️ Sempre cria como member (admin vem via Custom Claim)
  const role =
  masterPassword && masterPassword === MASTER_PASSWORD
    ? "admin"
    : "member";

await setDoc(doc(db, "users", userCredential.user.uid), {
  role,
  createdAt: new Date().toISOString(),
});

      toast.success("Conta criada com sucesso!");
      navigate("/admin");
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login realizado com sucesso!");
      navigate("/admin");
    }
  } catch (error: any) {
    console.error("Firebase Auth Error:", error.code, error.message);

    switch (error.code) {
 case "auth/email-already-in-use":
  toast.error("Este email já está cadastrado. Faça login.");
  setIsSignUp(false);
  break;

      case "auth/user-not-found":
        toast.error("Usuário não encontrado");
        break;

      case "auth/wrong-password":
        toast.error("Senha incorreta");
        break;

      case "auth/invalid-login-credentials":
        toast.error("Email ou senha inválidos");
        break;

      case "auth/invalid-email":
        toast.error("Email inválido");
        break;

      default:
        toast.error("Erro ao autenticar. Tente novamente.");
    }
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground/30 rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24 relative z-10">
        <div className="max-w-md w-full mx-auto">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft size={16} />
            Voltar ao site
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-8">
              <img
                src={logoEspaconave}
                alt="Espaço Nave"
                className="w-20 h-20 rounded-2xl object-cover shadow-glow"
              />
              <div>
                <span className="font-display text-2xl font-bold text-gradient-lime uppercase tracking-wider">
                  Espaço Nave
                </span>
                <p className="text-sm text-muted-foreground mt-1">Studio de Produção</p>
              </div>
            </div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold mb-3">
              {isSignUp ? "Criar sua conta" : "Bem-vindo de volta"}
            </h1>
            <p className="text-muted-foreground">
              {isSignUp
                ? "Preencha os dados abaixo para criar sua conta."
                : "Acesse sua conta para gerenciar suas produções e agenda."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-secondary border-border focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                {!isSignUp && (
                  <a
                    href="#"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Esqueceu a senha?
                  </a>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-secondary border-border focus:border-primary pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 bg-secondary border-border focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="masterPassword">Senha Mestre (Opcional)</Label>
                  <div className="relative">
                    <Input
                      id="masterPassword"
                      type={showMasterPassword ? "text" : "password"}
                      placeholder="Digite a senha mestre para criar admin"
                      value={masterPassword}
                      onChange={(e) => setMasterPassword(e.target.value)}
                      className="h-12 bg-secondary border-border focus:border-primary pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowMasterPassword(!showMasterPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showMasterPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Deixe em branco para criar usuário comum
                  </p>
                </div>
              </>
            )}

            <Button
              type="submit"
              variant="lime"
              size="lg"
              className="w-full h-12 mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  {isSignUp ? "Criando conta..." : "Entrando..."}
                </>
              ) : (
                <>
                  <Rocket size={18} />
                  {isSignUp ? "Criar conta" : "Entrar"}
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {isSignUp ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setPassword("");
                setConfirmPassword("");
                setMasterPassword("");
              }}
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              {isSignUp ? "Fazer login" : "Criar conta"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-space" />
        
        {/* Animated stars */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-foreground/50 rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Central logo */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150" />
            <img
              src={logoEspaconave}
              alt="Espaço Nave"
              className="w-64 h-64 rounded-3xl object-cover shadow-glow relative z-10"
            />
          </div>
          
          <blockquote className="max-w-md text-center mt-12">
            <p className="font-display text-xl lg:text-2xl font-medium italic text-foreground/90 mb-4">
              "A música é a linguagem universal do cosmos."
            </p>
            <footer className="text-primary font-medium">
              — Espaço Nave Studio
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Login;
