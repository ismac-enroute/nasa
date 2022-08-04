# NASA

Nasa Project destinated to show skills related to SDJS-01 Interview Excercise

The purpose of this project is to display ROVER cameras from NASA using NASA's API.
The token provided in the source code is limited to use based on restrictions by the API.

This project has an interface coded in Angular separated in different layers, such as the `Service` layer. In case you need to implement a back-end service like _NodeJS_ back-end, the `Service` layer can be easily setup by providing the service's endpoint.
In this case there's no need to code a back-end service, since Angular provides an HTTP client which can be use for such purpose.

This project is coded under Angular 12.

## How to Install dependencies

Go to root directory where `package.json` file is located and run the following command to install all dependencies:

```bash
npm install
```

Once installation is done, run the server with the following command:

```bash
ng serve -o
```

The service will startup at port 4200, so you'll be able to run the project through your Internet Navigator by introducing the URL `http://localhost:4200`

## License

NL
