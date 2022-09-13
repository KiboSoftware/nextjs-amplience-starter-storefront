/** @format */

import React, { useEffect, useState } from 'react'

import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ProfileDetailsForm } from '@/components/my-account'
import { useAuthContext } from '@/context'
import { useUpateUserMutations } from '@/hooks/mutations/useProfile/useChangeCustomerData/useUpdateCustomerData'
import { useUpdateUserPasswordMutations } from '@/hooks/mutations/useProfile/useUpdateCustomerPassword/useUpdatePassword'
import { accountDetailsGetters } from '@/lib/getters'
import { UpdateProfileDataParam, PasswordTypes } from '@/lib/types'

import { CustomerAccount } from '@/lib/gql/types'

enum ProfileSections {
  Name = 1,
  Email,
  Password,
}

const MyProfile = () => {
  const { user } = useAuthContext()
  const { t } = useTranslation(['checkout', 'common'])
  const { updateUserData } = useUpateUserMutations()
  const { updateUserPasswordData } = useUpdateUserPasswordMutations()

  const [currentEditableField, setCurrentEditableField] = useState<number | null>(null)

  const [currentUser, setCurrentUser] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    id: 0,
  })

  const { id, firstName, lastName, emailAddress, fullName } =
    accountDetailsGetters.getPersonalDetails(user as CustomerAccount)

  const viewProfileDetails = [
    {
      id: ProfileSections.Name,
      label: t('checkout:customer-name'),
      value: fullName,
    },
    {
      id: ProfileSections.Email,
      label: t('checkout:email'),
      value: currentUser.emailAddress,
    },
    {
      id: ProfileSections.Password,
      label: t('checkout:password'),
      value: '**************',
    },
  ]

  useEffect(() => {
    setCurrentUser({
      id: id as number,
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
    })
  }, [id, firstName, lastName, emailAddress])

  const handleUpdateProfileData = async <T extends UpdateProfileDataParam>(profileFormData: T) => {
    if (profileFormData.oldPassword && profileFormData.newPassword) {
      handleUpdateUserPassword(profileFormData)
      return
    }

    try {
      await updateUserData.mutateAsync({
        accountId: currentUser.id as number,
        customerAccountInput: {
          id: currentUser.id as number,
          firstName: profileFormData.firstName as string,
          lastName: profileFormData.lastName as string,
          emailAddress: profileFormData.emailAddress as string,
        },
      })
    } catch (err) {
      console.log(err)
    }
    setCurrentEditableField(null)
  }

  const handleUpdateUserPassword = async (updatedPassword: PasswordTypes) => {
    try {
      await updateUserPasswordData.mutateAsync({
        accountId: currentUser.id,
        passwordInfoInput: {
          oldPassword: updatedPassword.oldPassword as string,
          newPassword: updatedPassword.newPassword as string,
          externalPassword: updatedPassword.newPassword as string,
        },
      })
    } catch (err) {
      console.log(err)
    }

    setCurrentEditableField(null)
  }

  if (Boolean(currentEditableField)) {
    return (
      <ProfileDetailsForm
        {...(currentEditableField === ProfileSections.Email && { isEmailForm: true })}
        {...(currentEditableField === ProfileSections.Password && { isPasswordForm: true })}
        firstName={firstName}
        lastName={lastName}
        emailAddress={emailAddress}
        onSaveProfileData={handleUpdateProfileData}
        onCancel={() => setCurrentEditableField(null)}
      />
    )
  }

  return (
    <>
      <Stack gap={2}>
        {viewProfileDetails.map((each) => {
          return (
            <Box
              key={each.label}
              display="flex"
              alignItems={'flex-end'}
              justifyContent={'space-between'}
            >
              <Stack gap={1}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {each.label}
                </Typography>
                <Typography variant="body1">{each.value}</Typography>
              </Stack>
              <Typography
                variant="body1"
                onClick={() => {
                  setCurrentEditableField(each.id)
                }}
                sx={{ cursor: 'pointer' }}
              >
                {t('common:edit')}
              </Typography>
            </Box>
          )
        })}
      </Stack>
    </>
  )
}

export default MyProfile
