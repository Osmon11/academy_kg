import { useTranslations } from "next-intl";

import { Box } from "@mui/material";

import { IconBanner } from "@/entities/IconBanner";

import { SECTION_MARGIN_TOP } from "@/shared/config/const";

import monitorRecorderIcon from "@/icons/monitor-recorder.svg";
import monitorIcon from "@/icons/monitor.svg";
import mouseSquareIcon from "@/icons/mouse-square.svg";
import smsNotificationIcon from "@/icons/sms-notification.svg";
import smsTrackingIcon from "@/icons/sms-tracking.svg";

import styles from "../styles.module.scss";

export default function HowOurWebinarsPass() {
  const t = useTranslations("HowOurWebinarsPass");
  return (
    <Box sx={{ marginTop: SECTION_MARGIN_TOP }}>
      <Box
        className={styles.icon_banners_wrapper}
      >
        <IconBanner
          color="primary"
          icon={mouseSquareIcon}
          icon_alt="mouse square icon"
          description={t("na-pervom-etape-my")}
          sx={{
            width: {
              xs: "100%",
              md: "calc(50% - 25px)",
            },
          }}
        />
        <IconBanner
          color="secondary"
          icon={smsNotificationIcon}
          icon_alt="mouse square icon"
          description={t(
            "vsem-zaregistrirovannym-na-vebinar",
          )}
          sx={{
            width: {
              xs: "100%",
              md: "calc(50% - 25px)",
            },
          }}
        />
        <IconBanner
          color="primary"
          icon={smsTrackingIcon}
          icon_alt="mouse square icon"
          description={t("za-neskolko-minut-do")}
          sx={{
            width: {
              xs: "100%",
              md: "calc(50% - 25px)",
            },
          }}
        />
        <IconBanner
          color="secondary"
          icon={monitorIcon}
          icon_alt="mouse square icon"
          description={t(
            "nashi-vebinary-provodyatsya-na",
          )}
          sx={{
            width: {
              xs: "100%",
              md: "calc(50% - 25px)",
            },
          }}
        />
        <IconBanner
          color="primary"
          icon={monitorRecorderIcon}
          icon_alt="mouse square icon"
          description={t(
            "v-vebinarnoi-komnate-polzovatel",
          )}
          sx={{ width: "100%" }}
        />
      </Box>
    </Box>
  );
}
