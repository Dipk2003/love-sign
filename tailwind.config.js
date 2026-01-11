/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /*slate-200*/
        input: "var(--color-input)", /*slate-200*/
        ring: "var(--color-ring)", /*blue-500*/
        background: "var(--color-background)", /*gray-50*/
        foreground: "var(--color-foreground)", /*slate-800*/
        primary: {
          DEFAULT: "var(--color-primary)", /*blue-900*/
          foreground: "var(--color-primary-foreground)", /*white*/
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /*blue-500*/
          foreground: "var(--color-secondary-foreground)", /*white*/
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /*red-600*/
          foreground: "var(--color-destructive-foreground)", /*white*/
        },
        muted: {
          DEFAULT: "var(--color-muted)", /*slate-100*/
          foreground: "var(--color-muted-foreground)", /*slate-500*/
        },
        accent: {
          DEFAULT: "var(--color-accent)", /*orange-500*/
          foreground: "var(--color-accent-foreground)", /*white*/
        },
        popover: {
          DEFAULT: "var(--color-popover)", /*white*/
          foreground: "var(--color-popover-foreground)", /*slate-800*/
        },
        card: {
          DEFAULT: "var(--color-card)", /*slate-100*/
          foreground: "var(--color-card-foreground)", /*slate-800*/
        },
        success: {
          DEFAULT: "var(--color-success)", /*emerald-600*/
          foreground: "var(--color-success-foreground)", /*white*/
        },
        warning: {
          DEFAULT: "var(--color-warning)", /*amber-600*/
          foreground: "var(--color-warning-foreground)", /*white*/
        },
        error: {
          DEFAULT: "var(--color-error)", /*red-600*/
          foreground: "var(--color-error-foreground)", /*white*/
        },
        brand: {
          coral: "var(--color-brand-coral)", /*coral*/
          teal: "var(--color-brand-teal)", /*teal*/
          amber: "var(--color-brand-amber)", /*amber*/
          navy: "var(--color-brand-navy)", /*navy*/
          crimson: "var(--color-brand-crimson)", /*crimson*/
        },
      },
      fontFamily: {
        headline: ['var(--font-headline)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        cta: ['var(--font-cta)', 'sans-serif'],
        accent: ['var(--font-accent)', 'monospace'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        'base': 'var(--spacing-base)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "slide-in": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-subtle": "pulse-subtle 4s ease-in-out infinite",
        "slide-in": "slide-in 0.3s ease-out",
      },
      boxShadow: {
        'subtle': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
}