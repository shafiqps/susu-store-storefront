import { useAccount } from "@lib/context/account-context"
import { Customer } from "@medusajs/medusa"
import Input from "@modules/common/components/input"
import { useUpdateMe } from "medusa-react"
import React, { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import AccountInfo from "../account-info"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">

  
}

type UpdateCustomerICFormData = {
  IC: number;
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
      IC: customer.IC,
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
      IC: customer.IC,
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
        ...data,
      },
      {
        onSuccess: () => {
          refetchCustomer()
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(updateIC)} className="w-full">
      <AccountInfo
        label="Identification card number (IC)"
        currentInfo={`${customer.IC}`}
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
