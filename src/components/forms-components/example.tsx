import React from "react";
import {
  DefaultEmptyStateDropZone,
  FormFields,
  FormFileDropZone,
  FormFileInput,
  FormInput,
  FormMultiFiles,
  FormSelect,
} from "./forms-components";

function example() {
  const onSubmit = async (formData: TSingInForm) => {
    setIsButtonDisabled(true);
    const { name, password, keepMeSignedIn } = formData;

    await signInMutation.mutateAsync(
      { name, password, keepMeSignedIn },
      {
        async onSuccess(signedInUser, __) {},
        onError: () => {
          setIsButtonDisabled(false);
        },
      }
    );

    form.reset();
  };

  const form = useCreateAdminForm();

  return (
    <FormFields
      buttonProps={{
        content: isCreateState ? "submit" : "save",
        isDisabled: isButtonDisabled,
      }}
      form={form}
      onSubmit={onSubmit}
      gapY="gap-y-2"
      fields={[
        () => (
          <FormInput
            key="name"
            name="name"
            control={form.control}
            required={isCreateState ? true : false}
            input={{
              placeholder: "ex: Anmar",
              defaultValue: defaultValues.name,
              type: "text",
              label: "Name",
            }}
          />
        ),
        () => (
          <FormInput
            key="password"
            name="password"
            control={form.control}
            required={isCreateState ? true : false}
            input={{
              placeholder: "ex: 123456",
              defaultValue: defaultValues.password,
              type: "text",
              label: "Password",
            }}
          />
        ),
        () => (
          <FormSelect
            key="responsibleOnCategory"
            name="responsibleOnCategory"
            control={form.control}
            required={isCreateState ? true : false}
            select={{
              placeholder: "Select Category",
              ...(defaultValues?.responsibleOnCategory && {
                defaultValue: JSON.stringify(
                  defaultValues.responsibleOnCategory
                ),
              }),
              isLoading: isLoadingCategories,
              label: "Responsible on Category",
              groups: [
                {
                  items:
                    categories && categories?.length > 0
                      ? categories?.map(
                          (category) =>
                            ({
                              content: category.name[shortcutLang],
                              value: JSON.stringify(category),
                            } as ISelectItem)
                        )
                      : ([] as any),
                },
              ],
            }}
          />
        ),
        () => (
          <FormInput
            key="email"
            name="email"
            control={form.control}
            required={false}
            input={{
              placeholder: "ex: example@gmail.com",
              defaultValue: defaultValues.email,
              type: "text",
              label: "Email",
            }}
          />
        ),
        () => (
          <FormFileInput
            key="image"
            name="image"
            control={form.control}
            required={false}
            input={{
              placeholder: "Upload image",
              label: "Admin Image",
            }}
          />
        ),
        () => (
          <FormFileDropZone
            control={form.control}
            label="Image"
            name="image"
            acceptFiles={{ "images/*": [] }}
            maxFiles={4}
            maxSize={25 * 1024 * 1024}
            required={true}
            minSize={1 * 1024}
            onError={(err) => toast.error(err.message)}
            emptyStateContent={
              <DefaultEmptyStateDropZone
                // defaultImageUrl={AdminImage}
                allowedFiles={acceptedImagesExtensions}
                maxFileSizeInMB={25}
              />
            }
          />
        ),
        () => (
          <FormMultiFiles
            control={form.control}
            label="Images"
            name="images"
            required={true}
            acceptedFiles={acceptedImagesExtensions
              .map((image) => `image/${image}`)
              .join(", ")}
          />
        ),
      ]}
    />
  );
}

export default example;
