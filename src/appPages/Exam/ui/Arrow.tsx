import {
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";

import { useTheme } from "@mui/material";

import styles from "../styles.module.scss";

interface IVector2D {
  x: number;
  y: number;
}

export interface IArrowProps {
  start: IVector2D;
  end: IVector2D;
  color: "primary" | "secondary";
}

export default function Arrow({
  start,
  end,
  color,
}: IArrowProps) {
  const theme = useTheme();
  const HEXcolor = theme.palette[color].main;
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (start && end && pathRef.current) {
      if (pathRef) {
        setPathLength(
          pathRef.current.getTotalLength(),
        );
      }
    }
  }, [start, end]);

  function getCurvePath(
    start: IVector2D,
    end: IVector2D,
  ) {
    const deltaX = Math.abs(end.x - start.x) / 2;
    return `M ${start.x},${start.y} C ${start.x + deltaX},${start.y} ${end.x - deltaX},${end.y} ${end.x},${end.y}`;
  }
  return (
    <svg
      width="100%"
      height="100%"
      className={styles.arrow}
    >
      {start && end && (
        <Fragment>
          <path
            d={getCurvePath(start, end)}
            stroke={HEXcolor}
            strokeWidth="2"
            fill="none"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength}
          />
          <polyline
            points={`${end.x - 10},${end.y - 7} ${end.x},${end.y} ${end.x - 10},${end.y + 7}`}
            fill="none"
            stroke={HEXcolor}
            strokeWidth="2"
          />
        </Fragment>
      )}
    </svg>
  );
}
