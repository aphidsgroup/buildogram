// src/lib/ai-floor-plan/credits.js
import { prisma as db } from '../storageProvider';

export async function getCreditBalance(userId, partnerId) {
  // If no DB connection or we just want a simple mock for now:
  try {
    const credits = await db.ai_floor_plan_credit_ledger.aggregate({
      _sum: { change: true },
      where: {
        OR: [
          { user_id: userId || undefined },
          { partner_id: partnerId || undefined }
        ].filter(Boolean)
      }
    });
    
    let balance = credits._sum.change || 0;
    
    // Seed credits if 0 (first time user)
    if (balance === 0) {
      const defaultCredits = partnerId ? 25 : 5;
      await db.ai_floor_plan_credit_ledger.create({
        data: {
          user_id: userId,
          partner_id: partnerId,
          change: defaultCredits,
          reason: 'Initial Signup Bonus'
        }
      });
      balance = defaultCredits;
    }
    
    return balance;
  } catch (err) {
    console.error("Credit fetch error:", err);
    return 5; // fallback
  }
}

export async function deductCredits(userId, partnerId, amount, reason, referenceId = null) {
  try {
    const balance = await getCreditBalance(userId, partnerId);
    if (balance < amount) {
      return { success: false, error: "Insufficient credits" };
    }
    
    await db.ai_floor_plan_credit_ledger.create({
      data: {
        user_id: userId,
        partner_id: partnerId,
        change: -amount,
        reason,
        reference_id: referenceId
      }
    });
    
    return { success: true, newBalance: balance - amount };
  } catch (err) {
    console.error("Credit deduction error:", err);
    return { success: false, error: err.message };
  }
}
