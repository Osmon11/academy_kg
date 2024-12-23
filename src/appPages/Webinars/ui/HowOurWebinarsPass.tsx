import { Box } from "@mui/material";

import { IconBanner } from "@/entities/IconBanner";

import { SECTION_MARGIN_TOP } from "@/shared/config/const";

import monitorRecorderIcon from "@/icons/monitor-recorder.png";
import monitorIcon from "@/icons/monitor.png";
import mouseSquareIcon from "@/icons/mouse-square.png";
import smsNotificationIcon from "@/icons/sms-notification.png";
import smsTrackingIcon from "@/icons/sms-tracking.png";

import styles from "./styles.module.scss";

export default function HowOurWebinarsPass() {
  return (
    <Box sx={{ marginTop: SECTION_MARGIN_TOP }}>
      <div
        className={styles.icon_banners_wrapper}
      >
        <IconBanner
          color="primary"
          icon={mouseSquareIcon}
          icon_alt="mouse square icon"
          description="На первом этапе мы анонсируем вебинар, размещая баннер на страницах нашего сайта. Описание мероприятия помогает пользователю понять, какую пользу вебинар принесет для его  развития."
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
          description="Всем зарегистрированным на вебинар пользователям приходят напоминания о предстоящем вебинаре на почту, обычно это уведомления за сутки и за час до начала вебинара."
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
          description="За несколько минут до начала, каждый участник получает индивидуальную ссылку на мероприятие — по ней пользователь попадает уже непосредственно навебинарную комнату."
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
          description="Наши вебинары проводятся на платформе Zoom. У участников вебинара должно быть установлено приложение Zoom, которое бесплатно доступно для Windows, Linux, macOS, iOS, Android и Chrome OS."
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
          description="В вебинарной комнате пользователь обычно видит небольшое окно с видеотрансляцией веб-камеры преподавателя, презентацию и чат, в котором можно общаться с другими участниками мероприятия и задавать вопросы преподавателю. Преподаватели часто поддерживают устный рассказ визуальной презентацией, чтобы участникам было легче воспринимать информацию. Презентация состоит из краткой информационной выжимки по теме, изображений, графиков или видео — всего, что облегчает восприятие информации. На вебинарах практических занятий по Корану, участники также могут включать свои микрофоны: преподаватель просит поочередно каждого студента включить микрофон, слушает его чтение и исправляет его ошибки, в то время, как остальные участники слушают, в ожидании своей очереди."
          sx={{ width: "100%" }}
        />
      </div>
    </Box>
  );
}
