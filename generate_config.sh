#!/usr/bin/env bash
environment=$1

cat << EOF
  window.accountsPublicUIGlobals = {
    domain: '$environment.$domain_name',
    apiURL: 'https://api-$environment.$domain_name',
    cognito: {
      region: '$AWS_REGION',
      userPoolId: '$user_pool_id',
      userPoolWebClientId: '$app_client_id'
    }
  }
EOF
