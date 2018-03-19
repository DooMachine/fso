# Feasion

Feasion is a social review app about fashion.

## Getting Started

This project is not production ready!

### Prerequisites

You need Docker And .Net Core 2^ Installed on your development machine.


### Installing

Clone fso-linux branch . Publish fso.Api,fso.EventBusListener, fso.NotificaitonApi, fso.NotificationBusListener, fso.IdentityProvider, fso.AppMediaProvider projects to /publish directory 
#Sample

```
cd src/fso.Api
dotnet publish -o publish -c Release
```
Then in root directory

```
docker-compose up
```
navigate to localhost OR localhost:80 in Chrome Browser

Other browsers may add 'www' prefix to subdomains of microservices.
