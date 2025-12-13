"use client";

import { limitDefaultValues } from "@/helpers/dtos/pagination.dto";
import { SortingState } from "@tanstack/react-table";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { AccountType, Admin, Category, Employee } from "@/app/_shared/models";
import { calculateOffset } from "@/helpers/fetch/axios/axios.helper";
import {
  getDirectionValue,
  getShortcutNameAvatar,
} from "@/helpers/shared/stringOperations.helper";
import { useToast } from "@/hooks/use-toast";
import { errorToast } from "@/helpers/fetch/server/server.helper";
// import EmptyResultsImage from '@/assets/images/no-result.png';
import AdminImage from "./_data/images/admin.png";
import EmptyResult from "@/components/placeholders/empty-results";
import LargeLoader from "@/components/loaders/large-loader";
import { DataTable } from "@/components/data-table/data-table";
import {
  ButtonPopoverProps,
  ButtonSheet,
  DeleteButtonPopover,
  DeleteSharedButton,
  ShredButton,
} from "@/components/buttons-popups/buttons-popups";
import { useMediaFileFetch } from "@/helpers/mediaFiles/mediaFiles.fetch";
import { useMediaFilesStore } from "@/helpers/mediaFiles/mediaFiles.store";
import { entityColumns } from "@/components/data-table/data-table-columns-generator";
import { aesDecrypt } from "@/helpers/security/aes.helper";
import { convertDate } from "@/helpers/shared/dateOperations.shared";
import { useShortcutLang } from "@/hooks/use-shortcut-lang";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminQueryKeys, useAdminsFetch } from "./_fetch/admins.fetch";
import { useAdminsStore } from "./_store/admins.store";
import { adminsColumns } from "./_data/admins-columns";
import UpdateAdminForm from "./_forms/admins-forms/update-admin.form";
import CreateAdminForm from "./_forms/admins-forms/create-admin.form";
import PageContent from "@/components/content/content";
import { usePermissionsFetch } from "./_fetch/permissions.fetch";
import { usePermissionsStore } from "./_store/permissions.store";
import { AxeIcon, Copy, KeyRound, PanelsTopLeft } from "lucide-react";
import UpdatePermissionForm from "./_forms/permissions-forms/upate-permission.form";
import AdminsFilter, { IAdminsFilterProps } from "./_filter/admins.filter";
import StackPanel from "@/components/ui/stack-panel";
import { useAuthentication } from "@/hooks/user-user-auth";
import { DataTableSkeleton } from "@/components/data-table/data-table.skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { SmallButtonSkeleton } from "@/components/skeleton/buttons-skeleton";
import { parseAsInteger, useQueryState } from "nuqs";
import Dialog from "@/components/dialog/dialog";
import { DropDown } from "@/components/drop-down/drop-down";
import Dialog1 from "./dialogs/dialog1";
import Dialog2 from "./dialogs/dialog2";

