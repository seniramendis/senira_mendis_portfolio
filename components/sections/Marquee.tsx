import { MARQUEE_SKILLS } from '@/lib/data';

export default function Marquee() {
  const items = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];
  return (
    <div className="mq-wrap" aria-hidden="true">
      <div className="mq-track">
        {items.map((skill, i) => (
          <span key={i} className="mq-item">
            {skill}<b />
          </span>
        ))}
      </div>
    </div>
  );
}
