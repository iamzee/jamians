export default () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />


        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
    
        <title>Jamians</title>
      </head>
      <body>
        <div id="root"></div>
        <script src="/socket.io/socket.io.js"></script>
        <script type="text/javascript" src="/bundles/main.bundle.js"></script>
      </body>
    </html>  
  `;
};

/* <script type="text/javascript" src="/bundles/client.bundle.js"></script>  */

/*<script type="text/javascript" src="/bundles/vendor.client.bundle.js"></script> */
