FROM microsoft/dotnet:2.0-runtime

COPY ./publish /publish
WORKDIR /publish
ENTRYPOINT ["dotnet", "fso.IdentityBusListener.dll"]