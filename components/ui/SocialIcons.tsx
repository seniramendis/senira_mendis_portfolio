'use client';

import { Mail, Linkedin, Github, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function SocialIcons() {
  // Exact same luxury styling, just flattened out so React doesn't crash
  const linkStyles = "group relative p-2 flex flex-col items-center justify-center";
  const iconStyles = "w-5 h-5 text-gray-800 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:text-[#c49a45]";
  const dotStyles = "absolute -bottom-1 w-1 h-1 rounded-full bg-[#c49a45] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100";

  return (
    <div className="flex items-center gap-6 mt-4">
      
      {/* Email */}
      <Link href="mailto:seniramendis41@gmail.com" target="_blank" rel="noopener noreferrer" className={linkStyles} aria-label="Email">
        <Mail strokeWidth={1.25} className={iconStyles} />
        <span className={dotStyles} />
      </Link>

      {/* LinkedIn */}
      <Link href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className={linkStyles} aria-label="LinkedIn">
        <Linkedin strokeWidth={1.25} className={iconStyles} />
        <span className={dotStyles} />
      </Link>

      {/* GitHub */}
      <Link href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className={linkStyles} aria-label="GitHub">
        <Github strokeWidth={1.25} className={iconStyles} />
        <span className={dotStyles} />
      </Link>

      {/* WhatsApp */}
      <Link href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" className={linkStyles} aria-label="WhatsApp">
        <MessageCircle strokeWidth={1.25} className={iconStyles} />
        <span className={dotStyles} />
      </Link>

    </div>
  );
}