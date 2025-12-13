import React from "react";
import { Select } from "./select";

function example() {
  return (
    <Select
      label="Level"
      placeholder="Select Level"
      isLoading={isLoadingLevels}
      value={level}
      // setValue={setLevel}
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
  );
}

export default example;
