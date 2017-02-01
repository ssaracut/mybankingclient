## Some basic instructions

When setting up a new GCP environment you will want to create new deployments, services and an ingress. The yml files are included to do this.

The basic ingress links to a cert called "example-cert'.  A generated cert has been supplied in the example-cert directory.

To setup the basic ingress you need to create a secret that stores the cert in GCP. 

The command is as follows:

```sh
$ kubectl create secret tls example-cert --cert=test-cert/example.crt --key=test-cert/example.key
```

If you open the ingress you will notice the host is "ssaracut.com", you will probably want to 
change that to your own domain.  If you don't have one you can serve this on a root context
and make the ingress default to your mybankingclient service regardless of path. Currently
the default is an nginx service.

To create the ingress enter the following:

```sh
$ kubectl create -f basic-ingress.yml
```

To create the deployment enter the following:
```sh
$ kubectl create -f mybankingclient-deployment.yml
$ kubectl create -f nginx-deployment.yml
```

To create the service enter the following:
```sh
$ kubectl create -f mybankingclient-service.yml
$ kubectl create -f nginx-service.yml
```

Tear down is easy, just replace "create" with "delete".

