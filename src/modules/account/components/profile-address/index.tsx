import { useAccount } from "@lib/context/account-context"
import { Customer, StorePostCustomersCustomerReq } from "@medusajs/medusa"
import Input from "@modules/common/components/input"
import NativeSelect from "@modules/common/components/native-select"
import { useRegions, useUpdateMe } from "medusa-react"
import React, { useEffect, useMemo } from "react"
import { useForm, useWatch } from "react-hook-form"
import AccountInfo from "../account-info"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

type UpdateCustomerAddressFormData = {
    home_address?: Address; 
    office_address?: Address;
  };

  type Address = {
    first_name?: string;
    last_name?: string;
    company?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    province?: string;
    postal_code?: string;
    country_code?: string;
  };


const ProfileAddress: React.FC<MyInformationProps> = ({ customer }) => {

  
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateCustomerAddressFormData>({
    defaultValues: {
      home_address: customer.metadata?.home_address || createEmptyAddress(),
      office_address: customer.metadata?.office_address || createEmptyAddress(), // createEmptyAddress is a function you'll define
    },
  })

  const {
    mutate: update,
    isLoading,
    isSuccess,
    isError,
    reset: clearState,
  } = useUpdateMe()

  const { regions } = useRegions()

  const regionOptions = useMemo(() => {
    return (
      regions
        ?.map((region) => {
          return region.countries.map((country) => ({
            value: country.iso_2,
            label: country.display_name,
          }))
        })
        .flat() || []
    )
  }, [regions])


  useEffect(() => {
    reset({
      home_address: customer.metadata?.home_address || createEmptyAddress(),
      office_address: customer.metadata?.office_address || createEmptyAddress(),
    })
  }, [customer, reset])

  const { refetchCustomer } = useAccount()



  const updateAddresses = (data: UpdateCustomerAddressFormData) => {
    // Update the customer with both billing and home addresses
    return update(
      {
        id: customer.id,// This will be part of the main customer data
        metadata: {
          ...customer.metadata,
          home_address: data.home_address,
          office_address: data.office_address // This will be part of the metadata
        },
      },
      {
        onSuccess: () => {
          refetchCustomer();
        },
      }
    );
  };


  const homeAddressInfo = useMemo(() => {
    const homeAddress = customer.metadata?.home_address;
    if (!homeAddress) {
      return "No home address"; // Display this when no home address is set
    }

    const homecountry =
    regionOptions?.find(
      (country) => country.value === homeAddress.country_code
    )?.label || homeAddress.country_code?.toUpperCase()

  
    return (
      <div className="flex flex-col font-semibold">
        <span>
          {homeAddress.first_name}{" "}
          {homeAddress.last_name}
        </span>
        <span>{homeAddress.company}</span>
        <span>
          {homeAddress.address_1}
          {homeAddress.address_2
            ? `, ${homeAddress.address_2}`
            : ""}
        </span>
        <span>
          {homeAddress.postal_code},{" "}
          {homeAddress.city}
        </span>
        <span>
          {homeAddress.province}
          </span>
        <span>{homecountry}</span>

      </div>
    );
  }, [customer.metadata?.home_address, regionOptions]);


  const officeAddressInfo = useMemo(() => {
    const officeAddress = customer.metadata?.office_address;
    if (!officeAddress) {
      return "No Office Address"; // Display this when no home address is set
    }

    const officeCountry =
    regionOptions?.find(
      (country) => country.value === officeAddress.country_code
    )?.label || officeAddress.country_code?.toUpperCase()

  
    return (
      <div className="flex flex-col font-semibold">
        <span>
          {officeAddress.first_name}{" "}
          {officeAddress.last_name}
        </span>
        <span>{officeAddress.company}</span>
        <span>
          {officeAddress.address_1}
          {officeAddress.address_2
            ? `, ${officeAddress.address_2}`
            : ""}
        </span>
        <span>
          {officeAddress.postal_code},{" "}
          {officeAddress.city}
        </span>
        <span>
          {officeAddress.province}
          </span>
        <span>{officeCountry}</span>

      </div>
    );
  }, [customer.metadata?.office_address, regionOptions]);
  
  
  return (
    <form
      onSubmit={handleSubmit(updateAddresses )}
      className="w-full"
    >
       <span className="address-section-title">Other Addresses</span>
      <AccountInfo
        label="Other Addresses"
        currentInfo={   
          <>
          <div style={{ textAlign: 'left'  }}> 
          
            <div className="mb-5">Home Address: {homeAddressInfo}</div>
            <div className="mb-5 px-0 ">Office Address: {officeAddressInfo}</div>
          </div>
          </>
        }
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        clearState={clearState}
        
      >     
     
        <div className="grid grid-cols-1 gap-y-2">
        <h1>Home Address</h1>
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label="First name"
              {...register("home_address.first_name", {
                required: true,
              })}
              defaultValue={customer.metadata?.home_address?.firstName}
              errors={errors}
            />
            <Input
              label="Last name"
              {...register("home_address.last_name", { required: true })}
              defaultValue={customer.metadata?.home_address?.lastName}
              errors={errors}
            />
          </div>
          <Input
            label="Company"
            {...register("home_address.company")}
            defaultValue={customer.metadata?.home_address?.company}
            errors={errors}
          />
          <Input
            label="Address"
            {...register("home_address.address_1", { required: true })}
            defaultValue={customer.metadata?.home_address?.address1}
            errors={errors}
          />
          <Input
            label="Apartment, suite, etc."
            {...register("home_address.address_2")}
            defaultValue={customer.metadata?.home_address?.address2}
            errors={errors}
          />
          <div className="grid grid-cols-[144px_1fr] gap-x-2">
            <Input
              label="Postal code"
              {...register("home_address.postal_code", { required: true })}
              defaultValue={customer.metadata?.home_address?.postalCode}
              errors={errors}
            />
            <Input
              label="City"
              {...register("home_address.city", { required: true })}
              defaultValue={customer.metadata?.home_address?.city}
              errors={errors}
            />
          </div>
          <Input
            label="Province"
            {...register("home_address.province")}
            defaultValue={customer.metadata?.home_address?.province}
            errors={errors}
          />
          <NativeSelect
            {...register("home_address.country_code", { required: true })}
            defaultValue={customer.metadata?.home_address?.countryCode}
          >
            <option value="">-</option>
            {regionOptions.map((option, i) => {
              return (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              )
            })}
          </NativeSelect>
        </div>    

        <div className="grid grid-cols-1 gap-y-2">
        <h1>Office Address</h1>
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label="First name"
              {...register("office_address.first_name", {
                required: true,
              })}
              defaultValue={customer.metadata?.office_address?.firstName}
              errors={errors}
            />
            <Input
              label="Last name"
              {...register("office_address.last_name", { required: true })}
              defaultValue={customer.metadata?.office_address?.lastName}
              errors={errors}
            />
          </div>
          <Input
            label="Company"
            {...register("office_address.company")}
            defaultValue={customer.metadata?.office_address?.company}
            errors={errors}
          />
          <Input
            label="Address"
            {...register("office_address.address_1", { required: true })}
            defaultValue={customer.metadata?.office_address?.address1}
            errors={errors}
          />
          <Input
            label="Apartment, suite, etc."
            {...register("office_address.address_2")}
            defaultValue={customer.metadata?.office_address?.address2}
            errors={errors}
          />
          <div className="grid grid-cols-[144px_1fr] gap-x-2">
            <Input
              label="Postal code"
              {...register("office_address.postal_code", { required: true })}
              defaultValue={customer.metadata?.office_address?.postalCode}
              errors={errors}
            />
            <Input
              label="City"
              {...register("office_address.city", { required: true })}
              defaultValue={customer.metadata?.office_address?.city}
              errors={errors}
            />
          </div>
          <Input
            label="Province"
            {...register("office_address.province")}
            defaultValue={customer.metadata?.office_address?.province}
            errors={errors}
          />
          <NativeSelect
            {...register("office_address.country_code", { required: true })}
            defaultValue={customer.metadata?.office_address?.countryCode}
          >
            <option value="">-</option>
            {regionOptions.map((option, i) => {
              return (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              )
            })}
          </NativeSelect>
        </div>   
      </AccountInfo>      





    </form>
  )
}

const mapBillingAddressToFormData = ({ customer }: MyInformationProps) => {
  return {
    billing_address: {
      first_name: customer.billing_address?.first_name || undefined,
      last_name: customer.billing_address?.last_name || undefined,
      company: customer.billing_address?.company || undefined,
      address_1: customer.billing_address?.address_1 || undefined,
      address_2: customer.billing_address?.address_2 || undefined,
      city: customer.billing_address?.city || undefined,
      province: customer.billing_address?.province || undefined,
      postal_code: customer.billing_address?.postal_code || undefined,
      country_code: customer.billing_address?.country_code || undefined,
    },
  }
}


const createEmptyAddress = (): Address => ({
  first_name: '',
  last_name: '',
  company: '',
  address_1: '',
  address_2: '',
  city: '',
  province: '',
  postal_code: '',
  country_code: '',
});



export default ProfileAddress;
