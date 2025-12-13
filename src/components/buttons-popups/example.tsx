import React from "react";
import {
  ButtonDialog,
  ButtonGoToPage,
  ButtonPopover,
  ButtonSheet,
  DeleteButtonAlertDialog,
  DeleteButtonPopover,
  ShredButton,
} from "./buttons-popups";
import { KeyRound } from "lucide-react";

function example() {
  return (
    <>
      <ShredButton
        actionStatus={{ status: "Read" }}
        props={{ width: 32, iconWidth: 14, rounded: "rounded-full" }}
        onClick={() => {}}
      />

      <ButtonSheet
        actionStatus={{ status: "Create" }}
        buttonProps={{ content: "Create Employee" }}
        sheetProps={{
          title: "Create New Employee",
          description:
            "Please fill all required field to be able to create an employee",
          content: <CreateEmployeeForm />,
        }}
      />

      <ButtonDialog
        actionStatus={{ status: "Create" }}
        buttonProps={{
          size: "lg",
          rounded: "rounded-full",
          width: 64,
          iconWidth: 28,
        }}
        dialogProps={{
          title: "Create Category",
          description: `Please fill category's name in all languages`,
          content: <CreateCategoryForm />,
        }}
      />

      <ButtonPopover
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
                admin.permissions!.find((per) => per.model === "exam")?.id ??
                undefined
              }
              employeesPermissionId={
                admin.permissions!.find((per) => per.model === "user")?.id ??
                undefined
              }
              questionsPermissionId={
                admin.permissions!.find((per) => per.model === "question")
                  ?.id ?? undefined
              }
              answersPermissionId={
                admin.permissions!.find((per) => per.model === "answer")?.id ??
                undefined
              }
              defaultValue={{
                employeesActions:
                  admin.permissions!.find((per) => per.model === "user")
                    ?.actions ?? undefined,
                examsActions:
                  admin.permissions!.find((per) => per.model === "exam")
                    ?.actions ?? undefined,
                questionsAnswersActions:
                  admin.permissions!.find((per) => per.model === "question")
                    ?.actions ?? undefined, // You don't answers permissions because question & answers have the same actions
              }}
            />
          ),
        }}
      />

      <ButtonGoToPage
        actionStatus={{ status: "Create" }}
        buttonProps={{ content: "Create Exam" }}
        goToPageFunction={() => router.push(AppCentralsRoutes.ExamCreate)}
      />

      <DeleteButtonPopover
        confirmButtonText="continue"
        message={`Are sure that you want to delete this user (${admin.name})`}
        buttonProps={{ size: "sm" }}
        deleteEntityAction={() => onDeleteAdmin(admin)}
      />

      <DeleteButtonAlertDialog
        buttonProps={{ width: 32, iconWidth: 14, rounded: "rounded-full" }}
        dialogProps={{
          deleteEntityAction: () => {},
          title: "Delete confirmation",
          description: `Are sure that you want to delete ${data.name[shortcutLang]} category`,
        }}
      />
    </>
  );
}

export default example;
