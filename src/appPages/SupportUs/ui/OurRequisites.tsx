import { Box } from "@mui/material";

import { RequisiteCard } from "@/features/RequisiteCard";

import { SECTION_PADDING } from "@/shared/config/const";

import styles from "./styles.module.scss";

const requisites = [
  {
    requisite_name: "МBank",
    requisite_img: "/backgrounds/mbank.png",
    phone_number: "+996225071727",
    card_number: "4123 4567 8901 2345",
    fullname: "А.Асанов",
  },
  {
    requisite_name: "МBank",
    requisite_img: "/backgrounds/mbank.png",
    phone_number: "+996225071727",
    card_number: "4123 4567 8901 2345",
    fullname: "А.Асанов",
  },
  {
    requisite_name: "МBank",
    requisite_img: "/backgrounds/mbank.png",
    phone_number: "+996225071727",
    card_number: "4123 4567 8901 2345",
    fullname: "А.Асанов",
  },
  {
    requisite_name: "МBank",
    requisite_img: "/backgrounds/mbank.png",
    phone_number: "+996225071727",
    card_number: "4123 4567 8901 2345",
    fullname: "А.Асанов",
  },
  {
    requisite_name: "МBank",
    requisite_img: "/backgrounds/mbank.png",
    phone_number: "+996225071727",
    card_number: "4123 4567 8901 2345",
    fullname: "А.Асанов",
  },
  {
    requisite_name: "МBank",
    requisite_img: "/backgrounds/mbank.png",
    phone_number: "+996225071727",
    card_number: "4123 4567 8901 2345",
    fullname: "А.Асанов",
  },
  {
    requisite_name: "МBank",
    requisite_img: "/backgrounds/mbank.png",
    phone_number: "+996225071727",
    card_number: "4123 4567 8901 2345",
    fullname: "А.Асанов",
  },
];

export default function OurRequisites() {
  return (
    <Box sx={{ padding: SECTION_PADDING }}>
      <div className={styles.requisites_wrapper}>
        {requisites.map(
          (requisite, requisiteIndex) => (
            <RequisiteCard
              key={
                requisite.requisite_name +
                requisiteIndex
              }
              {...requisite}
            />
          ),
        )}
      </div>
    </Box>
  );
}
