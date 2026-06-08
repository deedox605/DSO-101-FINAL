pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/deedox605/DSO-101-FINAL.git'
            }
        }
        stage('Install') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                dir('backend') {
                    bat 'docker build -t deedox605/todo-app:latest .'
                }
            }
        }
        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                    bat 'docker push deedox605/todo-app:latest'
                }
            }
        }
    }
}
