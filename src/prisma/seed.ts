import { getDb } from './db';

type SupabaseDb = Awaited<ReturnType<typeof getDb>>;

async function main() {
  let db: SupabaseDb | undefined;

  try {
    console.log('Seeding Ticket table...');
    db = await getDb();
    const serviceDb = db.asServiceRole();

    const tickets = await serviceDb.orm.public.Ticket.createAll([
      {
        title: 'Fix login redirect loop',
        content: 'Users get stuck on /callback after signing in with OAuth.',
        status: 'OPEN',
      },
      {
        title: 'Update dashboard chart colors',
        content: 'Switch the primary bar color to match the new brand palette.',
        status: 'IN_PROGRESS',
      },
      {
        title: 'Set up Supabase RLS policies',
        content: 'Configured row-level security for the Ticket table.',
        status: 'DONE',
      },
      {
        title: 'Optimize mobile navigation menu',
        content: 'Drawer lags slightly on smaller viewports.',
      },
    ]);

    console.log(`Inserted ${tickets.length} tickets.`);
  } catch (error) {
    console.error('Error seeding tickets:', error);
    process.exitCode = 1;
  } finally {
    if (db) {
      await db.close();
    }
  }
}

main();