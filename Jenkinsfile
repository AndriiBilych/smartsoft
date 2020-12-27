node {
    env.NODEJS_HOME = "${tool 'Node12'}"
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"

    def commit_id
    def tag_name
    def branch_name
    def portainerToken

    try {
        stage('Preparation') {
            checkout scm
        }

        stage('Install packages') {
            withCredentials([string(credentialsId: 'NpmToken', variable: 'TOKEN')]) {
                sh 'NPM_TOKEN=$TOKEN npm install'
            }
        }

//         stage('Unit tests') {
//             withCredentials([string(credentialsId: 'NpmToken', variable: 'TOKEN')]) {
//                 sh 'NPM_TOKEN=$TOKEN npm test -- --ci --testResultsProcessor="jest-junit"'
//                 junit 'junit.xml'
//             }
//         }

        stage('Lint') {
            withCredentials([string(credentialsId: 'NpmToken', variable: 'TOKEN')]) {
                sh 'NPM_TOKEN=$TOKEN npm run lint'
            }
        }

        stage('Npm update') {
            withCredentials([string(credentialsId: 'NpmToken', variable: 'TOKEN')]) {
                sh 'NPM_TOKEN=$TOKEN npm version patch --prefix libs/auth/shell/angular'
            }
        }

        stage('Git push') {
            sh 'sh push-npm.sh'

            withCredentials([usernamePassword(credentialsId: 'github',
                                         usernameVariable: 'username',
                                         passwordVariable: 'password')]){
                sh("git push https://$username:$password@github.com/emiljuchnikowski/smartsoft")
            }
        }
    } catch (e) {
        // mark build as failed
        currentBuild.result = "FAILURE";

        // mark current build as a failure and throw the error
        throw e;
    }
}
