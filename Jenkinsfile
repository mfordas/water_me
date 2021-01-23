pipeline {
    agent {
        docker {
            image 'node:14' 
            args '-p 3000:3000' 
        }
    }

    environment {
         SKIP_PREFLIGHT_CHECK = true
         CI = true
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test-coverage' 
            }
            } 
            if ((env.BRANCH_NAME =~ '^((?!develop|master|release).)*$').matches()) {
    stage("Deploy"){
        echo 'Deployed release to QA'
    }
}
        }
    }
}