#!/bin/bash
pg_dump -Fc $DATABASE_URL > /backups/cedars-$(date +%F).dump
