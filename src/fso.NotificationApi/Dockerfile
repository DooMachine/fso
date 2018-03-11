FROM microsoft/dotnet:2.0-runtime

COPY ./publish /publish
WORKDIR /publish
EXPOSE 6900
ENTRYPOINT ["dotnet", "fso.NotificationApi.dll"]