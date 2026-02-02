/**
 * Main JavaScript entry point
 *
 * This file will be bundled as IIFE (Immediately Invoked Function Expression)
 * to avoid polluting the global scope when embedded in external websites.
 */
import '@/css/style.css';
import { PROJECT_NAME } from '@util/config.mjs';

// Type definitions
interface AppConfig {
  debug: boolean;
  projectName: string;
}

// Configuration
const config: AppConfig = {
  debug: true,
  projectName: PROJECT_NAME,
};

// Initialize application
function init(): void {
  if (config.debug) {
    console.log(`[${config.projectName}] Application initialized`);
  }

  // Add event listeners
  setupEventListeners();
}

// Setup event listeners
function setupEventListeners(): void {
  // Example: Button click handlers
  const buttons = document.querySelectorAll(`#${PROJECT_NAME} button`);
  buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
  });

  // Example: Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll(`#${PROJECT_NAME} a[href^="#"]`);
  anchorLinks.forEach((link) => {
    link.addEventListener('click', handleSmoothScroll);
  });
}

// Event handlers
function handleButtonClick(event: Event): void {
  const target = event.currentTarget as HTMLButtonElement;
  if (config.debug) {
    console.log(`[${config.projectName}] Button clicked:`, target.textContent);
  }
  // Add your button click logic here
}

function handleSmoothScroll(event: Event): void {
  event.preventDefault();
  const target = event.currentTarget as HTMLAnchorElement;
  const targetId = target.getAttribute('href');

  if (targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for testing (optional)
export { init, config };
