#!/usr/bin/env bash
# Start the Startup Copilot Python backend
set -e

cd "$(dirname "$0")"

# Create a virtualenv if it doesn't exist
if [ ! -d "venv" ]; then
  echo "Creating virtual environment..."
  python -m venv venv
fi

# Activate
source venv/bin/activate || source venv/Scripts/activate

# Install deps
pip install -r requirements.txt -q

# Run
echo "Starting Startup Copilot API on http://localhost:8000"
python -m uvicorn main:app --reload --port 8000 --host 0.0.0.0
