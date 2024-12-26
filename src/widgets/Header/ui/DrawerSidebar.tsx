"use client";

import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";

import { IProfile } from "@/shared/types";

import logoPrimaryIcon from "@/icons/logo-primary.svg";
import xCloseBlackIcon from "@/icons/x-close-black.svg";

import LanguageSelect from "./LanguageSelect";
import LoginButton from "./LoginButton";
import UserProfile from "./UserProfile";
import styles from "./styles.module.scss";

interface IDrawerSidebarProps {
  open: boolean;
  handleDrawerClose: () => void;
  navLinks: { label: string; href: string }[];
  profile: IProfile | null;
}

export default function DrawerSidebar({
  open,
  handleDrawerClose,
  navLinks,
  profile,
}: IDrawerSidebarProps) {
  const pathname = usePathname();
  const up400 = useMediaQuery(
    "(min-width:400px)",
  );
  return (
    <Drawer
      anchor="left"
      open={open}
      sx={{
        ".MuiDrawer-paper": {
          width: up400 ? "400px" : "100vw",
          padding: "16px 20px",
        },
      }}
    >
      <div className={styles.drawer_header}>
        <Link href="/">
          <Image
            src={logoPrimaryIcon}
            alt="islamic online-academy green icon"
            width={40}
            height={40}
          />
        </Link>
        <IconButton onClick={handleDrawerClose}>
          <Image
            src={xCloseBlackIcon}
            alt="x close black icon"
            width={30}
            height={30}
          />
        </IconButton>
      </div>
      <List
        disablePadding
        sx={{ marginTop: "30px" }}
      >
        {navLinks.map((navItem, index) => {
          const isActive =
            pathname === navItem.href;
          return (
            <ListItem
              key={navItem.label + index}
              disablePadding
              sx={{ marginBottom: "30px" }}
            >
              <Link
                href={navItem.href}
                className={classNames(
                  styles.nav_link,
                  {
                    [styles.active]: isActive,
                  },
                )}
              >
                <ListItemButton
                  sx={{
                    padding: "0px",
                  }}
                >
                  <ListItemText
                    primary={navItem.label}
                    slotProps={{
                      primary: {
                        variant: "body2",
                        color: isActive
                          ? "primary"
                          : "textSecondary",
                        textTransform:
                          "uppercase",
                        sx: {
                          fontWeight: {
                            xs: 500,
                            sm: 600,
                          },
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
      {profile ? (
        <UserProfile profile={profile} />
      ) : (
        <LoginButton />
      )}
      <Box sx={{ marginTop: "30px" }}>
        <LanguageSelect color="black" />
      </Box>
    </Drawer>
  );
}
