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
            when {
                beforeAgent true
                expression{
                isFrontend = (env.BRANCH_NAME ==~ /frontend_*([a-z0-9]*)/)
                isMaster = (env.BRANCH_NAME ==~ /master/)
                echo "${isFrontend}"
                return isFrontend || isMaster
                }
            }
            steps {
                sh 'npm run test-coverage' 
            }
            } 
        }
    }