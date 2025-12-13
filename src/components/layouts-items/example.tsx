import React from "react";
import { GridViewItem } from "./grid-view-item";
import ListView from "./list-view";

function example() {
  return (
    <>
      <GridViewItem
        padding="p-6"
        isSelectableItem={false}
        content={
          <p className="text-center lg:text-xl md:text-xl sm:text-md py-3 text-ellipsis text-nowrap">
            {data.name[shortcutLang]}
          </p>
        }
        actionsButtons={[
          () => (
            <ButtonDialog
              actionStatus={{ status: "Update" }}
              buttonProps={{
                width: 32,
                iconWidth: 14,
                rounded: "rounded-full",
              }}
              dialogProps={{
                title: "Update Level",
                content: (
                  <UpdateLevelForm
                    id={data.id}
                    defaultValue={{
                      arabicName: data.name.ar,
                      englishName: data.name.en,
                      kurdishName: data.name.ku,
                    }}
                  />
                ),
              }}
            />
          ),

          () => (
            <DeleteButtonAlertDialog
              buttonProps={{
                width: 32,
                iconWidth: 14,
                rounded: "rounded-full",
              }}
              dialogProps={{
                deleteEntityAction: onDeleteLevel,
                title: "Delete confirmation",
                description: `Are sure that you want to delete ${data.name[shortcutLang]} level`,
              }}
            />
          ),
        ]}
      />

      <GridView
        gapX="gap-x-1"
        gapY="gap-y-1"
        LargeScreenCol="lg:grid-cols-5"
        mediumScreenCol="md:grid-cols-3"
        smallScreenCol="sm:grid-cols-2"
      >
        {levels?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.data.map((level, j) => (
              <LevelItem key={j} data={level} />
            ))}
          </Fragment>
        ))}
      </GridView>

      <ListViewItem
        content={<p>{question.title[shortcutLang]}</p>}
        isSelectableItem={true}
        onCheckedChange={(checked) => {
          setSelectedAssignQuestions((prev) =>
            prev.find((q) => q.id === question.id)
              ? [...prev.filter((q) => q.id !== question.id)]
              : [...prev, question]
          );
        }}
        actionsButtons={[
          () => (
            <ShredButton
              actionStatus={{ status: "Read" }}
              props={{ width: 32, iconWidth: 14, rounded: "rounded-full" }}
              onClick={() => setSelectedQuestion(question)}
            />
          ),
        ]}
      />

      <ListView direction="vertical" gap="gap-1">
        {assignedQuestions?.map((question) => (
          <QuestionAssignItem
            question={question}
            setSelectedQuestion={setSelectedQuestion}
            setSelectedAssignQuestions={setSelectedAssignedQuestions}
          />
        ))}
      </ListView>
    </>
  );
}

export default example;
