# Swagger Codegen- Angular Typescript README

This extension allows you the ease of generating and maintaining models and clients for open APIs (Swagger JSON).  You can generate and update your swagger output.

## Features

Offers two modes:

genclient - specify a json URI and it will output the client to a folder of the same name as the URI.
genspec - specfile.json will generate all the JSON within a given spec file.

## Specfile

```
{
    "apispec":
    [
        {
             "uri": "http://example.com/swagger/swagger.json",
             "path": "ClientApp/Apis/example"
        },
        {
             "uri": "http://acme.com/swagger/swagger.json",
             "path": "ClientApp/Apis/acme"
        },
    ]
}
```

