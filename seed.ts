import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const UID_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function genUid(): string {
  return Array.from(
    { length: 12 },
    () => UID_CHARS[Math.floor(Math.random() * UID_CHARS.length)]
  ).join("");
}

async function uniqueUid(): Promise<string> {
  let uid = genUid();
  for (;;) {
    const taken = await prisma.user.findFirst({
      where: { OR: [{ uid }, { referralCode: uid }] },
    });
    if (!taken) return uid;
    uid = genUid();
  }
}

async function main() {
  try {
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "admin" },
    });

    if (existingAdmin) {
      console.log("\n==================================");
      console.log("Admin already exists!");
      console.log("Email:", existingAdmin.email);
      console.log("Password:", existingAdmin.plainPassword || "Admin@1234");
      console.log("UID:", existingAdmin.uid);
      console.log("Referral Code:", existingAdmin.referralCode);
      console.log("==================================\n");
      return;
    }

    const adminUid = await uniqueUid();

    const admin = await prisma.user.create({
      data: {
        email: "admin@duexai.com",
        password: "Admin@1234",
        plainPassword: "Admin@1234",
        name: "System Admin",
        role: "admin",
        uid: adminUid,
        referralCode: adminUid,
        emailVerified: new Date(),
        phoneVerified: new Date(),
        balance: 1_000_000,
      },
    });

    console.log("\n==================================");
    console.log("Root admin seeded perfectly!");
    console.log("Email:", admin.email);
    console.log("Password:", admin.plainPassword);
    console.log("UID:", admin.uid);
    console.log("Referral Code:", admin.referralCode);
    console.log("==================================\n");
  } catch (e: unknown) {
    console.error("Error seeding database:", e instanceof Error ? e.message : e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
