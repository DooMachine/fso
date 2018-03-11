FROM microsoft/dotnet:2.0-runtime

COPY ./publish /publish
WORKDIR /publish
EXPOSE 7000
ENTRYPOINT ["dotnet", "fso.Api.dll"]



