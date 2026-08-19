import { PrismaClient } from "@prisma/client";

// Neon's pooler URL doesn't accept direct TCP connections from local scripts.
// Strip "-pooler" from the hostname to use the direct connection instead.
const directUrl = (process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "").replace(
  /-pooler(\.[^:]+)/,
  "$1"
);

const prisma = new PrismaClient({ datasources: { db: { url: directUrl } } });

const UID_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function genUid(): string {
  return Array.from(
    { length: 12 },
    () => UID_CHARS[Math.floor(Math.random() * UID_CHARS.length)]
  ).join("");
}

async function uniqueUid(taken: Set<string>): Promise<string> {
  let uid = genUid();
  while (taken.has(uid)) {
    uid = genUid();
  }
  // Also verify against DB in case of collisions with already-migrated users
  let exists = await prisma.user.findUnique({ where: { uid } });
  while (exists) {
    uid = genUid();
    exists = await prisma.user.findUnique({ where: { uid } });
  }
  taken.add(uid);
  return uid;
}

async function main() {
  const allUsers = await prisma.user.findMany({
    select: { id: true, uid: true, email: true },
  });

  // Target users whose UID is null or matches the old 4-digit pattern
  const users = allUsers.filter(
    (u) => u.uid === null || /^\d{1,6}$/.test(u.uid)
  );

  if (users.length === 0) {
    console.log("No users need UID migration.");
    return;
  }

  console.log(`Migrating ${users.length} user(s)...\n`);

  const taken = new Set<string>();
  let updated = 0;
  let failed = 0;

  for (const user of users) {
    try {
      const newUid = await uniqueUid(taken);
      await prisma.user.update({
        where: { id: user.id },
        data: { uid: newUid },
      });
      console.log(`  ✓  ${user.email ?? user.id}  ${user.uid ?? "null"} → ${newUid}`);
      updated++;
    } catch (err) {
      console.error(`  ✗  ${user.email ?? user.id}  failed:`, err);
      failed++;
    }
  }

  console.log(`\nDone. Updated: ${updated}, Failed: ${failed}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
