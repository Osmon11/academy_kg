import { Typography } from "@mui/material";

import { Footer } from "@/widgets/Footer";

import { Banner } from "@/entities/Banner";
import { GoBackHeader } from "@/entities/GoBackHeader";
import { SectionHeader } from "@/entities/SectionHeader";

import clientAxios from "@/shared/config/clientAxios";
import { SECTION_MARGIN_TOP } from "@/shared/config/const";
import { IRequisiteListItem } from "@/shared/types";

import OurRequisites from "./OurRequisites";
import styles from "./styles.module.scss";

export async function SupportUsPage() {
  const requisiteList = await clientAxios
    .get<{
      results: IRequisiteListItem[];
    }>("academy/requisite_list/")
    .then((res) => res?.data.results);
  return (
    <div className={styles.page}>
      <GoBackHeader title="Поддержать нас" />
      <Banner
        color="primary"
        sx={{ marginTop: SECTION_MARGIN_TOP }}
      >
        <Typography
          variant="h5"
          textAlign="center"
        >
          Мы искренне благодарны каждому из вас за
          поддержку и интерес к нашей миссии —
          распространению знаний о Коране и
          Исламе. Наша академия стремится сделать
          обучение доступным для всех, независимо
          от возраста, уровня знаний или
          географического положения.
        </Typography>
      </Banner>
      <SectionHeader color="secondary">
        наши реквизиты
      </SectionHeader>
      <OurRequisites requisites={requisiteList} />
      <Footer />
    </div>
  );
}
