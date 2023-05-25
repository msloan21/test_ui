#!/usr/bin/env bash

cat << EOF
{
  "ADJUDICATOR_USERNAME": "$adjudicator_username",
  "ADJUDICATOR_PASSWORD": "$adjudicator_password",
  "ADMIN_USERNAME": "$admin_username",
  "ADMIN_PASSWORD": "$admin_password",
  "EMPLOYEE_USERNAME": "$employee_username",
  "EMPLOYEE_PASSWORD": "$employee_password"
}
EOF