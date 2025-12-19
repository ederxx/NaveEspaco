

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uid = "MuDPgrEI5teHH2BkXEtvjFqRiYx2";

async function setAdmin() {
  try {
    await admin.auth().setCustomUserClaims(uid, {
      admin: true,
    });

    console.log(`✅ Usuário ${uid} agora é ADMIN`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao definir admin:", error);
    process.exit(1);
  }
}

setAdmin();
