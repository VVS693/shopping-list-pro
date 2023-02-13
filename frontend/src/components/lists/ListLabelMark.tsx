import Divider from "@mui/material/Divider";
import ShareIcon from "@mui/icons-material/Share";

interface MyListItemProps {
  created?: {
    createdAt?: string;
    timeStyle?: "full" | "long" | "medium" | "short" | undefined;
    dateStyle?: "full" | "long" | "medium" | "short" | undefined;
  };

  updated?: {
    updatedAt?: string;
    timeStyle?: "full" | "long" | "medium" | "short" | undefined;
    dateStyle?: "full" | "long" | "medium" | "short" | undefined;
  };
  itemsAmount?: number;
  isShared?: boolean;
}

export function ListLabelMark({
  created,
  updated,
  itemsAmount,
  isShared,
}: MyListItemProps) {
  const dateLabel = (
    date: string | undefined,
    timeStyle: "full" | "long" | "medium" | "short" | undefined,
    dateStyle: "full" | "long" | "medium" | "short" | undefined
  ) => {
    const dataLabel: string = date
      ? new Date(Date.parse(date)).toLocaleString("en-GB", {
          timeStyle: timeStyle,
          dateStyle: dateStyle,
        })
      : "";
    return dataLabel;
  };

  return (
    <div className="select-none flex">
      {!!created && (
        <div className="select-none pl-1 pr-1 text-xs font-extralight text-light-blue-800">
          {`Crt: ${dateLabel(
            created.createdAt,
            created.timeStyle,
            created.dateStyle
          )}`}
        </div>
      )}

      {!!created && !!updated && <Divider orientation="vertical" flexItem />}

      {!!updated && (
        <div className="select-none pl-1 pr-1 text-xs font-extralight text-light-blue-800">
          {`Upd: ${dateLabel(
            updated.updatedAt,
            updated.timeStyle,
            updated.dateStyle
          )}`}
        </div>
      )}
      {(!!created || !!updated) && !!itemsAmount && (
        <>
          <Divider orientation="vertical" flexItem />

          <div className="select-none pl-1 pr-1 text-xs font-extralight text-light-blue-800">
            {`Items: ${itemsAmount}`}
          </div>
        </>
      )}
      {isShared && (
        <>
          <Divider orientation="vertical" flexItem />
          <ShareIcon sx={{fontSize: "16px"}}  className="px-1 text-light-blue-800" />
        </>
      )}
    </div>
  );
}
