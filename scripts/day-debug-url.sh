#!/bin/sh

day_input=$(printf '%s' "$1" | tr '[:upper:]' '[:lower:]')
port="${2:-8000}"

case "$day_input" in
  0|sun|sunday)
    day_value=0
    day_label="Sunday"
    ;;
  1|mon|monday)
    day_value=1
    day_label="Monday"
    ;;
  2|tue|tues|tuesday)
    day_value=2
    day_label="Tuesday"
    ;;
  3|wed|wednesday)
    day_value=3
    day_label="Wednesday"
    ;;
  4|thu|thurs|thursday)
    day_value=4
    day_label="Thursday"
    ;;
  5|fri|friday)
    day_value=5
    day_label="Friday"
    ;;
  6|sat|saturday)
    day_value=6
    day_label="Saturday"
    ;;
  *)
    echo "Usage: sh scripts/day-debug-url.sh [sunday|monday|...|saturday|0-6] [port]"
    exit 1
    ;;
esac

echo "Preview $day_label at:"
echo "http://localhost:${port}/?day=${day_value}"
echo
echo "If your local server is not running yet, start one with:"
echo "python3 -m http.server ${port}"
