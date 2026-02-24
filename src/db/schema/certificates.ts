import { relations } from 'drizzle-orm'
import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { brands } from './brands'

export const certificateStatusEnum = pgEnum('certificate_status', ['draft', 'active', 'revoked'])

export const certificates = pgTable('certificates', {
  id: uuid('id').defaultRandom().primaryKey(),
  status: certificateStatusEnum('status').default('draft').notNull(),
  brandId: uuid('brand_id')
    .notNull()
    .references(() => brands.id, { onDelete: 'cascade' }),
  productName: text('product_name').notNull(),
  serialNumber: text('serial_number').notNull().unique(),
  metadata: text('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const certificatesRelations = relations(certificates, ({ one }) => ({
  brand: one(brands, { fields: [certificates.brandId], references: [brands.id] }),
}))

export type Certificate = typeof certificates.$inferSelect
export type NewCertificate = typeof certificates.$inferInsert
