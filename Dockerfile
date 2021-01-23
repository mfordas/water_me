FROM jenkins/jenkins:2.263.2-lts-jdk11
USER root
RUN apt-get update && apt-get install -y apt-transport-https \
    ca-certificates curl gnupg2 \
    software-properties-common
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
RUN apt-key fingerprint 0EBFCD88
RUN add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/debian \
    $(lsb_release -cs) stable"
RUN apt-get update && apt-get install -y docker-ce-cli
USER jenkins
RUN jenkins-plugin-cli --plugins blueocean:1.24.3


# docker run --name jenkins-blueocean --rm --detach ^
#   --network jenkins --env DOCKER_HOST=tcp://docker:2376 ^
#   --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 ^
#   --volume jenkins-data:/var/jenkins_home ^
#   --volume jenkins-docker-certs:/certs/client:ro ^
#   --publish 8080:8080 --publish 50000:50000 myjenkins-blueocean:1.1

