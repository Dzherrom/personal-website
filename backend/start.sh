#!/usr/bin/env bash
set -o errexit

# El hostname interno de Postgres (dpg-…-a) solo resuelve en runtime, no en el build.
python manage.py migrate --noinput
exec gunicorn config.wsgi:application --bind 0.0.0.0:"${PORT:-8000}"
