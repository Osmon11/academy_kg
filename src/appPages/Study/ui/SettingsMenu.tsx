import {
  useLocale,
  useTranslations,
} from "next-intl";
import Image from "next/image";
import { Fragment, useState } from "react";

import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import { ShareDialog } from "@/entities/ShareDialog";

import { useAppSelector } from "@/shared/config/store";
import { routePath } from "@/shared/functions";
import { useAppRouter } from "@/shared/hooks/useAppRouter";
import { getPathname } from "@/shared/i18n/routing";

import bookSquareIconPrimary from "@/icons/book-square-primary.svg";
import settingIconPrimary from "@/icons/settng-primary.svg";
import shareIconPrimary from "@/icons/share-primary.svg";

import styles from "../styles.module.scss";

export default function SettingsMenu() {
  const t = useTranslations("SettingsMenu");
  const locale = useLocale();
  const router = useAppRouter();
  const course = useAppSelector(
    (store) => store.course.course,
  );
  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [dialog, setDialog] = useState(false);
  return (
    <Fragment>
      <IconButton
        aria-controls={
          open ? "settings-menu" : undefined
        }
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <Image
          src={settingIconPrimary}
          alt="setting green icon"
          width={24}
          height={24}
        />
      </IconButton>
      {course && (
        <Fragment>
          <Menu
            id="settings-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby":
                "settings-button",
              color: "primary",
            }}
          >
            <MenuItem
              className={styles.menu_item}
              onClick={() => {
                setAnchorEl(null);
                router.push("[course]", {
                  dynamicPaths: {
                    course: course.id,
                  },
                });
              }}
            >
              <Image
                src={bookSquareIconPrimary}
                alt="book square green icon"
                width={24}
                height={24}
              />
              {t("o-kurse")}
            </MenuItem>
            <Divider />
            <MenuItem
              className={styles.menu_item}
              onClick={() => {
                setAnchorEl(null);
                setDialog(true);
              }}
            >
              <Image
                src={shareIconPrimary}
                alt="share green icon"
                width={24}
                height={24}
              />
              {t("podelitsya-kursom")}
            </MenuItem>
          </Menu>
          <ShareDialog
            open={dialog}
            handleClose={() => setDialog(false)}
            title={t("podelitsya-kursom")}
            shareText={course.title}
            shareUrl={
              window.location.origin +
              getPathname({
                locale,
                href: routePath("[course]", {
                  dynamicPaths: {
                    course: course.id,
                  },
                }),
              })
            }
          />
        </Fragment>
      )}
    </Fragment>
  );
}
