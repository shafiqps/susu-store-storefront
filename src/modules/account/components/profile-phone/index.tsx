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

type UpdateCustomerPhoneFormData = {
  phone: string;
  otherPhone?: string;
}

const ProfilePhone: React.FC<MyInformationProps> = ({ customer }) => {

 
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateCustomerPhoneFormData>({
    defaultValues: {
      phone: customer.phone,
      otherPhone: String(customer.metadata?.otherPhone),
    },
  })
  const otherPhone = useWatch({ control, name: "otherPhone" }); 
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
      phone: customer.phone,
    })
  }, [customer, reset])

  const phone = useWatch({
    control,
    name: "phone",
  })

  const updatePhone = (data: UpdateCustomerPhoneFormData) => {
    console.log('Submitting data', data); // Log the data being submitted
  
    update({
      id: customer.id,
      phone: data.phone,
      metadata: {
        ...customer.metadata,
        
        otherPhone: data.otherPhone,
      },
    }, {
      onSuccess: () => {
        refetchCustomer(); // Make sure this is fetching the updated data
      },
      onError: (error) => {
        console.error("Phone update failed:", error);
      },
    });
  };
  

  return (
    <form onSubmit={handleSubmit(updatePhone)} className="w-full">
    <AccountInfo
      label="Phones"
      currentInfo={   
        <>
        <div style={{ textAlign: 'left' }}> 
          <div className="font-semibold">Primary: {customer.phone}</div>
          <div className="font-semibold">Other: {customer.metadata?.otherPhone}</div>
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
          label="Phone"
          {...register("phone", {
            required: "Phone number is required", // Adding an error message
          })}
          defaultValue={customer.phone} // You can use customer.phone directly
          errors={errors}
        />
        <Input
          label="Other Phone"
          {...register("otherPhone")}
          defaultValue={otherPhone} // And customer.metadata?.otherPhone here
          errors={errors}
        />
      </div>
    </AccountInfo>
  </form>
  )
}

export default ProfilePhone