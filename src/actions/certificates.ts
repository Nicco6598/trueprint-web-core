'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { db } from '@/db'
import { brands, certificates } from '@/db/schema'
import { createCertificateSchema, type CreateCertificateInput } from '@/lib/schemas/certificate'

type ActionResult = { success: true; certificateId: string } | { success: false; error: string }

export async function createCertificate(input: CreateCertificateInput): Promise<ActionResult> {
  // Auth check — solo utenti autenticati
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: 'Non autenticato' }
  }

  // RBAC — solo brand
  if (session.user.role !== 'brand') {
    return { success: false, error: 'Accesso negato: riservato ai brand' }
  }

  // Validazione input
  const parsed = createCertificateSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  const { productName, serialNumber, brandId, metadata } = parsed.data

  // Verifica che il brand appartenga all'utente autenticato
  const brand = await db.query.brands.findFirst({
    where: eq(brands.id, brandId),
  })

  if (!brand || brand.ownerId !== session.user.id) {
    return { success: false, error: 'Brand non trovato o non autorizzato' }
  }

  // Creazione certificato
  const [certificate] = await db
    .insert(certificates)
    .values({ productName, serialNumber, brandId, metadata, status: 'draft' })
    .returning({ id: certificates.id })

  revalidatePath('/dashboard/certificates')

  return { success: true, certificateId: certificate.id }
}
