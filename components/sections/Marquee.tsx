import { MARQUEE_SKILLS } from '@/lib/data';
import { getTechIconUrl } from '@/lib/techIcons';

export default function Marquee() {
  const items = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];
  return (
    <div className="mq-wrap" aria-hidden="true">
      <div className="mq-track">
        {items.map((skill, i) => {
          const iconUrl = getTechIconUrl(skill);
          return (
            <span key={i} className="mq-item">
              <span className="mq-item-content">
                {iconUrl && (
                  <img src={iconUrl} alt="" className="mq-icon" loading="lazy" />
                )}
                {skill}
              </span>
              <b />
            </span>
          );
        })}
      </div>
    </div>
  );
}
