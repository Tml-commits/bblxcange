import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding traders...");

  // Clear existing traders
  console.log("Clearing old traders...");
  await prisma.trader.deleteMany({});

  const traders = [
    {
      name: "AlexTrader",
      avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=AlexTrader",
      roi: 125.4,
      followers: 0,
      winRate: 95.0,
      totalTrades: 542,
      riskLevel: "Medium",
      description: "Pro Trader with consistent returns.",
      profitShare: "20%",
      isActive: true,
    },
    {
      name: "CryptoWhale",
      avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=CryptoWhale",
      roi: 85.2,
      followers: 0,
      winRate: 88.5,
      totalTrades: 890,
      riskLevel: "High",
      description: "Elite Trader dealing with high volume trades.",
      profitShare: "25%",
      isActive: true,
    },
    {
      name: "MoonTrader",
      avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=MoonTrader",
      roi: 98.7,
      followers: 0,
      winRate: 91.2,
      totalTrades: 420,
      riskLevel: "Low",
      description: "Expert Trader focused on steady growth.",
      profitShare: "15%",
      isActive: true,
    },
  ];

  for (const trader of traders) {
    // Check if trader exists by name
    const existing = await prisma.trader.findFirst({
      where: { name: trader.name },
    });

    if (existing) {
      await prisma.trader.update({
        where: { id: existing.id },
        data: trader,
      });
    } else {
      await prisma.trader.create({
        data: trader,
      });
    }
  }

  console.log("✅ Traders seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding traders:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
