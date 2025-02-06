import Image from "next/image";
import { toast } from "react-toastify";

import {
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

import copyPrimaryIcon from "@/icons/copy-primary.svg";
import facebookPrimaryIcon from "@/icons/facebook-primary.svg";
import telegramPrimaryIcon from "@/icons/telegram-primary.svg";
import whatsappPrimaryIcon from "@/icons/whatsapp-primary.svg";
import closeBlackIcon from "@/icons/x-close-black.svg";

import styles from "./ShareDialog.module.scss";

interface IShareDialogProps {
  open: boolean;
  handleClose: () => void;
  shareText: string;
  shareUrl: string;
  title?: string;
}

export function ShareDialog({
  open,
  handleClose,
  shareText,
  shareUrl,
  title,
}: IShareDialogProps) {
  const encodedText =
    encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);
  const buttons = [
    {
      label: "WhatsApp",
      icon: whatsappPrimaryIcon,
      alt: "whatsapp green icon",
      handleClick: () =>
        window.open(
          `https://wa.me/?text=${encodedText} ${encodedUrl}`,
          "_blank",
        ),
    },
    {
      label: "Telegram",
      icon: telegramPrimaryIcon,
      alt: "telegram green icon",
      handleClick: () =>
        window.open(
          `https://t.me/share/url?text=${encodedText}&url=${encodedUrl}`,
          "_blank",
        ),
    },
    {
      label: "Facebook",
      icon: facebookPrimaryIcon,
      alt: "facebook green icon",
      handleClick: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          "_blank",
        ),
    },
    {
      label: "Скопировать",
      icon: copyPrimaryIcon,
      alt: "copy green icon",
      handleClick: () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success("Скопировано!");
      },
    },
  ];
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle
        color="textSecondary"
        textAlign="center"
      >
        {title ?? "Поделиться"}
      </DialogTitle>
      <IconButton
        className="close_dialog_button"
        aria-label="close"
        onClick={handleClose}
      >
        <Image
          src={closeBlackIcon}
          alt="x close black icon"
          width={24}
          height={24}
        />
      </IconButton>
      <DialogActions>
        {buttons.map((item, index) => (
          <IconButton
            key={item.label + index}
            className={styles.icon_button}
            disableTouchRipple
            onClick={item.handleClick}
          >
            <Image
              src={item.icon}
              alt={item.alt}
              width={24}
              height={24}
            />
            <Typography
              variant="caption"
              fontWeight={600}
              color="textTertiary"
              align="center"
            >
              {item.label}
            </Typography>
          </IconButton>
        ))}
      </DialogActions>
    </Dialog>
  );
}
