import React, { useEffect } from "react"

import { z } from "zod"
// import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


type ProfileUpdateComponentType = {
  ReduxCall: any
  APICall: {
    retrieveAPIResponse: any,
    updateAPITrigger: any,
    updateAPIResponse: any,
  }
  extras: {
    apiResponseHandler: {
      updateAPIResponseHandler: any
    },
    data: any,
    formSchema: any,
    formDefaultValue: any,
    previousValue: any,
  }
}

const ProfileUpdateComponent = (props: ProfileUpdateComponentType) => {
  // Destructure Props
  const { APICall, extras } = props;

  // Variable
  // const navigate = useNavigate()

  // Form
  const form = useForm<z.infer<typeof extras.formSchema>>({
    resolver: zodResolver(extras.formSchema),
    mode: "onChange",
    defaultValues: extras.formDefaultValue
  })

  // Submit Handler
  // const onSubmit = async (data: z.infer<typeof extras.formSchema>) => {
  //   console.log(data)

  //   // toast({
  //   //   title: "You submitted the following values:",
  //   //   description: (
  //   //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //   //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //   //     </pre>
  //   //   ),
  //   // })

  //   extras.apiResponseHandler.updateAPIResponseHandler(data, APICall.updateAPITrigger, form, navigate)
  //   // extras.apiResponseHandler.updateAPIResponseHandler(data, ReduxCall, APICall.updateAPITrigger, form, navigate)
  // }  
  
  // All Render
  // First Render
  useEffect(() => {
    APICall.retrieveAPIResponse.isLoading ? null : 
    APICall.retrieveAPIResponse.isError ? null :
    APICall.retrieveAPIResponse.isSuccess ? (
      APICall.retrieveAPIResponse.data.success ? (
        extras.previousValue(form)
      ) : null
    ) : null
  }, [APICall.retrieveAPIResponse])    

  // JSX
  return (
    <React.Fragment>
      ProfileUpdateComponent
    </React.Fragment>      
  )
}  

export default ProfileUpdateComponent;

{/* <div className="flex-1 lg:max-w-2xl">
<div className="mb-8" >
  <h2 className="text-3xl font-bold tracking-tight">{extras.data.header.title}</h2>
  <p className="text-muted-foreground">
    {extras.data.header.subtitle}
  </p>
</div>

<div className="mx-auto grid flex-1 auto-rows-max gap-4">
  {
    APICall.retrieveAPIResponse.isLoading ? "Loading..." : 
    APICall.retrieveAPIResponse.isError ? "Error..." :
    APICall.retrieveAPIResponse.isSuccess ? (
      <React.Fragment>
        {
          APICall.retrieveAPIResponse.data.success ? (
            <React.Fragment>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                  {extras.data.content.sections?.filter((eachSection: any) => eachSection.display)?.map((eachSection: any, indexSection: number) => eachSection.display && (
                    <React.Fragment key={indexSection} >
                      <div>
                        <h3 className="text-lg font-medium">{indexSection+1}) {eachSection.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{eachSection.subtitle}</p>
                        <Separator />
                      </div>
        
                      <div className="space-y-8">
                        {eachSection.inputs.map((eachInput: any, indexInput: any) => (
                          <React.Fragment>
                            For I/P Type: Text, Email, Number
                            {((eachInput.type === "text" || eachInput.type === "email" || eachInput.type === "number") && 
                              <div className="grid gap-3" key={indexInput} >
                                <FormField
                                  control={form.control}
                                  name={eachInput.name}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{eachInput.label} :</FormLabel>
                                      <FormControl>
                                        <Input placeholder={eachInput.placeholder} {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            )}
        
                            For I/P Type: Textarea
                            {((eachInput.type === "textarea") && 
                              <div className="grid gap-3" key={indexInput} >
                                <FormField
                                  control={form.control}
                                  name={eachInput.name}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{eachInput.label} :</FormLabel>
                                      <FormControl>
                                        <Textarea className="min-h-24" placeholder={eachInput.placeholder} {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            )}

                            For I/P Type: Select
                            {((eachInput.type === "select") && 
                              <div className="grid gap-3" key={indexInput} >
                                <FormField
                                  control={form.control}
                                  name={eachInput.name}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{eachInput.label} :</FormLabel>
                                      <Select onValueChange={field.onChange} >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder={eachInput.placeholder} />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>{
                                          eachInput.options?.map((eachOption: any, indexOption: number) => (
                                            <SelectItem key={indexOption} value={eachOption.value}>{eachOption.label}</SelectItem>
                                          ))
                                        }</SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            )}

                            For I/P Type: Radio
                            {((eachInput.type === "radio") && 
                              <div className="grid gap-3" key={indexInput} >
                                <FormField
                                  control={form.control}
                                  name={eachInput.name}
                                  render={({ field }) => (
                                    <FormItem className="space-y-3">
                                      <div className="mb-4">
                                        <FormLabel>{eachInput.label}:</FormLabel>
                                        <FormDescription>
                                          Select the items you want to.
                                        </FormDescription>
                                      </div>
                                      <FormControl>
                                        <RadioGroup
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                          className="flex flex-col space-y-1"
                                        >
                                          {eachInput.options?.map((each: any, index: number) => (
                                            <React.Fragment key={index} >
                                              <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                  <RadioGroupItem value={each.value} />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                  {each.label}
                                                </FormLabel>
                                              </FormItem>
                                            </React.Fragment>
                                          ))}
                                        </RadioGroup>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>                            
                                  )}
                                />
                              </div>
                            )}

                            For I/P Type: Checkbox
                            {((eachInput.type === "checkbox") &&
                              <div className="grid gap-3" key={indexInput} >
                                <FormField
                                  control={form.control}
                                  name={eachInput.name}
                                  render={() => (
                                    <FormItem>
                                      <div className="mb-4">
                                        <FormLabel>{eachInput.label}:</FormLabel>
                                        <FormDescription>
                                          Select the items you want to.
                                        </FormDescription>
                                      </div>
                                      {eachInput.options?.map((each: any, index: number) => (
                                        <FormField
                                          key={index}
                                          control={form.control}
                                          name={eachInput.name}
                                          render={({ field }) => {
                                            return (
                                              <FormItem
                                                key={index}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                              >
                                                <FormControl>
                                                  <Checkbox
                                                    checked={field.value?.includes(each.value)}
                                                    onCheckedChange={(checked) => {
                                                      return checked
                                                        ? field.onChange([...field.value, each.value])
                                                        : field.onChange(
                                                            field.value?.filter(
                                                              (value: any) => value !== each.value
                                                            )
                                                          )
                                                    }}
                                                  />
                                                </FormControl>
                                                <FormLabel className="text-sm font-normal">
                                                  {each.label}
                                                </FormLabel>
                                              </FormItem>
                                            )
                                          }}
                                        />
                                      ))}
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </React.Fragment>
                  ))}

                  <Button type="submit">Update</Button>
                </form>
              </Form>
            </React.Fragment>
          ) : "Backend Error"
        }
      </React.Fragment>
    ) :
    "Let me understand first"
    }
</div>
</div> */}
