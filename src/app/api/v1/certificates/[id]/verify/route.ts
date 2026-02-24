import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { brands, certificates } from '@/db/schema'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Valida che sia un UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(id)) {
    return NextResponse.json({ status: 'error', message: 'ID non valido' }, { status: 400 })
  }

  const certificate = await db.query.certificates.findFirst({
    where: eq(certificates.id, id),
    with: { brand: { columns: { id: true, name: true, slug: true, logoUrl: true } } },
  })

  if (!certificate) {
    return NextResponse.json(
      { status: 'error', message: 'Certificato non trovato' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    status: 'ok',
    data: {
      id: certificate.id,
      productName: certificate.productName,
      serialNumber: certificate.serialNumber,
      certificateStatus: certificate.status,
      brand: certificate.brand,
      issuedAt: certificate.createdAt,
    },
  })
}