function AdminsPage() {
  const { shortcutLang } = useShortcutLang();

  // Data table states
  const limits = useMemo(() => limitDefaultValues, [limitDefaultValues]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedLimit, setSelectedLimit] = useState<number>(limits[0]);
  const [sorting, setSorting] = useState<SortingState>([]);

  // MediaFiles and Employees APIS
  const { useDeleteAPI, useGetAPI, useCreateAPI, useUpdateAPI } =
    useAdminsFetch();
  const {
    useCreateAPI: useCreatePermissionAPI,
    useUpdateAPI: useUpdatePermissionAPI,
  } = usePermissionsFetch();
  const {
    useUploadOneUserImagesAPI,
    useAssignMediaFileAPI,
    useDeleteMediaFileAPI,
  } = useMediaFileFetch();

  // Filter
  const [name, setName] = useState<IAdminsFilterProps["name"]>();
  const [email, setEmail] = useState<IAdminsFilterProps["email"]>();
  const [category, setCategory] = useState<IAdminsFilterProps["category"]>();

  const onChangeFilterProps = (filter: IAdminsFilterProps) => {
    setCategory(filter.category);
    setName(filter.name);
    setEmail(filter.email);
  };

  // Fetching Data
  const {
    isError: isErrorAdmin,
    isSuccess: isSuccessAdmin,
    isLoading: isLoadingAdmin,
    error: errorAdmin,
    data: admins,
    refetch: refetchAdmins,
  } = useGetAPI({
    query: {
      mediaFilesFields: { image: "UserImage" },
      relationalFields: "responsibleOnCategory,permissions",
    },
    filter: {
      ...((email || name || category) && {
        ...(category && {
          responsibleOnCategoryId: {
            equals: (JSON.parse(category) as Category).id,
          },
        }),
        ...(email && {
          email: { startsWith: email.toLocaleLowerCase(), mode: "insensitive" },
        }),
        ...(name && {
          name: { startsWith: name.toLocaleLowerCase(), mode: "insensitive" },
        }),
      }),
      isDeleted: { equals: false },
    },
    pagination: {
      offset: calculateOffset(selectedPage, selectedLimit),
      limit: selectedLimit,
    },
    order: {
      field: sorting && sorting[0]?.id ? sorting[0]?.id : "createdAt",
      direction:
        sorting && sorting[0]?.desc
          ? getDirectionValue(sorting[0]?.desc)
          : "desc",
    },
  });

  useEffect(() => {
    setSelectedPage(1);
    refetchAdmins();
  }, [name, email, category]);

  // Store
  const createAdminMutation = useCreateAPI({ page: 1 });
  const updateAdminMutation = useUpdateAPI({ page: selectedPage });
  const deleteAdminMutation = useDeleteAPI({ page: selectedPage });
  const uploadOneUserImagesMutation = useUploadOneUserImagesAPI();
  const assignMediaFileMutation = useAssignMediaFileAPI();
  const deleteMediaFileMutation = useDeleteMediaFileAPI();
  const createPermissionMutation = useCreatePermissionAPI({ page: 1 });
  const updatePermissionMutation = useUpdatePermissionAPI({
    page: selectedPage,
  });

  // defining mutation store for rendering in page level
  const setCreateAdminMutation = useAdminsStore(
    (state) => state.setCreateAdminMutation
  );
  const setUpdateAdminMutation = useAdminsStore(
    (state) => state.setUpdateAdminMutation
  );
  const setDeleteAdminMutation = useAdminsStore(
    (state) => state.setDeleteAdminMutation
  );
  const setRefetch = useAdminsStore((state) => state.setRefetch);
  const setSetSelectedPage = useAdminsStore(
    (state) => state.setSetSelectedPage
  );
  const setAssignMediaFileMutation = useMediaFilesStore(
    (state) => state.setAssignMediaFileMutation
  );
  const setUploadMediaFileMutation = useMediaFilesStore(
    (state) => state.setUploadMediaFileMutation
  );
  const setDeleteMediaFileMutation = useMediaFilesStore(
    (state) => state.setDeleteMediaFileMutation
  );
  const setCreatePermissionMutation = usePermissionsStore(
    (state) => state.setCreatePermissionMutation
  );
  const setUpdatePermissionMutation = usePermissionsStore(
    (state) => state.setUpdatePermissionMutation
  );

  useEffect(() => {
    setCreateAdminMutation(createAdminMutation);
    setUpdateAdminMutation(updateAdminMutation);
    setDeleteAdminMutation(deleteAdminMutation);
    setSetSelectedPage(setSelectedPage);
    setRefetch(refetchAdmins);

    setAssignMediaFileMutation(assignMediaFileMutation);
    setUploadMediaFileMutation(uploadOneUserImagesMutation);
    setDeleteMediaFileMutation(deleteMediaFileMutation);

    setCreatePermissionMutation(createPermissionMutation);
    setUpdatePermissionMutation(updatePermissionMutation);

    refetchAdmins();
  }, []);

  const { toast: shadcnUIToast } = useToast();

  useEffect(() => {
    if (isErrorAdmin) errorToast(shadcnUIToast, errorAdmin);
  }, [isErrorAdmin]);

  const onDeleteAdmin = async (user: Admin) => {
    try {
      await deleteAdminMutation.mutateAsync(user.id);
      if (user.imageId) {
        await deleteMediaFileMutation.mutateAsync(user.imageId);
      }
      setSelectedPage(selectedPage);
      refetchAdmins();
    } catch (error) {
      console.log(error);
    }
  };

  // Multi Select Functionality
  const [selectedAdmins, setSelectedAdmins] = useState<Admin[]>([]);

  useEffect(() => {
    console.log(selectedAdmins);
  }, [selectedAdmins]);

  // Dialog & DropDownActions Functionality
  const [showDialogInfo, setShowDialogInfo] = useState(false);
  const [dialogInfoContent, setDialogInfoContent] = useState<
    React.ReactNode | undefined
  >(undefined);

  const showContent = () => {
    if (isSuccessAdmin && !!admins && admins?.data?.length > 0) {
      return (
        <DataTable
          columns={entityColumns<Admin>({
            entityProperties: adminsColumns(),
            onRowSelection: (admin, checked) => {
              if (checked) {
                setSelectedAdmins((old) => [...old, admin]);
              } else {
                setSelectedAdmins((old) => [
                  ...old.filter((ad) => {
                    if (ad.id !== admin.id) {
                      return ad;
                    }
                  }),
                ]);
              }
            },
            onAllRowsSelection: (admins, checked) => {
              if (checked) {
                setSelectedAdmins(admins);
              } else {
                setSelectedAdmins([]);
              }
            },
            actionColumns: [
              {
                id: "permissions",
                header: "Permissions",
                actions: [
                  (admin) => (
                    <ButtonPopoverProps
                      actionStatus={{
                        status: "Other",
                        otherBgColor: "#a855f7",
                        otherBgHoverColor: "#7c3aed",
                        otherIcon: <KeyRound />,
                      }}
                      buttonProps={{ size: "sm" }}
                      popoverProps={{
                        content: (
                          <UpdatePermissionForm
                            adminId={admin.id}
                            examsPermissionId={
                              admin.permissions!.find(
                                (per) => per.model === "exam"
                              )?.id ?? undefined
                            }
                            employeesPermissionId={
                              admin.permissions!.find(
                                (per) => per.model === "user"
                              )?.id ?? undefined
                            }
                            questionsPermissionId={
                              admin.permissions!.find(
                                (per) => per.model === "question"
                              )?.id ?? undefined
                            }
                            answersPermissionId={
                              admin.permissions!.find(
                                (per) => per.model === "answer"
                              )?.id ?? undefined
                            }
                            defaultValue={{
                              employeesActions:
                                admin.permissions!.find(
                                  (per) => per.model === "user"
                                )?.actions ?? undefined,
                              examsActions:
                                admin.permissions!.find(
                                  (per) => per.model === "exam"
                                )?.actions ?? undefined,
                              questionsAnswersActions:
                                admin.permissions!.find(
                                  (per) => per.model === "question"
                                )?.actions ?? undefined, // You don't answers permissions because question & answers have the same actions
                            }}
                          />
                        ),
                      }}
                    />
                  ),
                ],
              },
              {
                id: "actions",
                header: "Actions",
                actions: [
                  (admin) => (
                    <ButtonSheet
                      actionStatus={{ status: "Update" }}
                      sheetProps={{
                        title: "Update Admin",
                        content: (
                          <UpdateAdminForm
                            id={admin.id}
                            defaultValue={{
                              email: admin.email,
                              password: aesDecrypt(admin.plainPassword),
                              responsibleOnCategory:
                                admin.responsibleOnCategory,
                              name: admin.name,
                              image: admin?.image ? admin?.image[0] : undefined,
                              permissions: admin.permissions ?? undefined,
                            }}
                          />
                        ),
                      }}
                      buttonProps={{ size: "sm" }}
                    />
                  ),
                  (admin) => (
                    <DeleteButtonPopover
                      confirmButtonText="continue"
                      message={`Are sure that you want to delete this user (${admin.name})`}
                      buttonProps={{ size: "sm" }}
                      deleteEntityAction={() => onDeleteAdmin(admin)}
                    />
                  ),
                ],
              },
            ],
            cellCustomization: ({ cell }) => {
              if (cell.column.id === "plainPassword") {
                return aesDecrypt(
                  (cell.getValue() as any).toString()
                )?.toString();
              } else if (cell.column.id === "createdAt") {
                return convertDate((cell.getValue() as any).toString());
              } else if (cell.column.id === "isActive") {
                return JSON.stringify(cell.getValue() as any);
              } else if (cell.column.id === "responsibleOnCategory") {
                return (cell.row.original as Admin).responsibleOnCategory.name[
                  shortcutLang
                ];
              } else if (cell.column.id === "email") {
                return cell.row.original.email ? (
                  <p className="text-primary">{cell.row.original.email}</p>
                ) : (
                  <p className="text-red-500">---</p>
                );
              } else {
                return cell.getValue() as string;
              }
            },
            customColumns: [
              {
                accessorKey: "profileImage",
                cellContent: (admin) => (
                  <Avatar>
                    <AvatarImage
                      src={admin?.image ? admin?.image[0]?.path : undefined}
                      alt="admin_image"
                    />

                    <AvatarFallback>
                      {getShortcutNameAvatar(admin.name)}
                    </AvatarFallback>
                  </Avatar>
                ),
              },
            ],
            isHidableColumns: true,
            isSortableColumns: true,
            dropDownActions: {
              id: "more_actions",
              header: "More Actions",
              dropDownComponent: (admin: Admin) => (
                <DropDown
                  groups={[
                    {
                      items: [
                        {
                          label: "Info 1 ",
                          status: "Delete",
                          action: () => {
                            setShowDialogInfo(true);
                            setDialogInfoContent(<Dialog1 />);
                          },
                          icon: <Copy />,
                        },
                        {
                          label: "Info 2",
                          status: "Other",
                          action: () => {
                            setShowDialogInfo(true);
                            setDialogInfoContent(<Dialog2 />);
                          },
                          icon: <PanelsTopLeft />,
                        },
                      ],
                    },
                  ]}
                />
              ),
            },
            isExpandedRow: true,
            isSelectionRowsEnable: true,
          })}
          extraButtonsActions={
            selectedAdmins && selectedAdmins.length > 0
              ? [
                  () => (
                    <ShredButton
                      actionStatus={{ status: "Create" }}
                      props={{ content: "Create Sub Admins" }}
                    />
                  ),
                  () => (
                    <DeleteSharedButton props={{ content: "Delete Admin" }} />
                  ),
                ]
              : []
          }
          expandedRowContent={(admin) => (
            <div className="flex flex-col gap-2">
              <p>
                <b>Name: </b>
                {admin.name}
              </p>
              <p>
                <b>Email: </b>
                {admin.email ?? "---"}
              </p>
              <p>
                <b>Is Active: </b>
                {admin.isActive ? (
                  <span className="text-green-500 inline">
                    {JSON.stringify(admin.isActive)}{" "}
                  </span>
                ) : (
                  <span className="text-red-500 inline">
                    {JSON.stringify(admin.isActive)}{" "}
                  </span>
                )}
              </p>
            </div>
          )}
          createButtonAction={
            <ButtonSheet
              actionStatus={{ status: "Create" }}
              buttonProps={{ content: "Create Admin" }}
              sheetProps={{
                title: "Create New Admin",
                description:
                  "Please fill all required field to be able to create an admin",
                content: <CreateAdminForm />,
              }}
            />
          }
          data={admins}
          entitiesCashName={AdminQueryKeys.Plural}
          limits={limits}
          numberPagesToShow={4}
          states={{
            limitStates: { selectedLimit, setSelectedLimit },
            pagesStates: { selectedPage, setSelectedPage },
            sortingStates: { setSorting, sorting },
          }}
        />
      );
    } else if (isLoadingAdmin) {
      return (
        <DataTableSkeleton
          columnsNames={adminsColumns()}
          showColumnsButton={true}
          rowsNumber={8}
          cellContent={<Skeleton className="rounded-md w-[80px] h-[40px] " />}
          customColumns={[
            {
              header: "Profile Image",
              cellContent: () => (
                <Skeleton className="rounded-full w-[40px] h-[40px]" />
              ),
            },
          ]}
          actionColumns={[
            {
              header: "Permissions",
              actions: [() => <SmallButtonSkeleton />],
            },
            {
              header: "Actions",
              actions: [
                () => <SmallButtonSkeleton />,
                () => <SmallButtonSkeleton />,
              ],
            },
          ]}
        />
      );
    } else {
      return (
        <EmptyResult
          imageUrl={AdminImage}
          message="No admins to show"
          button={{ onClick: () => refetchAdmins() }}
        />
      );
    }
  };

  return (
    <PageContent>
      <StackPanel
        direction="vertical"
        gap="gap-4"
        justifyContent="justify-start"
        alignItems="items-stretch"
      >
        <AdminsFilter onChange={onChangeFilterProps} />
        {showContent()}

        <Dialog
          title="Info"
          width={200}
          isOpen={showDialogInfo}
          closeButton={{
            content: "Close",
            onClose: () => {
              setShowDialogInfo(false);
            },
          }}
        >
          {dialogInfoContent}
        </Dialog>
      </StackPanel>
    </PageContent>
  );
}

export default AdminsPage;
