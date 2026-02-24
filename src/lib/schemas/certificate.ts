import { z } from 'zod'

export const createCertificateSchema = z.object({
  productName: z.string().min(2, 'Il nome prodotto deve avere almeno 2 caratteri').max(200),
  serialNumber: z.string().min(4, 'Il numero seriale deve avere almeno 4 caratteri').max(100),
  brandId: z.string().uuid('Brand ID non valido'),
  metadata: z.string().max(2000).optional(),
})

export type CreateCertificateInput = z.infer<typeof createCertificateSchema>
