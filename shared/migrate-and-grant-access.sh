#!/bin/bash

echo "Running Drizzle migration..."
npm run db:migrate

if [ $? -ne 0 ]; then
  echo "❌ Migration failed, skipping GRANTs"
  exit 1
fi

echo "Applying GRANTs from grant-access.sql..."
docker exec -i activity_tracker_postgres \
  psql -U postgres -d activity_tracker < ./sql/grant-access.sql

if [ $? -eq 0 ]; then
  echo "✅ Permissions applied successfully."
else
  echo "❌ Failed to apply GRANTs."
  exit 1
fi