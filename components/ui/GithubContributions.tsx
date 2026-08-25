'use client';
import { useMemo, useState } from 'react';
import { GITHUB_CONTRIBUTIONS, GITHUB_CONTRIBUTIONS_TOTAL, GITHUB_USERNAME } from '@/lib/data';
import styles from './GithubContributions.module.css';

const LEVEL_COLORS = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

type Day = { date: string; level: number; count: number };

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export default function GithubContributions() {
  const [hovered, setHovered] = useState<Day | null>(null);

  // Data comes in as one row per week-start (Sunday). Rebuild full weeks
  // by walking day-by-day between the first and last recorded Sunday,
  // matching GitHub's own column layout (each column = one week, Sun-Sat).
  const { weeks, monthLabels } = useMemo(() => {
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

    // Month label per column: label the week that contains that month's 1st
    const labels: { index: number; label: string }[] = [];
    let lastMonth = -1;
    weeksArr.forEach((week, i) => {
      const firstValid = week.find((d) => d);
      if (!firstValid) return;
      const d = new Date(firstValid.date + 'T00:00:00');
      if (d.getMonth() !== lastMonth) {
        labels.push({ index: i, label: MONTH_NAMES[d.getMonth()] });
        lastMonth = d.getMonth();
      }
    });

    return { weeks: weeksArr, monthLabels: labels };
  }, []);

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

      <div className={styles.graphScroll}>
        <div className={styles.graph}>
          <div className={styles.months}>
            {monthLabels.map((m) => (
              <span
                key={`${m.label}-${m.index}`}
                className={styles.monthLabel}
                style={{ gridColumnStart: m.index + 1 }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className={styles.body}>
            <div className={styles.dayLabels}>
              {DAY_LABELS.map((d, i) => (
                <span key={i} className={styles.dayLabel}>{d}</span>
              ))}
            </div>

            <div className={styles.weeks}>
              {weeks.map((week, wi) => (
                <div key={wi} className={styles.week}>
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className={styles.cell}
                      style={{ background: day ? LEVEL_COLORS[day.level] : 'transparent' }}
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
