const sonarqubeScanner = require('sonarqube-scanner');

var myArgs = process.argv.slice(2);
var sonarUrl = myArgs[0];
var sonarUsername = myArgs[1];
var sonarPassword = myArgs[2];

sonarqubeScanner(
  {
    serverUrl: sonarUrl,
    options: {
      'sonar.login': sonarUsername,
      'sonar.password': sonarPassword,
      'sonar.sources': 'src',
      // sonar.coverage.exclusions excludes some files from the test coverage
      // metrics but those files are still analyzed: other metrics,
      // duplications, coding rules...
      'sonar.coverage.exclusions':
        '**/__data__/**/*.*,**/__mocks__/**/*.*,**/*.test.ts,**/*.test.tsx,src/*.d.ts,src/index.tsx,src/setupProxy.js,src/setupTests.ts',
      // sonar.exclusions completely excludes some files from the analysis:
      // those files don't appear at all in SonarQube.
      'sonar.exclusions':
        '**/__data__/**/*.*,**/__mocks__/**/*.*,src/*.d.ts',
      // sonar.tests define the list of top level directories where the Scanner
      // will search recursively for tests files
      'sonar.tests': 'src',
      // Within the directories defined by sonar.tests, sonar.test.inclusion
      // will define the subset of files that will be considered as tests
      'sonar.test.inclusions':
        '**/*.test.ts,**/*.test.tsx',
      'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.qualitygate.wait': 'true',
    },
  },
  () => process.exit()
);
