#!/usr/bin/env -S node
import {
  checkExpression,
  col,
  lit,
  Migration,
  MigrationCLI,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';
import type { Contract as End } from '../../snapshots/e0f03054bccfac3cc347b74a3f16e60c7c08ab946ab113dd96c3ac8e47d6e17b/contract';
import endContract from '../../snapshots/e0f03054bccfac3cc347b74a3f16e60c7c08ab946ab113dd96c3ac8e47d6e17b/contract.json' with { type: 'json' };

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'tickets',
        columns: [
          col('content', 'character varying(1024)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1024 } },
          }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('OPEN'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('title', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'tickets_status_check_21bcd8dd',
            sql`"status" IN ('OPEN', 'IN_PROGRESS', 'DONE')`,
          ),
        ],
      }),
      this.enableRowLevelSecurity({ schema: 'public', table: 'tickets' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
