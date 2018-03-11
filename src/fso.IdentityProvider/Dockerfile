FROM microsoft/dotnet:2.0-runtime

COPY ./publish /publish
WORKDIR /publish
EXPOSE 5000
ENTRYPOINT ["dotnet", "fso.IdentityProvider.dll"]