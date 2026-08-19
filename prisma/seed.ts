import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding plans...')

  // Clean up if needed (optional)
  // await prisma.plan.deleteMany({})

  const plans = [
    { name: 'Bronze Plan', minDeposit: 2000, maxDeposit: 4999, tradeProfit: 1.0, platformFee: 5.0, color: '#CD7F32' },
    { name: 'Gold Plan', minDeposit: 5000, maxDeposit: 9999, tradeProfit: 1.5, platformFee: 5.0, color: '#E0C488' },
    { name: 'Metal Plan', minDeposit: 10000, maxDeposit: 19999, tradeProfit: 2.0, platformFee: 5.0, color: '#C0C0C0' },
    { name: 'Diamond Plan', minDeposit: 20000, maxDeposit: 49999, tradeProfit: 2.5, platformFee: 5.0, color: '#B9F2FF' },
    { name: 'Phantom Plan', minDeposit: 50000, maxDeposit: 99999, tradeProfit: 3.5, platformFee: 5.0, color: '#2B1B17' },
    { name: 'DuexAi Plan', minDeposit: 100000, maxDeposit: 999999, tradeProfit: 5.0, platformFee: 5.0, color: '#FCD535' },
  ]

  for (const p of plans) {
    // Upsert to avoid duplicates or errors if exists
    await prisma.plan.upsert({
      where: { id: p.name.toLowerCase().replace(' ', '_') + '_id_placeholder' }, // This won't work well without a unique ID or Name. 
      // Plan schema: id string (cuid), name (not unique?).
      // Let's check schema for unique constraints.
      // If no unique constraint on name, upsert is hard.
      // Let's just use createMany or check existence.
      update: {},
      create: {
        name: p.name,
        minDeposit: p.minDeposit,
        maxDeposit: p.maxDeposit,
        tradeProfit: p.tradeProfit,
        platformFee: p.platformFee,
        color: p.color,
        isActive: true
      }
    }).catch(async (e) => {
      // Fallback if upsert fails/complex: just findFirst and create if missing
      const exists = await prisma.plan.findFirst({ where: { name: p.name } });
      if (!exists) {
        await prisma.plan.create({
          data: {
            name: p.name,
            minDeposit: p.minDeposit,
            maxDeposit: p.maxDeposit,
            tradeProfit: p.tradeProfit,
            platformFee: p.platformFee,
            color: p.color,
            isActive: true
          }
        })
      }
    })
  }

  // Actually, standard seed: delete all and recreate is cleaner for dev.
  // But let's verify if Plan Name is unique. 
  // Schema for Plan?
}

// Improved version
async function seedClean() {
  console.log('Seeding plans (clean)...');
  try {
    await prisma.plan.deleteMany({});
  } catch (e) { }

  const plans = [
    { name: 'Bronze Plan', minDeposit: 2000.00, maxDeposit: 4999.00, tradeProfit: 1.0, platformFee: 5.0, color: '#CD7F32' },
    { name: 'Gold Plan', minDeposit: 5000.00, maxDeposit: 9999.00, tradeProfit: 1.5, platformFee: 5.0, color: '#E0C488' },
    { name: 'Metal Plan', minDeposit: 10000.00, maxDeposit: 19999.00, tradeProfit: 2.0, platformFee: 5.0, color: '#C0C0C0' },
    { name: 'Diamond Plan', minDeposit: 20000.00, maxDeposit: 49999.00, tradeProfit: 2.5, platformFee: 5.0, color: '#B9F2FF' },
    { name: 'Phantom Plan', minDeposit: 50000.00, maxDeposit: 99999.00, tradeProfit: 3.5, platformFee: 5.0, color: '#2B1B17' },
    { name: 'DuexAi Plan', minDeposit: 100000.00, maxDeposit: 999999.00, tradeProfit: 5.0, platformFee: 5.0, color: '#FCD535' },
  ];

  for (const p of plans) {
    await prisma.plan.create({
      data: {
        name: p.name,
        minDeposit: p.minDeposit,
        maxDeposit: p.maxDeposit,
        tradeProfit: p.tradeProfit,
        platformFee: p.platformFee,
        color: p.color,
        isActive: true
      }
    });
  }
  console.log('Seeding completed.');
}

seedClean()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
