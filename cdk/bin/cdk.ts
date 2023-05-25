#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';

const app = new cdk.App();
const bootstrapPrefix = process.env.BOOTSTRAP_PREFIX || 'default'
const projectName = process.env.BOOTSTRAP_PROJECT || 'default'

new CdkStack(app, 'CdkStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-east-1'},
  stackName: bootstrapPrefix + '-' + projectName + '-<<[(ds "config").service_name]>>-' + app.node.tryGetContext('deploymentEnvironment')
});
