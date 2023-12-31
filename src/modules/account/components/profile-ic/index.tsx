import { useAccount } from "@lib/context/account-context"
import { Customer } from "@medusajs/medusa"
import Input from "@modules/common/components/input"
import { useUpdateMe } from "medusa-react"
import React, { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import AccountInfo from "../account-info"
import { medusaClient } from "@lib/config"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">

  
}

type UpdateCustomerICFormData = {
  IC?: string;
}


const ProfileIC: React.FC<MyInformationProps> = ({ customer }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateCustomerICFormData>({
    defaultValues: {
      IC: String(customer.metadata?.IC),
      
    },
  })


  const { refetchCustomer } = useAccount()

  const {
    mutate: update,
    isLoading,
    isSuccess,
    isError,
    reset: clearState,
  } = useUpdateMe()

  useEffect(() => {
    reset({
      IC: String(customer.metadata?.IC),
    })
  }, [customer, reset])

  const IC = useWatch({
    control,
    name: "IC",
  })

  const updateIC = (data: UpdateCustomerICFormData) => {
    return update(
      {
        id: customer.id,
        metadata: {
          ...customer.metadata,
          IC: data.IC, // Update the IC in metadata
        },
      },
      {
        onSuccess: () => {
          refetchCustomer() // Refetch the customer to get the updated data
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(updateIC)} className="w-full">
      <AccountInfo
        
        label="Identification card"
        currentInfo={ 
          <>
          <div style={{ textAlign: 'left' }}> 
           <div className="font-semibold">{customer.metadata?.IC}</div>
          </div>
          </>
        }
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        clearState={clearState}
       
      >
        <div className="grid grid-cols-1 gap-y-2">
          <Input
            label="IC"
            {...register("IC", {
              required: true,
            })}
            defaultValue={IC}
            errors={errors}
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileIC
