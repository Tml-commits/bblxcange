-- Run once after `npx prisma db push` when deploying withdrawal freeze.
-- Marks existing in-flight withdrawals that already deducted balance on submit.
UPDATE "Withdrawal"
SET "balanceDeductedAtRequest" = true
WHERE "status" IN ('PENDING', 'APPROVED')
  AND "balanceDeductedAtRequest" = false;
