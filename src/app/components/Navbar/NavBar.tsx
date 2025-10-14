"use client"

import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { LucideMoveLeft } from 'lucide-react';
import WeatherWidget from '@/app/components/Navbar/WeatherWidget';

function NavBar() {
    const [isScrolled, setScrolled] = useState(false);

    const handleScroll = () => {
    if(window.pageYOffset > 200) {
        setScrolled(true)
    } else {
        setScrolled(false)
    }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
      <nav className={`siteNav fp container ${isScrolled ? 'siteNav--scrolled' : ''}`}>
        <Link href="/" className="back-link" aria-label="Back to home page">
          <div className="icon-carousel-anim left">
            <LucideMoveLeft width={24} height={24} strokeWidth={1.5} className="icon-main"/>
            <LucideMoveLeft width={24} height={24} strokeWidth={1.5} className="icon-hovered"/>
          </div>
          Back
        </Link>
        <h1 className="siteNav__title uppercase h4 italic">Tln run clubs</h1>
        <WeatherWidget />
      </nav>
  )
}

export default NavBar