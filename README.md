![myacuity-logo](https://myacuity.com/wp-content/uploads/2021/06/brand.svg)
# Acuity React UI Template

This project is a template TypeScript React UI project to allow teams to quickly spin up new user interfaces.  It is designed to be serverlessly deployed to S3 and fronted with CloudFront at AWS.

This project includes:
- AWS CDK infrastructure configurations
- Jenkinsfile and Dockerfile for pipeline
  - SonarQube script to configure static code analysis
  - Cypress configuration for acceptance testing and 508 compliance

## AWS CDK Deployables
- S3 Bucket
- CloudFront Distribution
- Route53 ALIAS record

## Service README

See [the actual service README](README_TEMPLATE.md) for more information.

## Template Usage

### Pre-requisites

1. The `tree` command is installed and available.
2. The `gomplate` command is installed and available.
3. Create a new repo using this repo as a template.
4. Locally edit [the configuration file](template_config.yaml) to pass in variables used to generate the codebase from the template.

### Generating the codebase

1. Run `./generate_codebase.sh` and commit/push the resulting changes, assuming they look good.
2. Setup repo access
3. Enable branch protections
