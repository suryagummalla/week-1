#!/bin/bash

# Find and kill any process using port 8002
PID=$(lsof -ti :8002)
if [ -n "$PID" ]; then
  echo "Killing process on port 8002: $PID"
  kill -9 $PID
fi

# Start the FastAPI server
uvicorn main:app --reload --host 127.0.0.1 --port 8002
