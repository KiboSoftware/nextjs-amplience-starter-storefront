export const destinationContactFragment = `
fragment destinationContactFragment on Contact {
      id
        email
        firstName
        middleNameOrInitial
        lastNameOrSurname
        phoneNumbers{
          home
        }
        address{
          address1
          address2
          address3
          cityOrTown
          stateOrProvince
          postalOrZipCode
          countryCode
          addressType
        }
    }
`
