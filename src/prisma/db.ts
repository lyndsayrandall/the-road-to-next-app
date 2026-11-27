import 'dotenv/config';
import { supabase } from '@prisma/orm-extension-supabase/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

type SupabaseDb = Awaited<ReturnType<typeof supabase<Contract>>>;

let dbPromise: Promise<SupabaseDb> | null = null;

export function getDb(): Promise<SupabaseDb> {
  if (!dbPromise) {
    dbPromise = supabase({
      contract: contractFromJson<Contract>(contractJson),
      url: process.env['DATABASE_URL']!,
      jwksUrl: process.env['SUPABASE_JWKS_URL']!,
    });
  }
  return dbPromise;
}