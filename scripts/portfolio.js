const portfolioIntro = document.getElementById("portfolio-intro");
const dailyMessage = document.getElementById("daily-message");
const logoStatus = document.getElementById("logo-status");
const debugNote = document.getElementById("debug-note");

const root = document.documentElement;
const classDays = [1, 3];
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getDebugDay() {
  const params = new URLSearchParams(window.location.search);
  const rawDay = params.get("day");

  if (!rawDay) {
    return null;
  }

  const normalizedDay = rawDay.trim().toLowerCase();

  if (/^[0-6]$/.test(normalizedDay)) {
    return Number(normalizedDay);
  }

  if (normalizedDay === "sun" || normalizedDay === "sunday") {
    return 0;
  } else if (normalizedDay === "mon" || normalizedDay === "monday") {
    return 1;
  } else if (normalizedDay === "tue" || normalizedDay === "tues" || normalizedDay === "tuesday") {
    return 2;
  } else if (normalizedDay === "wed" || normalizedDay === "wednesday") {
    return 3;
  } else if (normalizedDay === "thu" || normalizedDay === "thurs" || normalizedDay === "thursday") {
    return 4;
  } else if (normalizedDay === "fri" || normalizedDay === "friday") {
    return 5;
  } else if (normalizedDay === "sat" || normalizedDay === "saturday") {
    return 6;
  }

  return null;
}

const debugDay = getDebugDay();
const dayOfWeek = debugDay ?? new Date().getDay();

if (debugDay !== null && debugNote) {
  debugNote.hidden = false;
  debugNote.textContent = `Debug mode is on: the page is pretending today is ${dayNames[dayOfWeek]}. Remove ?day=... from the URL to go back to the real date.`;
}

if (dayOfWeek === 0) {
  portfolioIntro.textContent = "Sunday reset: this portfolio is highlighting reflection and revision.";
  dailyMessage.textContent =
    "On Sunday, the page shifts into a quieter mode and focuses on reviewing work from the week before the next round of assignments begins.";
} else if (dayOfWeek === 1) {
  portfolioIntro.textContent = "Monday focus: this portfolio is ready for a new week of web design work.";
  dailyMessage.textContent =
    "On Monday, the portfolio emphasizes class-day momentum, returning to layout, writing, and visual experiments with a fresh start.";
} else if (dayOfWeek === 2) {
  portfolioIntro.textContent = "Tuesday studio mode: the portfolio is highlighting steady practice.";
  dailyMessage.textContent =
    "On Tuesday, the page leans into development time by highlighting incremental progress, careful revision, and sharper visual decisions.";
} else if (dayOfWeek === 3) {
  portfolioIntro.textContent = "Wednesday checkpoint: this portfolio is tuned for another class meeting.";
  dailyMessage.textContent =
    "On Wednesday, the content shifts toward midweek evaluation, balancing technical experiments with clearer communication and presentation.";
} else if (dayOfWeek === 4) {
  portfolioIntro.textContent = "Thursday build mode: the portfolio is extending ideas into polished pages.";
  dailyMessage.textContent =
    "On Thursday, the page frames the work as a continuation of drafting and refining, with attention to structure, polish, and readability.";
} else if (dayOfWeek === 5) {
  portfolioIntro.textContent = "Friday wrap-up: the portfolio is marking the end of the work week.";
  dailyMessage.textContent =
    "On Friday, the content shifts toward consolidating assignments, cleaning up details, and preparing finished work for submission.";
} else {
  portfolioIntro.textContent = "Saturday experiment: this portfolio is set aside for creative iteration.";
  dailyMessage.textContent =
    "On Saturday, the page turns toward experimentation, leaving room for alternate layouts, visual studies, and new ideas outside class.";
}

if (dayOfWeek === classDays[0] || dayOfWeek === classDays[1]) {
  root.style.setProperty("--logo-primary", "#a33a16");
  root.style.setProperty("--logo-secondary", "#d18a00");
  root.style.setProperty("--logo-accent", "#7b2c10");
  logoStatus.textContent =
    "Today is a class day, so the SVG logo switches to a warm class-day palette. Change the classDays array in scripts/portfolio.js if your section meets on a different schedule.";
} else {
  root.style.setProperty("--logo-primary", "#1a6fbf");
  root.style.setProperty("--logo-secondary", "#2d8659");
  root.style.setProperty("--logo-accent", "#666666");
  logoStatus.textContent =
    "Today is not a class day, so the SVG logo stays in its regular blue-and-green palette.";
}
