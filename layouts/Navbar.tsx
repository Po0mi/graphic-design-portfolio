// src/layouts/Navbar/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import "./Navbar.scss";

// ──────────────────────────────────────────────────────
// TYPES
// ──────────────────────────────────────────────────────

/**
 * Represents a single navigation link in the navbar.
 */
export interface NavLink {
  /** Unique identifier for the link (used for active state detection) */
  id: string;
  /** The visible text label for the link */
  label: string;
  /** The href attribute for the link (e.g., "#about", "/contact") */
  href: string;
}

/**
 * Props for the Navbar component.
 */
export interface NavbarProps {
  /**
   * Array of navigation links to display.
   * @default [{ id: "home", label: "Home", href: "#home" }, ...]
   */
  links?: NavLink[];
  /**
   * Text/logo to display in the top-left corner.
   * @default "Curator Editions"
   */
  logoText?: string;
}

// ──────────────────────────────────────────────────────
// COMPONENT
// ──────────────────────────────────────────────────────

/**
 * Navbar Component
 *
 * A sticky, responsive navigation bar with:
 * - Scroll-aware styling (changes background/shadow on scroll)
 * - Active section highlighting via IntersectionObserver
 * - Mobile-first hamburger menu with smooth toggle
 * - Editorial-minimalist design aligned with the "Digital Curator" aesthetic
 *
 * @example
 * ```tsx
 * <Navbar
 *   links={[{ id: "home", label: "Home", href: "#home" }]}
 *   logoText="MyBrand"
 * />
 * ```
 *
 * @param {NavbarProps} props - Component props
 * @returns {JSX.Element} Rendered navbar
 */
const Navbar: React.FC<NavbarProps> = ({
  links = [
    { id: "hero",     label: "Home",     href: "#hero"     },
    { id: "about",    label: "About",    href: "#about"    },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "works",    label: "Works",    href: "#works"    },
    { id: "goals",    label: "Goals",    href: "#goals"    },
    { id: "contact",  label: "Contact",  href: "#contact"  },
  ],
  logoText = "Graphics Studio",
}) => {
  /**
   * State: Tracks whether the user has scrolled past 20px.
   * Used to apply the "scrolled" visual state (background, shadow, height).
   */
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  /**
   * State: Controls the mobile menu's open/closed state.
   * Toggled by the hamburger button.
   */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  /**
   * State: Stores the ID of the section currently in view.
   * Updated by IntersectionObserver to highlight the active nav link.
   */
  const [activeSection, setActiveSection] = useState<string>("");

  /**
   * Effect: Scroll Listener
   *
   * Attaches a scroll event listener to detect when the user scrolls past 20px.
   * Updates `isScrolled` state to trigger visual changes (background, shadow).
   *
   * Cleanup: Removes the event listener on unmount to prevent memory leaks.
   */
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Effect: Active Section Observer
   *
   * Uses IntersectionObserver to detect which section is currently ≥50% visible.
   * Updates `activeSection` state to apply the "active" class to the corresponding nav link.
   *
   * @param {NavLink[]} links - Dependency array; re-runs if links change
   *
   * Cleanup: Disconnects the observer on unmount or when links change.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }, // Trigger when 50% of the section is visible
    );

    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [links]);

  /**
   * Handler: Toggle Mobile Menu
   *
   * Toggles the `isMobileMenuOpen` state to show/hide the mobile navigation.
   * Called when the hamburger button is clicked.
   */
  const toggleMenu = (): void => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  /**
   * Handler: Close Mobile Menu on Link Click
   *
   * Closes the mobile menu when a nav link is clicked.
   * Improves UX by preventing the menu from staying open after navigation.
   */
  const handleLinkClick = (): void => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`navbar ${isScrolled ? "scrolled" : ""} ${isMobileMenuOpen ? "menu-open" : ""}`}
    >
      <a href="#hero" className="logo">
        {logoText}
        <p className="logo-sub">グラフィックスタジオ</p>
      </a>

      <ul className={`desktop-menu ${isMobileMenuOpen ? "open" : ""}`}>
        {links.map((link: NavLink) => (
          <li key={link.id}>
            <a
              href={link.href}
              className={`nav-link ${activeSection === link.id ? "active" : ""}`}
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          </li>
        ))}
        <div className="mobile-author-name">
          <span className="author-name">Lee Ryan Tinambunan</span>
        </div>
      </ul>
      <span className="desktop-author-name">Lee Ryan Tinambunan</span>

      {/* Hamburger Button: Visible only on mobile (via CSS media query) */}
      <button
        className={`mobile-toggle ${isMobileMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
    </nav>
  );
};

export default Navbar;
