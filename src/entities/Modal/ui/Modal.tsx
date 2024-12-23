import Image from "next/image";

import {
  Box,
  IconButton,
  Modal as MuiModal,
  Typography,
} from "@mui/material";

import closeIcon from "@/icons/close.png";

import styles from "./Modal.module.scss";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  title?: string;
}

export function Modal({
  open,
  handleClose,
  title,
}: ModalProps) {
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      className={styles.modal}
    >
      <Box className={styles.content}>
        <div className={styles.header}>
          <IconButton
            className={styles.close_button}
          >
            <Image
              src={closeIcon}
              alt="close icon"
              width={24}
              height={24}
            />
          </IconButton>
          {Boolean(title) && (
            <Typography
              variant="h6"
              fontWeight={600}
              color="primary"
              textAlign="center"
            >
              {title}
            </Typography>
          )}
        </div>
      </Box>
    </MuiModal>
  );
}
