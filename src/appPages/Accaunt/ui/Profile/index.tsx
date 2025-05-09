"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import { Footer } from "@/widgets/Footer";

import { GoBackHeader } from "@/entities/GoBackHeader";

import {
  ControllerRadioGroup,
  ControllerTextField,
  TubeSpinner,
} from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/config/store";
import { setUserProfile } from "@/shared/model";
import { IProfile } from "@/shared/types";

import avatarGrayIcon from "@/icons/avatar-gray.svg";
import editCoalGrayIcon from "@/icons/edit-coal-gray.svg";

import styles from "./styles.module.scss";

type FormTypes = Pick<
  IProfile,
  "gender" | "phone" | "name" | "surname"
>;

export function ProfilePage() {
  const t = useTranslations("ProfilePage");
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector(
    (store) => store.user,
  );
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormTypes>({
    defaultValues: {
      name: "",
      surname: "",
      phone: "",
      gender: "",
    },
  });
  const [saving, setSaving] = useState(false);
  const avatarUploadInput =
    useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  useEffect(() => {
    if (profile && !loading) {
      for (const key in getValues()) {
        setValue(
          key as keyof FormTypes,
          profile[key as keyof FormTypes],
        );
      }
    }
  }, [profile, loading, getValues, setValue]);

  function onSubmit(data: FormTypes) {
    setSaving(true);
    const formData = new FormData();
    for (const key in data) {
      formData.append(
        key,
        data[key as keyof FormTypes],
      );
    }
    if (file) {
      formData.append("avatar", file);
    }
    axiosInstance
      .put<IProfile>("/auth/profile/", formData)
      .then((res) => {
        if (res?.data?.id) {
          toast.success(t("sokhraneno"));
          dispatch(setUserProfile(res.data));
        }
      })
      .finally(() => setSaving(false));
  }
  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];
    if (file && profile) {
      setFile(file);
      // Create a preview URL for the selected image
      dispatch(
        setUserProfile({
          ...profile,
          avatar: URL.createObjectURL(file),
        }),
      );
    }
  }
  return (
    <Fragment>
      <GoBackHeader title={t("moi-profil")} />
      <main className="page full_height">
        <Box className={styles.wrapper}>
          {loading || !profile ? (
            <TubeSpinner
              width={50}
              height={50}
            />
          ) : (
            <Paper
              className={styles.paper}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Box>
                <Box
                  className="flex_box"
                  sx={{
                    paddingBottom: "16px",
                    gap: "16px",
                  }}
                >
                  <Box
                    className={
                      styles.avatar_wrapper
                    }
                  >
                    <Image
                      className="avatar"
                      src={
                        profile.avatar ??
                        avatarGrayIcon
                      }
                      alt="user profile avatar"
                      width={70}
                      height={70}
                    />
                    <IconButton
                      className={
                        styles.edit_avatar_btn
                      }
                      onClick={() =>
                        avatarUploadInput.current?.click()
                      }
                      size="small"
                    >
                      <Image
                        src={editCoalGrayIcon}
                        alt="edit coal gray icon"
                        width={16}
                        height={16}
                      />
                    </IconButton>
                    <input
                      ref={avatarUploadInput}
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      color="textSecondary"
                      lineHeight="16px"
                    >
                      {profile.full_name}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontSize="14px"
                      color="textTertiary"
                    >
                      {profile.email}
                    </Typography>
                  </Box>
                </Box>
                <Divider />
              </Box>
              <ControllerTextField<FormTypes>
                name="name"
                control={control}
                rules={{
                  required: t(
                    "neobkhodimo-vvesti-imya",
                  ),
                }}
                textField={{
                  variant: "standard",
                  placeholder: t("imya"),
                  type: "text",
                  autoComplete: "off",
                }}
              />
              <ControllerTextField<FormTypes>
                name="surname"
                control={control}
                rules={{
                  required: t(
                    "neobkhodimo-vvesti-familiyu",
                  ),
                }}
                textField={{
                  variant: "standard",
                  placeholder: t("familiya"),
                  type: "text",
                  autoComplete: "off",
                }}
              />
              <ControllerTextField<FormTypes>
                name="phone"
                control={control}
                rules={{
                  required: t(
                    "neobkhodimo-vvesti-nomer",
                  ),
                }}
                textField={{
                  variant: "standard",
                  placeholder: t(
                    "nomer-telefona",
                  ),
                  type: "tel",
                  autoComplete: "off",
                }}
              />
              <ControllerRadioGroup<FormTypes>
                name="gender"
                control={control}
                rules={{
                  required: t(
                    "pozhaluista-vyberite-svoi-pol",
                  ),
                }}
                radioGroup={{
                  sx: {
                    width: "100%",
                    justifyContent:
                      "space-around",
                  },
                }}
                errorText={{
                  sx: { textAlign: "center" },
                }}
                options={[
                  {
                    value: "male",
                    label: t("ya-muzhchina"),
                  },
                  {
                    value: "female",
                    label: t("ya-zhenshina"),
                  },
                ]}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="small"
                fullWidth
                disabled={Boolean(
                  errors.name ||
                    errors.surname ||
                    errors.phone ||
                    errors.gender ||
                    saving,
                )}
              >
                {t(
                  saving
                    ? "ozhidanie"
                    : "sokhranit-izmeneniya",
                )}
              </Button>
            </Paper>
          )}
        </Box>
      </main>
      <Footer />
    </Fragment>
  );
}
