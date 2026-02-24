export type MockCertificate = {
  id: string
  productName: string
  serialNumber: string
  status: 'draft' | 'active' | 'revoked'
  brandId: string
  brand: { id: string; name: string; slug: string; logoUrl: string | null }
  metadata: string | null
  createdAt: Date
  updatedAt: Date
}

export type MockBrand = {
  id: string
  name: string
  slug: string
  logoUrl: string | null
  ownerId: string
  createdAt: Date
  updatedAt: Date
}

export const mockBrands: MockBrand[] = [
  {
    id: 'b1000000-0000-4000-8000-000000000001',
    name: 'NovaBrand',
    slug: 'novabrand',
    logoUrl: null,
    ownerId: 'u1000000-0000-4000-8000-000000000001',
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-10-01'),
  },
]

export const mockCertificates: MockCertificate[] = [
  {
    id: 'c1000000-0000-4000-8000-000000000001',
    productName: 'Air Max 2024',
    serialNumber: 'SN-2024-001',
    status: 'active',
    brandId: 'b1000000-0000-4000-8000-000000000001',
    brand: {
      id: 'b1000000-0000-4000-8000-000000000001',
      name: 'NovaBrand',
      slug: 'novabrand',
      logoUrl: null,
    },
    metadata: null,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
  },
  {
    id: 'c1000000-0000-4000-8000-000000000002',
    productName: 'Heritage Sneaker Limited',
    serialNumber: 'SN-2024-002',
    status: 'active',
    brandId: 'b1000000-0000-4000-8000-000000000001',
    brand: {
      id: 'b1000000-0000-4000-8000-000000000001',
      name: 'NovaBrand',
      slug: 'novabrand',
      logoUrl: null,
    },
    metadata: null,
    createdAt: new Date('2025-02-03'),
    updatedAt: new Date('2025-02-03'),
  },
  {
    id: 'c1000000-0000-4000-8000-000000000003',
    productName: 'Canvas Tote Bag S/S25',
    serialNumber: 'SN-2025-003',
    status: 'draft',
    brandId: 'b1000000-0000-4000-8000-000000000001',
    brand: {
      id: 'b1000000-0000-4000-8000-000000000001',
      name: 'NovaBrand',
      slug: 'novabrand',
      logoUrl: null,
    },
    metadata: null,
    createdAt: new Date('2025-02-18'),
    updatedAt: new Date('2025-02-18'),
  },
  {
    id: 'c1000000-0000-4000-8000-000000000004',
    productName: 'Leather Wallet Classic',
    serialNumber: 'SN-2025-004',
    status: 'revoked',
    brandId: 'b1000000-0000-4000-8000-000000000001',
    brand: {
      id: 'b1000000-0000-4000-8000-000000000001',
      name: 'NovaBrand',
      slug: 'novabrand',
      logoUrl: null,
    },
    metadata: null,
    createdAt: new Date('2025-01-28'),
    updatedAt: new Date('2025-02-10'),
  },
  {
    id: 'c1000000-0000-4000-8000-000000000005',
    productName: 'Silk Scarf SS25',
    serialNumber: 'SN-2025-005',
    status: 'active',
    brandId: 'b1000000-0000-4000-8000-000000000001',
    brand: {
      id: 'b1000000-0000-4000-8000-000000000001',
      name: 'NovaBrand',
      slug: 'novabrand',
      logoUrl: null,
    },
    metadata: null,
    createdAt: new Date('2025-02-20'),
    updatedAt: new Date('2025-02-20'),
  },
  {
    id: 'c1000000-0000-4000-8000-000000000006',
    productName: 'Denim Jacket FW24',
    serialNumber: 'SN-2024-006',
    status: 'active',
    brandId: 'b1000000-0000-4000-8000-000000000001',
    brand: {
      id: 'b1000000-0000-4000-8000-000000000001',
      name: 'NovaBrand',
      slug: 'novabrand',
      logoUrl: null,
    },
    metadata: null,
    createdAt: new Date('2024-11-10'),
    updatedAt: new Date('2024-11-10'),
  },
]

export function getMockStats() {
  const total = mockCertificates.length
  const active = mockCertificates.filter((c) => c.status === 'active').length
  const draft = mockCertificates.filter((c) => c.status === 'draft').length
  const revoked = mockCertificates.filter((c) => c.status === 'revoked').length
  return { total, active, draft, revoked }
}
