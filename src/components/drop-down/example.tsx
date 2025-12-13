import React from "react";

function example() {
  return (
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
  );
}

export default example;
