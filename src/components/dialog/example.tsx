import React, { useState } from "react";
import Dialog from "./dialog";

function example() {
  const [showDialogInfo, setShowDialogInfo] = useState(second);
  const [dialogInfoContent, setDialogInfoContent] = useState(second); // component !!

  return (
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
  );
}

export default example;
