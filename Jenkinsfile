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
            when { allOf { branch =~ '^((?!fontend).)*$' }
            } 
            steps {
                sh 'npm run test-coverage' 
            }
        }
    }
}