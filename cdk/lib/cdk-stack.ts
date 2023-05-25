import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  aws_certificatemanager as acm,
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins,
  aws_route53 as route53,
  aws_s3 as s3,
  aws_ssm as ssm,
  aws_route53_targets as targets,
} from 'aws-cdk-lib';
import {Certificate} from "aws-cdk-lib/aws-certificatemanager";
import {OriginAccessIdentity} from "aws-cdk-lib/aws-cloudfront";
import {BucketDeployment, Source} from "aws-cdk-lib/aws-s3-deployment";
import * as path from "path";

//export BOOTSTRAP_PREFIX=uscis
//export BOOTSTRAP_PROJECT=accountspublic

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bootstrapPrefix = process.env.BOOTSTRAP_PREFIX || 'default'
    const projectName = process.env.BOOTSTRAP_PROJECT || 'default'
    const deploymentEnvironment = this.node.tryGetContext('deploymentEnvironment');
    const parameterPrefix = "/" + bootstrapPrefix + "/" + projectName
    var parameterName = parameterPrefix + "/dns/domain_name"
    // const domainName = ssm.StringParameter.valueFromLookup(this, parameterName);
    const domainName = this.node.tryGetContext('domainName');
    console.log('Using Domain name: ', domainName);

    const endpoint = deploymentEnvironment+"."+domainName;
    parameterName = parameterPrefix + "/ssl/wildcard_cert_arn"
    //MSloan - save this for future enhancements
    // const certificateArn = cdk.Lazy.string({
    //   produce: () =>
    //       ssm.StringParameter.valueFromLookup(this, parameterName)
    // });  //use this for deploy to us-east-1


    const uiBucket = new s3.Bucket(this, 'Bucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      bucketName: endpoint,
    });

    const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
    uiBucket.grantRead(originAccessIdentity);

    const zone = route53.HostedZone.fromLookup(this, `HostedZone`, {domainName})

    const certificate = new acm.Certificate(this, 'Certificate', {
      domainName: "*."+domainName,
      validation: acm.CertificateValidation.fromDns(zone),
      subjectAlternativeNames:[domainName]
    });

    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: { origin: new origins.S3Origin(uiBucket, {originAccessIdentity})},
      domainNames: [endpoint],
      certificate: certificate,
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(0)
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(0)
        }
      ]
    });

    new route53.ARecord(this, "SiteAliasRecord", {
      recordName: endpoint,
      target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(distribution)
      ),
      zone,
    });

    new BucketDeployment(this, 'BucketDeployment', {
      destinationBucket: uiBucket,
      sources: [Source.asset(path.resolve(__dirname, '../../build'))],
      distribution: distribution,
      distributionPaths:['/*']
    })
  }
}
