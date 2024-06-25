import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";

import i18n from "../../lang";

dayjs.extend(dayOfYear);

export const options = [
  // {
  //   value: '',
  //   label: i18n.t('report.all'),
  //   key: 'all',
  // },
  {
    value: "TWENTYFOURHOUR",
    label: "24 hours",
    key: "24hours",
  },
  {
    value: "SEVEN",
    label: i18n.t("report.lastSevenDays"),
    key: "lastSevenDays",
  },
  {
    value: "THIRTY",
    label: i18n.t("report.lastThirtyDays"),
    key: "lastThirtyDays",
  },
  {
    value: "MONTH",
    label: i18n.t("report.theMonth"),
    key: "theMonth",
  },
  {
    value: "YEAR",
    label: i18n.t("report.theYear"),
    key: "theYear",
  },
];
