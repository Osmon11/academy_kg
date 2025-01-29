import Image from "next/image";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Grid2 as Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { ICourseProgress } from "@/shared/types";

import checkedPrimaryIcon from "@/icons/checked-primary.svg";
import starSquareSecondaryIcon from "@/icons/star-square-secondary.svg";

import styles from "./styles.module.scss";
import ExamResult from "./ui/ExamResult";
import ViewCertificate from "./ui/ViewCertificate";

export interface IProgressAccordionProps {
  progress: ICourseProgress;
  expanded: boolean;
  onToggle: (value: boolean) => void;
}

export default function ProgressAccordion({
  progress,
  expanded,
  onToggle,
}: IProgressAccordionProps) {
  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );
  const examResults = progress.exam?.user_results;
  const ExamResultsGrid = (
    <Grid size={{ xs: 2 }}>
      <Box
        className={styles.exam_results_wrapper}
      >
        {examResults ? (
          <Typography
            fontSize="14px"
            fontWeight={600}
            color="#A3A3A3"
            lineHeight="16px"
          >
            {`проходной бал ${examResults.pass_points} из ${examResults.max_points}`}
          </Typography>
        ) : null}
      </Box>
    </Grid>
  );
  return (
    <Accordion
      expanded={expanded}
      onChange={(_, expanded) =>
        onToggle(expanded)
      }
    >
      <AccordionSummary>
        <Grid
          container
          rowSpacing={1}
          sx={{ width: "100%" }}
        >
          <Grid size={{ xs: 10, md: 3 }}>
            <Typography
              variant="body1"
              fontWeight={600}
              color="primary"
            >
              {progress.title}
            </Typography>
            <Typography
              variant="caption"
              color="#A3A3A3"
            >{`${progress.lesson_count} уроков`}</Typography>
          </Grid>
          {!upMd && ExamResultsGrid}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              className={
                styles.checkboxes_wrapper
              }
            >
              {progress.lessons.map((item) => (
                <Checkbox
                  key={item.id}
                  checked={item.is_finished}
                  color="primary"
                  disableTouchRipple
                  sx={{
                    padding: "0px",
                    cursor: "default",
                  }}
                />
              ))}
              <Checkbox
                checked={
                  progress.exam?.user_results
                    ? progress.exam.user_results
                        .is_passed
                    : false
                }
                color="secondary"
                disableTouchRipple
                sx={{
                  padding: "0px",
                  cursor: "default",
                }}
                checkedIcon={
                  <Image
                    src={starSquareSecondaryIcon}
                    alt="star square orange icon"
                    width={24}
                    height={24}
                  />
                }
              />
            </Box>
          </Grid>
          {upMd && ExamResultsGrid}
        </Grid>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: "0px",
        }}
      >
        <Carousel
          navButtons={upMd}
          dotButtons={!upMd}
          options={{
            align: "start",
          }}
          dotButtonsSx={{ paddingBottom: "8px" }}
        >
          {progress.lessons.map((item, index) => (
            <Box
              key={item.id}
              className={styles.carousel_item}
            >
              <Paper
                className={styles.lesson_card}
              >
                <Typography
                  fontSize="14px"
                  fontWeight={600}
                  color="primary"
                  lineHeight="16px"
                >
                  {item.title}
                </Typography>
                <Box
                  className={styles.flex_between}
                >
                  <Typography
                    variant="caption"
                    color="#A3A3A3"
                  >{`${index + 1}-урок`}</Typography>
                  {item.is_finished && (
                    <Image
                      src={checkedPrimaryIcon}
                      alt="checked green icon"
                      width={20}
                      height={20}
                    />
                  )}
                </Box>
              </Paper>
            </Box>
          ))}
          {examResults && (
            <ExamResult results={examResults} />
          )}
          {progress.exam &&
            examResults?.is_passed && (
              <ViewCertificate
                levelId={progress.exam.levelId}
              />
            )}
        </Carousel>
      </AccordionDetails>
    </Accordion>
  );
}
