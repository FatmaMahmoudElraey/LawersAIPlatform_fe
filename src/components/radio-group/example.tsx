import React from "react";
import { RadioGroup } from "./radio-group";

function example() {
  return (
    <RadioGroup
      label="Languages"
      direction="horizontal"
      onValueChange={(val) => {
        setSelectedLang(val as AppLangShortcut);
      }}
      value={selectedLang}
      defaultValue={selectedLang}
      justifyContent="justify-start"
      alignItems="items-start"
      gap="gap-3"
      items={Object.values(AppLangEnum).map((lang) => ({
        content: lang,
        value: getShortcutLanguage(lang.toString().toLocaleLowerCase()),
      }))}
    />
  );
}

export default example;
