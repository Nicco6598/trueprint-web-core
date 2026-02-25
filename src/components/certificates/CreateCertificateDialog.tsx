'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, Loader2, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createCertificate } from '@/actions/certificates'
import { createCertificateSchema, type CreateCertificateInput } from '@/lib/schemas/certificate'
import { mockBrands } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
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

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
      <AlertCircle className="h-3 w-3 shrink-0" />
      {message}
    </p>
  )
}

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
        <Button size="sm" className="gap-1.5 rounded-none bg-sky-600 text-white hover:bg-sky-700">
          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          Nuovo certificato
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-none p-0 sm:max-w-[460px]" showCloseButton={false}>
        {/* Header */}
        <div className="flex items-start justify-between border-b px-5 py-4">
          <div>
            <DialogTitle className="text-sm font-semibold tracking-tight">
              Crea certificato
            </DialogTitle>
            <p className="text-muted-foreground mt-1 text-xs">
              Emetti un nuovo certificato di autenticità per un prodotto fisico.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-muted-foreground hover:text-foreground ml-4 shrink-0 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 px-5 py-4">
            {/* Brand */}
            <div className="space-y-1.5">
              <Label className="text-muted-foreground text-[10px] font-semibold tracking-[0.1em] uppercase">
                Brand
              </Label>
              <Select
                defaultValue={mockBrands[0]?.id ?? ''}
                onValueChange={(v) => setValue('brandId', v)}
              >
                <SelectTrigger className="rounded-none">
                  <SelectValue placeholder="Seleziona brand" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {mockBrands.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError message={errors.brandId?.message} />
            </div>

            {/* Product + Serial — 2 col */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-muted-foreground text-[10px] font-semibold tracking-[0.1em] uppercase">
                  Nome prodotto
                </Label>
                <Input
                  placeholder="Air Max 2024"
                  className="rounded-none"
                  {...register('productName')}
                />
                <FieldError message={errors.productName?.message} />
              </div>

              <div className="space-y-1.5">
                <Label className="text-muted-foreground text-[10px] font-semibold tracking-[0.1em] uppercase">
                  Numero seriale
                </Label>
                <Input
                  placeholder="SN-2025-001"
                  className="rounded-none font-mono text-sm"
                  {...register('serialNumber')}
                />
                <FieldError message={errors.serialNumber?.message} />
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-1.5">
              <Label className="text-muted-foreground text-[10px] font-semibold tracking-[0.1em] uppercase">
                Metadati{' '}
                <span className="text-muted-foreground/60 font-normal tracking-normal normal-case">
                  — opzionale
                </span>
              </Label>
              <Textarea
                placeholder={'{"colore": "nero", "taglia": "42"}'}
                className="rounded-none font-mono text-xs"
                rows={3}
                {...register('metadata')}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="bg-muted/20 flex items-center justify-end gap-2 border-t px-5 py-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-none border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40"
              onClick={() => setOpen(false)}
            >
              Annulla
            </Button>
            <Button
              type="submit"
              size="sm"
              className="min-w-[120px] rounded-none bg-sky-600 text-white hover:bg-sky-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  Creazione...
                </>
              ) : (
                'Crea certificato'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
