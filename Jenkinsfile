node {
    try {
        stage("Check out") {
            checkout scm
        }
        stage("Test, Scan") {
            sh 'npm install'
            sh './node_modules/.bin/eslint src'
            sh 'npm run test-cov'
            sh '''#!/bin/bash -el
                domain_name=$(aws ssm get-parameter --name /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/dns/domain_name --query Parameter.Value --output text)
                sonarqube_password=$(aws ssm get-parameter --name /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/sonarqube/nonprod/password --query Parameter.Value --output text --with-decryption)
                node sonar.js https://sonarqube.${domain_name} admin $sonarqube_password
            '''
        }
        
        stage("Audit") {
            sh 'npm audit --production --audit-level=critical'
        }
        

        stage("Build") {
            sh "npm install"
            sh "npm run build"
        }

        // --- Build Cypress Docker Image -----
        // Build docker image based on base image of cypress
        stage('Build Cypress Docker Image') {
            sh '''#!/bin/bash -el
                docker build -f Dockerfile.cypress -t cypress-e2e .
                '''
        }

        // ----- Test and Deploy Nonprod -----
        stage("Deploy - nonprod") {
            sh '''#!/bin/bash -el
                export domain_name=`aws ssm get-parameter --name /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/dns/domain_name --query Parameter.Value --output text`
                export user_pool_id=`aws ssm get-parameter --name "/${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/cognito/nonprod/user_pool_id" --query "Parameter.Value" --output text`
                export app_client_id=`aws ssm get-parameter --name "/${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/cognito/nonprod/app_client_id" --query "Parameter.Value" --output text`
                ./generate_config.sh nonprod > build/defaults.js
                cat build/defaults.js
                cd cdk
                npm install
                ./node_modules/.bin/cdk deploy --context deploymentEnvironment=nonprod --context domainName=${domain_name} --ci --require-approval never
            '''
        }

        stage("E2E tests - nonprod") {
            sh '''#!/bin/bash -el
                export domain_name=`aws ssm get-parameter --name /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/dns/domain_name --query Parameter.Value --output text`
                export adjudicator_username='adjudicator-1'
                export employee_username='employee-1'
                export admin_username='admin-1'
                export adjudicator_password=`aws secretsmanager get-secret-value --secret-id /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/cognito/nonprod/credentials/adjudicator --version-stage AWSCURRENT --query SecretString --output text | jq -r '.password'`
                export admin_password=`aws secretsmanager get-secret-value --secret-id /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/cognito/nonprod/credentials/admin --version-stage AWSCURRENT --query SecretString --output text | jq -r '.password'`
                export employee_password=`aws secretsmanager get-secret-value --secret-id /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/cognito/nonprod/credentials/employee --version-stage AWSCURRENT --query SecretString --output text | jq -r '.password'`
                ./generate_e2e_env.sh > cypress.env.json
                cat cypress.env.json
                docker run -i  -v $PWD:/cypress/e2e -w /cypress/e2e -e REACT_APP_CYPRESS_BASE_URL=https://nonprod.${domain_name} cypress-e2e:latest
            '''
        }

        // ----- Test and Deploy Staging -----
        stage("Deploy - staging") {
            sh '''#!/bin/bash -el
                export domain_name=`aws ssm get-parameter --name /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/dns/domain_name --query Parameter.Value --output text`
                export user_pool_id=`aws ssm get-parameter --name "/${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/cognito/staging/user_pool_id" --query "Parameter.Value" --output text`
                export app_client_id=`aws ssm get-parameter --name "/${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/cognito/staging/app_client_id" --query "Parameter.Value" --output text`
                ./generate_config.sh staging > build/defaults.js
                cd cdk
                npm install
                ./node_modules/.bin/cdk deploy --context deploymentEnvironment=staging --context domainName=${domain_name} --ci --require-approval never
            '''
        }

        stage("E2E tests - staging") {
            sh '''#!/bin/bash -el
                export domain_name=`aws ssm get-parameter --name /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/dns/domain_name --query Parameter.Value --output text`
                export adjudicator_username='adjudicator-1'
                export employee_username='employee-1'
                export admin_username='admin-1'
                export adjudicator_password=`aws secretsmanager get-secret-value --secret-id /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/cognito/staging/credentials/adjudicator --version-stage AWSCURRENT --query SecretString --output text | jq -r '.password'`
                export admin_password=`aws secretsmanager get-secret-value --secret-id /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/cognito/staging/credentials/admin --version-stage AWSCURRENT --query SecretString --output text | jq -r '.password'`
                export employee_password=`aws secretsmanager get-secret-value --secret-id /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/cognito/staging/credentials/employee --version-stage AWSCURRENT --query SecretString --output text | jq -r '.password'`
                ./generate_e2e_env.sh > cypress.env.json
                docker run -i  -v $PWD:/cypress/e2e -w /cypress/e2e -e REACT_APP_CYPRESS_BASE_URL=https://staging.${domain_name} cypress-e2e:latest
            '''
        }

        // ----- Test and Deploy Prod -----
         stage("Deploy - prod") {
            sh '''#!/bin/bash -el
                export domain_name=`aws ssm get-parameter --name /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/dns/domain_name --query Parameter.Value --output text`
                export user_pool_id=`aws ssm get-parameter --name "/${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/cognito/prod/user_pool_id" --query "Parameter.Value" --output text`
                export app_client_id=`aws ssm get-parameter --name "/${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/cognito/prod/app_client_id" --query "Parameter.Value" --output text`
                ./generate_config.sh prod > build/defaults.js
                cd cdk
                npm install
                ./node_modules/.bin/cdk deploy --context deploymentEnvironment=prod --context domainName=${domain_name} --ci --require-approval never
            '''
        }

        stage("E2E tests - prod") {
            sh '''#!/bin/bash -el
                export domain_name=`aws ssm get-parameter --name /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/dns/domain_name --query Parameter.Value --output text`
                export adjudicator_username='adjudicator-1'
                export employee_username='employee-1'
                export admin_username='admin-1'
                export adjudicator_password=`aws secretsmanager get-secret-value --secret-id /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/cognito/prod/credentials/adjudicator --version-stage AWSCURRENT --query SecretString --output text | jq -r '.password'`
                export admin_password=`aws secretsmanager get-secret-value --secret-id /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/cognito/prod/credentials/admin --version-stage AWSCURRENT --query SecretString --output text | jq -r '.password'`
                export employee_password=`aws secretsmanager get-secret-value --secret-id /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/cognito/prod/credentials/employee --version-stage AWSCURRENT --query SecretString --output text | jq -r '.password'`
                ./generate_e2e_env.sh > cypress.env.json
                docker run -i  -v $PWD:/cypress/e2e -w /cypress/e2e -e REACT_APP_CYPRESS_BASE_URL=https://prod.${domain_name} cypress-e2e:latest
            '''
        }
    } finally {
        if (currentBuild.currentResult == "SUCCESS") {
          
          sh '''#!/bin/bash -el
          domain=`aws ssm get-parameter --name /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/dns/domain_name --query Parameter.Value --output text`
          current_time=`(date +%s)`
          echo ${current_time}
          commit_time=`(git log -1 --format=%ct)`
          lead_time=`(awk -v t1="${commit_time}" -v t2="${current_time}" 'BEGIN { print (t2 - t1) }')`
          echo "lead_time ${lead_time}" | curl --data-binary @- https://prometheus-pushgateway.${domain}/metrics/job/${JOB_NAME}
          
          params=$'# TYPE successful_build_count counter\nsuccessful_build_count 1'
          echo \"${params}\" | curl --data-binary @- http://pushgateway-aggregator.${domain}:8080/metrics/job/${JOB_NAME} 
          '''
        } else {
        
          sh '''#!/bin/bash -el
          domain=`aws ssm get-parameter --name /${BOOTSTRAP_PREFIX}/${BOOTSTRAP_PROJECT}/dns/domain_name --query Parameter.Value --output text`
          params=$'# TYPE failed_build_count counter\nfailed_build_count 1'
          echo \"${params}\" | curl --data-binary @- http://pushgateway-aggregator.${domain}:8080/metrics/job/${JOB_NAME}
          ''' 
        }
    }
}