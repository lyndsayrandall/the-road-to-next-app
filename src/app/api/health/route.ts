

import { NextResponse } from 'next/server';
import { getDb } from '@/prisma/db';

export async function GET() {
  try {
    // 1. Await your getDb() singleton
    const db = await getDb();

    // 2. Bind a Postgres role (use asAnon() or asServiceRole())
    const client =  db.asAnon();

    // 3. Build and execute the raw SQL health check
    const plan = client.raw.sql`SELECT 1 AS ok`
      .returnsRow({ ok: 'pg/int4@1' })
      .build();

    await client.query(plan);

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}