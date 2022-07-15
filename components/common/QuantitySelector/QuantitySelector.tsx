import React, { ChangeEvent, useEffect, useState } from 'react'

import { Add, Remove } from '@mui/icons-material'
import { Stack, TextField, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

// Interface
interface QuantitySelectorProps {
  quantity: number
  label?: string
  maxQuantity?: number
  onIncrease?: () => void
  onDecrease?: () => void
  updateCustomQuantity?: (quantity: number) => void
}

interface QuantityInputProps {
  quantity: number
  handleCustomQuantity?: any
}

// MUI
const styles = {
  iconButton: {
    border: 1,
    borderColor: 'text.primary',
    height: 22,
    width: 22,
  },
}

const QuantityTextField = ({ quantity, handleCustomQuantity }: QuantityInputProps) => {
  const [itemQuantity, setItemQuantity] = useState<number | string>(quantity)

  const handleChangeQuantityOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemQuantity(e.target.value)
  }

  const handleChangeQuantityOnBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newQuantity = Number(e.target.value)

    if (!Number.isNaN(newQuantity) && newQuantity > 0 && newQuantity !== quantity) {
      handleCustomQuantity(Number(itemQuantity))
    } else setItemQuantity(quantity)
  }

  useEffect(() => {
    setItemQuantity(quantity)
  }, [quantity])

  return (
    <TextField
      name="quantity"
      onChange={handleChangeQuantityOnChange}
      onBlur={handleChangeQuantityOnBlur}
      value={itemQuantity}
      inputProps={{
        'aria-label': 'quantity',
        inputMode: 'numeric',
        pattern: '[0-9]*',
        style: {
          paddingTop: 5,
          paddingBottom: 5,
          textAlign: 'center',
        },
      }}
      sx={{ width: '46px', height: '37px' }}
    />
  )
}

// Component
const QuantitySelector = (props: QuantitySelectorProps) => {
  const { quantity, label, maxQuantity, onIncrease, onDecrease, updateCustomQuantity } = props
  const { t } = useTranslation('common')

  return (
    <Stack direction="row" justifyContent="flec-start" alignItems="center" spacing={1.2}>
      <Typography variant="body2" component="span" sx={{ pr: '0.5rem' }} data-testid="label">
        {label}:
      </Typography>

      <IconButton
        onClick={onDecrease}
        disabled={quantity === 1 ? true : false}
        sx={{ ...styles.iconButton }}
        aria-label={t('decrease')}
        component="span"
      >
        <Remove fontSize="small" />
      </IconButton>

      <QuantityTextField quantity={quantity} handleCustomQuantity={updateCustomQuantity} />

      <IconButton
        onClick={onIncrease}
        disabled={maxQuantity === quantity ? true : false}
        sx={{ ...styles.iconButton }}
        aria-label={t('increase')}
        component="span"
      >
        <Add fontSize="small" />
      </IconButton>
    </Stack>
  )
}

export default QuantitySelector
