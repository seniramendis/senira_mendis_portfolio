'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { GITHUB_CONTRIBUTIONS, GITHUB_CONTRIBUTIONS_TOTAL, GITHUB_USERNAME } from '@/lib/data';
import styles from './GithubContributions.module.css';

const LEVEL_COLORS = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// Layout constants — tuned so the grid always fills its card edge-to-edge
// with square cells and never needs a horizontal scrollbar.
const GAP = 3;
const MIN_CELL = 8;
const MAX_CELL = 13;
const DAY_COL_WIDTH = 24;

type Day = { date: string; level: number; count: number };

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/** Given the available pixel width for the grid, pick a cell size and a
 *  number of weeks to show so the grid always fits exactly — shrinking
 *  cells first, then trimming to the most recent weeks if it's still
 *  too tight to stay legible. */
function computeLayout(gridWidth: number, totalWeeks: number) {
  if (gridWidth <= 0 || totalWeeks <= 0) {
    return { visibleWeeks: totalWeeks, cellSize: MAX_CELL };
  }

  const fitAllSize = (gridWidth - (totalWeeks - 1) * GAP) / totalWeeks;
  if (fitAllSize >= MIN_CELL) {
    return { visibleWeeks: totalWeeks, cellSize: Math.min(fitAllSize, MAX_CELL) };
  }

  const weeksThatFit = Math.max(
    4,
    Math.floor((gridWidth + GAP) / (MIN_CELL + GAP))
  );
  const visibleWeeks = Math.min(weeksThatFit, totalWeeks);
  const cellSize = (gridWidth - (visibleWeeks - 1) * GAP) / visibleWeeks;
  return { visibleWeeks, cellSize: Math.max(cellSize, MIN_CELL) };
}

export default function GithubContributions() {
  const [hovered, setHovered] = useState<Day | null>(null);
  const gridWrapRef = useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = useState(0);

  useEffect(() => {
    const el = gridWrapRef.current;
    if (!el) return;
    const update = () => setGridWidth(el.clientWidth - DAY_COL_WIDTH);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Data comes in as one row per week-start (Sunday). Rebuild full weeks
  // by walking day-by-day between the first and last recorded Sunday,
  // matching GitHub's own column layout (each column = one week, Sun-Sat).
  const { weeks: allWeeks } = useMemo(() => {
    const byDate = new Map<string, Day>();
    GITHUB_CONTRIBUTIONS.forEach(([date, level, count]) => {
      byDate.set(date, { date, level, count });
    });

    const sundays = GITHUB_CONTRIBUTIONS.map((c) => c[0]).sort();
    const firstSunday = new Date(sundays[0] + 'T00:00:00');
    const today = new Date();

    const weeksArr: (Day | null)[][] = [];
    const cursor = new Date(firstSunday);

    while (cursor <= today) {
      const week: (Day | null)[] = [];
      for (let i = 0; i < 7; i++) {
        const key = cursor.toISOString().slice(0, 10);
        if (cursor > today) {
          week.push(null);
        } else {
          week.push(byDate.get(key) || { date: key, level: 0, count: 0 });
        }
        cursor.setDate(cursor.getDate() + 1);
      }
      weeksArr.push(week);
    }

    return { weeks: weeksArr };
  }, []);

  const { visibleWeeks, cellSize } = useMemo(
    () => computeLayout(gridWidth, allWeeks.length),
    [gridWidth, allWeeks.length]
  );

  const weeks = useMemo(
    () => allWeeks.slice(allWeeks.length - visibleWeeks),
    [allWeeks, visibleWeeks]
  );

  const monthLabels = useMemo(() => {
    const labels: { index: number; label: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const firstValid = week.find((d) => d);
      if (!firstValid) return;
      const d = new Date(firstValid.date + 'T00:00:00');
      if (d.getMonth() !== lastMonth) {
        labels.push({ index: i, label: MONTH_NAMES[d.getMonth()] });
        lastMonth = d.getMonth();
      }
    });
    return labels;
  }, [weeks]);

  const step = cellSize + GAP;

  return (
    <div className={styles.wrap}>
      <div className={styles.headerRow}>
        <p className={styles.title}>
          <span className={styles.total}>{GITHUB_CONTRIBUTIONS_TOTAL.toLocaleString()}</span> contributions in the last year
        </p>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.viewLink}
        >
          @{GITHUB_USERNAME} on GitHub ↗
        </a>
      </div>

      <div className={styles.graph}>
        <div className={styles.dayLabels} style={{ width: DAY_COL_WIDTH }}>
          {DAY_LABELS.map((d, i) => (
            <span key={i} className={styles.dayLabel} style={{ height: cellSize }}>{d}</span>
          ))}
        </div>

        <div ref={gridWrapRef} className={styles.gridWrap}>
          <div className={styles.months} style={{ height: 14 }}>
            {monthLabels.map((m) => (
              <span
                key={`${m.label}-${m.index}`}
                className={styles.monthLabel}
                style={{ left: m.index * step }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className={styles.weeks} style={{ gap: GAP }}>
            {weeks.map((week, wi) => (
              <div key={wi} className={styles.week} style={{ gap: GAP, width: cellSize }}>
                {week.map((day, di) => (
                  <div
                    key={di}
                    className={styles.cell}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      background: day ? LEVEL_COLORS[day.level] : 'transparent',
                    }}
                    onMouseEnter={() => day && setHovered(day)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => day && setHovered(day)}
                    onTouchStart={() => day && setHovered(day)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footerRow}>
        <span className={styles.tooltip}>
          {hovered
            ? `${hovered.count} contribution${hovered.count === 1 ? '' : 's'} on ${formatDate(hovered.date)}`
            : 'Hover a square to see activity'}
        </span>
        <div className={styles.legend}>
          <span>Less</span>
          {LEVEL_COLORS.map((c) => (
            <span key={c} className={styles.legendCell} style={{ background: c }} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
