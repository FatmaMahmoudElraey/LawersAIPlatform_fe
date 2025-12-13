import React from "react";
import { Card } from "./card";
import StackPanel from "../ui/stack-panel";
import { Input } from "../input/input";
import { Select } from "../select/select";
import { Checkbox } from "../checkbox/checkbox";

function example() {
  return (
    <Card header={{ title: "Filter" }}>
      <StackPanel
        direction="horizontal"
        gap="gap-2"
        justifyContent="justify-start"
        alignItems="items-center"
        wrapping="flex-wrap"
      >
        <Input
          label="Title"
          placeholder="ex: Question title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          labelLocated="above"
          width={300}
        />

        <Select
          label="Level"
          placeholder="Select Levels"
          isLoading={isLoadingLevels}
          value={level}
          onValueChange={(val) => setLevel(val)}
          groups={
            isSuccessLevels && levels && levels.length > 0
              ? [
                  {
                    items: levels.map((level) => ({
                      content: level.name[shortcutLang],
                      value: JSON.stringify(level),
                    })),
                  },
                ]
              : ([] as any)
          }
        />

        <Checkbox
          value={isExpired}
          onCheckedChange={(checked) => setIsExpired(checked as boolean)}
          content="Is Expired"
          id="is_expired"
        />

        {/* 
        <Select
          label="Category"
          placeholder="Select Categories"
          isLoading={isLoadingCategories}
          value={category}
          // setValue={setCategory}
          onValueChange={(val) => setCategory(val)}
          groups={
            isSuccessCategories && categories && categories.length > 0
              ? [
                  {
                    items: categories.map((category) => ({
                      content: category.name[shortcutLang],
                      value: JSON.stringify(category),
                    })),
                  },
                ]
              : ([] as any)
          }
        /> */}
      </StackPanel>
    </Card>
  );
}

export default example;
