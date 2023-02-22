import Divider from "@mui/material/Divider";
import ShareIcon from "@mui/icons-material/Share";

interface ListLabelMarkProps {
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
  itemsAmount?: number | Promise<number>;
  isShared?: boolean;
}

export function ListLabelMark({
  created,
  updated,
  itemsAmount,
  isShared,
}: ListLabelMarkProps) {
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
    <div className="select-none min-w-[250px] flex items-center h-[22px]">
      {!!created  && (
        <div className="select-none text-xs font-extralight text-light-blue-800">
          {`Crt: ${dateLabel(
            created?.createdAt,
            created?.timeStyle,
            created?.dateStyle
          )}`}
        </div>
      )}

      {!!created && !!updated && <Divider orientation="vertical" flexItem sx={{marginX: "4px"}} />}

      {!!updated && (
        <div className="select-none text-xs font-extralight text-light-blue-800">
          {`Upd: ${dateLabel(
            updated.updatedAt,
            updated.timeStyle,
            updated.dateStyle
          )}`}
        </div>
      )}
      {(!!created || !!updated) && !!itemsAmount && (
        <>
          <Divider orientation="vertical" flexItem sx={{marginX: "4px"}} />

          <div className="select-none text-xs font-extralight text-light-blue-800">
            {`Items: ${itemsAmount}`}
          </div>
        </>
      )}
      {isShared && (
        <>
          <Divider orientation="vertical" flexItem sx={{marginX: "4px"}} />
          <ShareIcon sx={{fontSize: "22px"}}  className="px-1 text-light-blue-800" />
        </>
      )}
    </div>
  );
}
