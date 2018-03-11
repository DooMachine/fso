FROM microsoft/dotnet:2.0-runtime

COPY ./publish /publish
WORKDIR /publish
ENV ASPNETCORE_URLS http://+:80
EXPOSE 7100/tcp
ENTRYPOINT ["dotnet", "fso.AppMediaProvider.dll"]



