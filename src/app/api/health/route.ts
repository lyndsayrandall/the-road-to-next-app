

// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma'; // Adjust to your Prisma client path

// export async function GET() {
//   try {
//     // Runs a lightweight query through Prisma 8 to verify the Supabase TCP connection
//     await prisma.$queryRaw`SELECT 1`;
    
//     return NextResponse.json(
//       { status: 'connected', message: 'Supabase reachable via Prisma' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Supabase connection failed:', error);
//     return NextResponse.json(
//       { status: 'error', details: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }