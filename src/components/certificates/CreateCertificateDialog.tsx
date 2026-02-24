'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createCertificate } from '@/actions/certificates'
import { createCertificateSchema, type CreateCertificateInput } from '@/lib/schemas/certificate'
import { mockBrands } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export function CreateCertificateDialog() {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateCertificateInput>({
    resolver: zodResolver(createCertificateSchema),
    defaultValues: { brandId: mockBrands[0]?.id ?? '' },
  })

  async function onSubmit(data: CreateCertificateInput) {
    const result = await createCertificate(data)
    if (result.success) {
      toast.success('Certificato creato con successo')
      reset()
      setOpen(false)
    } else {
      toast.error(result.error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="rounded-sm">
          <Plus className="mr-1.5 h-3.5 w-3.5" strokeWidth={1.5} />
          Nuovo certificato
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-sm sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Crea certificato</DialogTitle>
          <p className="text-muted-foreground text-xs">
            Compila i campi per emettere un nuovo certificato di autenticità.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
          {/* Brand */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium tracking-[0.08em] uppercase">Brand</Label>
            <Select
              defaultValue={mockBrands[0]?.id ?? ''}
              onValueChange={(v) => setValue('brandId', v)}
            >
              <SelectTrigger id="brandId" className="rounded-sm text-sm">
                <SelectValue placeholder="Seleziona brand" />
              </SelectTrigger>
              <SelectContent className="rounded-sm">
                {mockBrands.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.brandId && <p className="text-destructive text-xs">{errors.brandId.message}</p>}
          </div>

          {/* Product name */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium tracking-[0.08em] uppercase">Nome prodotto</Label>
            <Input
              id="productName"
              placeholder="es. Air Max 2024"
              className="rounded-sm"
              {...register('productName')}
            />
            {errors.productName && (
              <p className="text-destructive text-xs">{errors.productName.message}</p>
            )}
          </div>

          {/* Serial number */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium tracking-[0.08em] uppercase">
              Numero seriale
            </Label>
            <Input
              id="serialNumber"
              placeholder="es. SN-2025-001"
              className="rounded-sm font-mono"
              {...register('serialNumber')}
            />
            {errors.serialNumber && (
              <p className="text-destructive text-xs">{errors.serialNumber.message}</p>
            )}
          </div>

          {/* Metadata */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium tracking-[0.08em] uppercase">
              Metadati{' '}
              <span className="text-muted-foreground font-normal tracking-normal normal-case">
                (opzionale)
              </span>
            </Label>
            <Textarea
              id="metadata"
              placeholder='{"colore": "nero", "taglia": "42"}'
              className="rounded-sm font-mono text-xs"
              rows={3}
              {...register('metadata')}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-sm"
              onClick={() => setOpen(false)}
            >
              Annulla
            </Button>
            <Button type="submit" size="sm" className="rounded-sm" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
              Crea certificato
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
